package model

import (
	"app/app"
	"context"
	"strings"

	sq "github.com/Masterminds/squirrel"
	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
	"github.com/texttheater/golang-levenshtein/levenshtein"
)

const (
	// ChoiceAnswerType 判定用定数
	ChoiceAnswerType = 2
)

// ChoiceAnswers DBカラム
type ChoiceAnswers struct {
	ID            int    `db:"id"`
	Answer        string `db:"answer"`
	VideoFileName string `db:"video_file_name"`
	VoiceFileName string `db:"voice_file_name"`
	ChoiceDisplay string `db:"choice_display"`
	Choice        string `db:"choice"`
	QuestionID    int    `db:"question_id"`
}

// ChoiceAnswersDB DB
type ChoiceAnswersDB struct {
	DB *sqlx.DB
}

// NewChoiceAnswersDB イニシャライザ
func NewChoiceAnswersDB(db *sqlx.DB) *ChoiceAnswersDB {
	return &ChoiceAnswersDB{DB: db}
}

// GetList 答えを取得する
func (db *ChoiceAnswersDB) GetList(ctx context.Context, id int) ([]ChoiceAnswers, error) {
	sql, prepare, err := sq.Select("*").
		From("choice_answers").
		Where("question_id = ?", id).
		ToSql()
	if err != nil {
		goa.LogError(ctx, "ChoiceAnswersDB GetList Error 1: err", "err", err)
		return []ChoiceAnswers{}, err
	}
	q := []ChoiceAnswers{}
	err = db.DB.Select(&q, sql, prepare...)
	if err != nil {
		goa.LogError(ctx, "ChoiceAnswersDB GetList Error 2: err", "err", err)
		return []ChoiceAnswers{}, err
	}
	return q, nil
}

// GetChoiceAnswerReplay 与えられた選択肢からユーザーが何を選んだかを判定する
func (db *ChoiceAnswersDB) GetChoiceAnswerReplay(ctx context.Context, id int, userAnswer string) (ChoiceAnswers, error) {
	ca, err := db.GetList(ctx, id)
	if err != nil {
		goa.LogError(ctx, "ChoiceAnswersDB GetChoiceAnswerReplay Error 1: err", "err", err)
		return ChoiceAnswers{}, err
	}
	topRateIndex := 0
	var topRate float64
	for k, v := range ca {
		// a,b,c
		cs := strings.Split(v.Choice, ",")
		for _, v2 := range cs {
			// ["a","b","c"]
			rate := levenshtein.RatioForStrings([]rune(v2), []rune(userAnswer), levenshtein.DefaultOptions)
			if rate > topRate {
				topRateIndex = k
				topRate = rate
			}
		}
	}
	if len(ca) != 0 {
		return ca[topRateIndex], nil
	}
	goa.LogInfo(ctx, "ChoiceAnswersDB GetChoiceAnswerReplay NoHit 2: ca", "ca", ca)
	return ChoiceAnswers{}, nil
}

// ChoiceAnswerToAnswertype レスポンス構造体へ入れ直す
func (ca ChoiceAnswers) ChoiceAnswerToAnswertype() app.Answertype {
	a := app.Answertype{}
	a.ID = ca.ID
	a.Answer = ca.Answer
	return a
}
