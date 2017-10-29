package model

import (
	"app/util"
	"context"

	sq "github.com/Masterminds/squirrel"
	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
)

// UserAnswers DBカラム
type UserAnswers struct {
	ID         int     `db:"id"`
	Question   string  `db:"question"`
	Answer     string  `db:"answer"`
	Score      float32 `db:"score"`
	QuestionID int     `db:"question_id"`
}

// UserAnswersDB DB
type UserAnswersDB struct {
	DB *sqlx.DB
}

// NewUserAnswersDB イニシャライザ
func NewUserAnswersDB(db *sqlx.DB) *UserAnswersDB {
	return &UserAnswersDB{DB: db}
}

// Add Insert
func (db *UserAnswersDB) Add(ctx context.Context, a UserAnswers) error {
	sql, prepare, err := sq.
		Insert("user_answers").
		Columns(
			"question",
			"answer",
			"score",
			"question_id",
		).
		Values(
			a.Question,
			a.Answer,
			a.Score,
			a.QuestionID,
		).
		ToSql()
	if err != nil {
		goa.LogError(ctx, "UserAnswerDB Add Error 1: err", "err", err)
		return err
	}
	db.DB.MustExec(sql, prepare...)
	return nil
}

// AddAnalysis 解析結果を格納する（非同期処理用）
func (db *UserAnswersDB) AddAnalysis(ctx context.Context, a UserAnswers) {
	s, err := util.AnalyzeSentiment(ctx, a.Answer)
	if err != nil {
		goa.LogError(ctx, "UserAnswerDB AddAnalysis Error 1: err", "err", err)
		return
	}
	a.Score = s.DocumentSentiment.GetScore()
	if err != nil {
		goa.LogError(ctx, "UserAnswerDB AddAnalysis Error 2: err", "err", err)
		return
	}
	err = db.Add(ctx, a)
	if err != nil {
		goa.LogError(ctx, "UserAnswerDB AddAnalysis Error 3: err", "err", err)
		return
	}
	goa.LogInfo(ctx, "UserAnswerDB AddAnalysis OK: insert", "insert", a)
}
