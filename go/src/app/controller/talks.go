package controller

import (
	"app/app"
	"fmt"
	"io/ioutil"

	speech "cloud.google.com/go/speech/apiv1"
	"github.com/goadesign/goa"
	"github.com/texttheater/golang-levenshtein/levenshtein"
	speechpb "google.golang.org/genproto/googleapis/cloud/speech/v1"
)

// TalksController implements the talks resource.
type TalksController struct {
	*goa.Controller
}

// NewTalksController creates a talks controller.
func NewTalksController(service *goa.Service) *TalksController {
	return &TalksController{Controller: service.NewController("TalksController")}
}

// Select runs the select action.
func (c *TalksController) Select(ctx *app.SelectTalksContext) error {
	// TalksController_Select: start_implement

	// Put your logic here
	topRateIndex := 0
	var topRate float64
	for k, v := range ctx.Payload.Selects {
		rate := levenshtein.RatioForStrings([]rune(v), []rune(ctx.Payload.Input), levenshtein.DefaultOptions)
		if rate > topRate {
			topRateIndex = k
		}
	}

	// TalksController_Select: end_implement
	res := &app.Selecttype{}
	res.Selects = ctx.Payload.Selects
	res.Input = ctx.Payload.Input
	res.Answer = ctx.Payload.Selects[topRateIndex]
	return ctx.OK(res)
}

// Speech runs the Speech action.
func (c *TalksController) Speech(ctx *app.SpeechTalksContext) error {
	// TalksController_Speech: start_implement

	// Put your logic here
	err := ctx.Request.ParseMultipartForm(5 * 1024 * 1024)
	if err != nil {
		return goa.ErrInternal(err)
	}
	file, _, err := ctx.Request.FormFile("uploadfile")
	if err != nil {
		return goa.ErrInternal(err)
	}

	data, err := ioutil.ReadAll(file)
	if err != nil {
		return goa.ErrInternal(err)
	}

	client, err := speech.NewClient(ctx)
	if err != nil {
		return goa.ErrInternal(err)
	}
	// Detects speech in the audio file.
	resp, err := client.Recognize(ctx, &speechpb.RecognizeRequest{
		Config: &speechpb.RecognitionConfig{
			Encoding:        speechpb.RecognitionConfig_LINEAR16,
			SampleRateHertz: 44100,
			LanguageCode:    "ja-JP",
		},
		Audio: &speechpb.RecognitionAudio{
			AudioSource: &speechpb.RecognitionAudio_Content{Content: data},
		},
	})
	if err != nil {
		return goa.ErrInternal(err)
	}

	// Prints the results.
	res := &app.Speechtype{}
	for _, result := range resp.Results {
		for _, alt := range result.Alternatives {
			res.Confidence = fmt.Sprint(alt.Confidence)
			res.Text = alt.Transcript
		}
	}

	// TalksController_Speech: end_implement
	return ctx.OK(res)
}
