package model

import (
	"app/app"
	"app/util"
	"context"

	sq "github.com/Masterminds/squirrel"
	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
)

// FreeAnswerType 判定用定数
const (
	FreeAnswerType = 1
)

// FreeAnswers DBカラム
type FreeAnswers struct {
	ID         int    `db:"id"`
	Emotion    int    `db:"emotion"`
	Filename   string `db:"filename"`
	Answer     string `db:"answer"`
	QuestionID int    `db:"question_id"`
}

// FreeAnswersDB DB
type FreeAnswersDB struct {
	DB *sqlx.DB
}

// NewFreeAnswersDB イニシャライザ
func NewFreeAnswersDB(db *sqlx.DB) *FreeAnswersDB {
	return &FreeAnswersDB{DB: db}
}

// GetList 答えを取得する
func (db *FreeAnswersDB) GetList(ctx context.Context, id int) ([]FreeAnswers, error) {
	sql, prepare, err := sq.Select("*").
		From("free_answers").
		Where("question_id = ?", id).
		ToSql()
	if err != nil {
		goa.LogInfo(ctx, "FreeAnswersDB GetList Error 1: err", "err", err)
		return []FreeAnswers{}, err
	}
	q := []FreeAnswers{}
	err = db.DB.Select(&q, sql, prepare...)
	if err != nil {
		goa.LogInfo(ctx, "FreeAnswersDB GetList Error 2: err", "err", err)
		return []FreeAnswers{}, err
	}
	return q, nil
}

// GetFreeAnswerReplay scoreからユーザーに返すべき返答を取得する
func (db *FreeAnswersDB) GetFreeAnswerReplay(ctx context.Context, questionID int, userAnswer string) (FreeAnswers, error) {
	as, err := db.GetList(ctx, questionID)
	if err != nil {
		goa.LogInfo(ctx, "FreeAnswersDB GetFreeAnswerReplay Error 1: err", "err", err)
		return FreeAnswers{}, err
	}
	s, err := util.AnalyzeSentiment(ctx, userAnswer)
	if err != nil {
		goa.LogInfo(ctx, "FreeAnswersDB GetFreeAnswerReplay Error 2: err", "err", err)
		return FreeAnswers{}, err
	}
	score := s.DocumentSentiment.GetScore()
	if err != nil {
		goa.LogInfo(ctx, "FreeAnswersDB GetFreeAnswerReplay Error 3: err", "err", err)
		return FreeAnswers{}, err
	}
	emotion := getEmotion(ctx, score)
	for _, v := range as {
		if v.Emotion == emotion {
			return v, nil
		}
	}
	return FreeAnswers{}, nil
}

const (
	emotionGood   = 1
	emotionNormal = 2
	emotionBad    = 3
)
const (
	good = 0.25
	bad  = -0.25
)

func getEmotion(ctx context.Context, score float32) int {
	if score >= good {
		return emotionGood
	}
	if score <= bad {
		return emotionBad
	}
	return emotionNormal
}

// FreeAnswerToAnswertype レスポンス構造体へ入れ直す
func (fs FreeAnswers) FreeAnswerToAnswertype() app.Answertype {
	a := app.Answertype{}
	a.ID = fs.ID
	a.Answer = fs.Answer
	a.Filename = fs.Filename
	return a
}
