package model

import "testing"

func TestUserChoiceAnswer(t *testing.T) {
	choicesDisplay := []string{"エラーが出てる", "何もしてないけど壊れた", "画面が映らない", "インターネットに繋がらない"}
	choices := []string{
		"エラーが出てる,えらーがでてる",
		"何もしてないけど壊れた,なにもしてないけどこわれた",
		"画面が映らない,がめんがうつらない",
		"インターネットに繋がらない,いんたーねっとにつならがない",
	}
	userAnswer := "何もしてないけど壊れたよ"
	topRateIndex := UserChoiceAnswer(choices, userAnswer)
	if topRateIndex != 1 {
		t.Fatalf("%sはchoicesの1番目が選択されるべきです 実際の値は%d", userAnswer, topRateIndex)
	}
	if choicesDisplay[topRateIndex] != choicesDisplay[1] {
		t.Fatalf("選び出したい選択肢は%sです 実際の値は%s", choicesDisplay[1], choicesDisplay[topRateIndex])
	}

	userAnswer2 := "ネットに繋がらない"
	topRateIndex2 := UserChoiceAnswer(choices, userAnswer2)
	if topRateIndex2 != 3 {
		t.Fatalf("%sはchoicesの3番目が選択されるべきです 実際の値は%d", userAnswer, topRateIndex)
	}
	if choicesDisplay[topRateIndex2] != choicesDisplay[3] {
		t.Fatalf("選び出したい選択肢は%sです 実際の値は%s", choicesDisplay[3], choicesDisplay[topRateIndex])
	}
}
