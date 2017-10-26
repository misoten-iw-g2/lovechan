package util

import (
	language "cloud.google.com/go/language/apiv1"
	"golang.org/x/net/context"
	languagepb "google.golang.org/genproto/googleapis/cloud/language/v1"
)

// AnalyzeEntities 単語
func AnalyzeEntities(ctx context.Context, text string) (*languagepb.AnalyzeEntitiesResponse, error) {
	client, err := language.NewClient(ctx)
	if err != nil {
		return nil, err
	}
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

// AnalyzeSentiment 感情
func AnalyzeSentiment(ctx context.Context, text string) (*languagepb.AnalyzeSentimentResponse, error) {
	client, err := language.NewClient(ctx)
	if err != nil {
		return nil, err
	}
	return client.AnalyzeSentiment(ctx, &languagepb.AnalyzeSentimentRequest{
		Document: &languagepb.Document{
			Source: &languagepb.Document_Content{
				Content: text,
			},
			Type: languagepb.Document_PLAIN_TEXT,
		},
	})
}

// AnalyzeSyntax 文章構成
func AnalyzeSyntax(ctx context.Context, text string) (*languagepb.AnnotateTextResponse, error) {
	client, err := language.NewClient(ctx)
	if err != nil {
		return nil, err
	}
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
