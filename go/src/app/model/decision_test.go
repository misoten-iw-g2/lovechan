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
	topRateIndex, err := UserChoiceAnswer(choices, userAnswer)
	if err != nil {
		t.Fatalf("エラーが発生しました %v", err)
	}
	if topRateIndex != 1 {
		t.Fatalf("%sはchoicesの1番目が選択されるべきです 実際の値は%d", userAnswer, topRateIndex)
	}
	if choicesDisplay[topRateIndex] != choicesDisplay[1] {
		t.Fatalf("選び出したい選択肢は%sです 実際の値は%s", choicesDisplay[1], choicesDisplay[topRateIndex])
	}

	userAnswer2 := "ネットに繋がらない"
	topRateIndex2, err := UserChoiceAnswer(choices, userAnswer2)
	if err != nil {
		t.Fatalf("エラーが発生しました %v", err)
	}
	if topRateIndex2 != 3 {
		t.Fatalf("%sはchoicesの3番目が選択されるべきです 実際の値は%d", userAnswer, topRateIndex)
	}
	if choicesDisplay[topRateIndex2] != choicesDisplay[3] {
		t.Fatalf("選び出したい選択肢は%sです 実際の値は%s", choicesDisplay[3], choicesDisplay[topRateIndex])
	}
}

func TestIsReturn(t *testing.T) {
	r, s := IsReturn("戻る")
	if !r {
		t.Fatalf("戻るの場合は、trueであるべきです 実際の値は%v", r)
	}
	if s != float64(1) {
		t.Fatalf("戻るは完全一致なので、1.0であるべきです 実際の値は%f", s)
	}
	r2, s2 := IsReturn("もどる")
	if !r2 {
		t.Fatalf("もどるの場合は、trueであるべきです 実際の値は%v", r2)
	}
	if s2 != float64(1) {
		t.Fatalf("もどるは完全一致なので、1.0であるべきです 実際の値は%f", s2)
	}
	r3, s3 := IsReturn("楽しいです")
	if r3 {
		t.Fatalf("楽しいですの場合は、falseであるべきです 実際の値は%v", r3)
	}
	if s3 > float64(0.9) {
		t.Fatalf("楽しいですは不一致なので、0.9より小さいべきです 実際の値は%f", s3)
	}
}
