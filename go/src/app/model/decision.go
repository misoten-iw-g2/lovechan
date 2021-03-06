package model

import (
	"app/app"
	"errors"
	"strings"

	"github.com/texttheater/golang-levenshtein/levenshtein"
)

// ErrNotFoundChoice  一致している選択がない場合のエラー
var ErrNotFoundChoice = errors.New("choice does not exist")

// UserChoiceAnswer ユーザーが選んだ選択肢を返す 現状は未入力などは想定していない
func UserChoiceAnswer(choices []string, userAnswer string) (int, error) {
	topRateIndex := 0
	var topRate float64
	for k, v := range choices {
		// a,b,c
		cs := strings.Split(v, ",")
		for _, v2 := range cs {
			// ["a","b","c"]
			rate := levenshtein.RatioForStrings([]rune(v2), []rune(userAnswer), levenshtein.DefaultOptions)
			if rate > topRate {
				topRateIndex = k
				topRate = rate
			}
		}
	}
	if topRate < 0.75 {
		return 0, ErrNotFoundChoice
	}
	return topRateIndex, nil
}

var backword = []string{"戻りたい", "もどりたい", "戻る", "もどる"}

// IsReturn 戻りたいというワードが入力されたか判定する
func IsReturn(userAnswer string) (bool, float64) {
	var topRate float64
	for _, v := range backword {
		rate := levenshtein.RatioForStrings([]rune(v), []rune(userAnswer), levenshtein.DefaultOptions)
		if rate > topRate {
			topRate = rate
		}
	}
	if topRate < 0.9 {
		return false, topRate
	}
	return true, topRate
}

// NewRoutingType コンストラクタ
func NewRoutingType(nextPage string, userVoiceText string) *app.Routingtype {
	r := &app.Routingtype{}
	r.NextPage = nextPage
	r.UserVoiceText = userVoiceText
	return r
}
