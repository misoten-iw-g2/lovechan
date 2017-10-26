package util

import (
	"fmt"

	language "cloud.google.com/go/language/apiv1"
	"golang.org/x/net/context"
	languagepb "google.golang.org/genproto/googleapis/cloud/language/v1"
)

const (
	// Entities エンティティを取り出す
	Entities = "entities"
	// Sentiment 感情分析
	Sentiment = "sentiment"
	// Syntax 文章の分解
	Syntax = "syntax"
)

// GetNLPAnalyze 文章から自然言語処理し、結果を返す
func GetNLPAnalyze(ctx context.Context, runType string, word string) (interface{}, error) {
	client, err := language.NewClient(ctx)
	if err != nil {
		return nil, err
	}
	switch runType {
	case Entities:
		return analyzeEntities(ctx, client, word)
	case Sentiment:
		return analyzeSentiment(ctx, client, word)
	case Syntax:
		return analyzeSyntax(ctx, client, word)
	default:
		return nil, fmt.Errorf("not found nlp type; %s", runType)
	}
}

func analyzeEntities(ctx context.Context, client *language.Client, text string) (*languagepb.AnalyzeEntitiesResponse, error) {
	return client.AnalyzeEntities(ctx, &languagepb.AnalyzeEntitiesRequest{
		Document: &languagepb.Document{
			Source: &languagepb.Document_Content{
				Content: text,
			},
			Type: languagepb.Document_PLAIN_TEXT,
		},
		EncodingType: languagepb.EncodingType_UTF8,
	})
}

func analyzeSentiment(ctx context.Context, client *language.Client, text string) (*languagepb.AnalyzeSentimentResponse, error) {
	return client.AnalyzeSentiment(ctx, &languagepb.AnalyzeSentimentRequest{
		Document: &languagepb.Document{
			Source: &languagepb.Document_Content{
				Content: text,
			},
			Type: languagepb.Document_PLAIN_TEXT,
		},
	})
}

func analyzeSyntax(ctx context.Context, client *language.Client, text string) (*languagepb.AnnotateTextResponse, error) {
	return client.AnnotateText(ctx, &languagepb.AnnotateTextRequest{
		Document: &languagepb.Document{
			Source: &languagepb.Document_Content{
				Content: text,
			},
			Type: languagepb.Document_PLAIN_TEXT,
		},
		Features: &languagepb.AnnotateTextRequest_Features{
			ExtractSyntax: true,
		},
		EncodingType: languagepb.EncodingType_UTF8,
	})
}
