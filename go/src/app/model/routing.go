package model

import (
	"context"
	"io/ioutil"
	"net/http"

	speech "cloud.google.com/go/speech/apiv1"
	speechpb "google.golang.org/genproto/googleapis/cloud/speech/v1"
)

// GetTextByVoice 音声入力からテキストを取得する
func GetTextByVoice(ctx context.Context, r *http.Request, paramName string) (string, error) {
	err := r.ParseMultipartForm(5 * 1024 * 1024)
	if err != nil {
		return "", err
	}
	file, _, err := r.FormFile(paramName)
	if err != nil {
		return "", err
	}

	data, err := ioutil.ReadAll(file)
	if err != nil {
		return "", err
	}

	client, err := speech.NewClient(ctx)
	if err != nil {
		return "", err
	}
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
		return "", err
	}
	for _, result := range resp.Results {
		for _, alt := range result.Alternatives {
			return alt.Transcript, nil
		}
	}
	return "", nil
}
