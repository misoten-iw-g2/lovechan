package model

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	speech "cloud.google.com/go/speech/apiv1"
	"github.com/goadesign/goa"
	speechpb "google.golang.org/genproto/googleapis/cloud/speech/v1"
)

// GetTextByVoice 音声入力からテキストを取得する(テスト実行用にテキストデータを受け付けるようにしている)
func GetTextByVoice(ctx context.Context, r *http.Request, paramName string) (string, error) {
	if r.Header.Get("Content-Type") == "application/json" {
		type req struct {
			Text string `json:"text"`
		}
		decoder := json.NewDecoder(r.Body)
		var j req
		err := decoder.Decode(&j)
		if err != nil {
			return "", err
		}
		if j.Text == "" {
			return "", fmt.Errorf("uploadfileに音声ファイルを格納するか、テキストデータをtextに格納してください。")
		}
		return j.Text, nil
	}
	err := r.ParseMultipartForm(5 * 1024 * 1024)
	if err != nil {
		goa.LogError(ctx, "GetTextByVoice 1: err", "err", err)
		return "", err
	}
	file, _, err := r.FormFile(paramName)
	if err != nil {
		goa.LogError(ctx, "GetTextByVoice 2: err", "err", err)
		return "", err
	}

	data, err := ioutil.ReadAll(file)
	if err != nil {
		goa.LogError(ctx, "GetTextByVoice 3: err", "err", err)
		return "", err
	}

	client, err := speech.NewClient(ctx)
	if err != nil {
		goa.LogError(ctx, "GetTextByVoice 4: err", "err", err)
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
		goa.LogError(ctx, "GetTextByVoice 5: err", "err", err)
		return "", err
	}
	for _, result := range resp.Results {
		for _, alt := range result.Alternatives {
			return alt.Transcript, nil
		}
	}
	return "", nil
}
