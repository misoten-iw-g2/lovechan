package model

import (
	"app/app"
	"app/util"
	"context"
	"fmt"
	"strconv"
	"time"

	sq "github.com/Masterminds/squirrel"
	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
)

// UserAnswers DBカラム
type UserAnswers struct {
	ID         int       `db:"id"`
	Question   string    `db:"question"`
	Answer     string    `db:"answer"`
	Score      float64   `db:"score"`
	QuestionID int       `db:"question_id"`
	CreatedAt  time.Time `db:"question_id"`
}

// UserAnswersDB DB
type UserAnswersDB struct {
	DB *sqlx.DB
}

// NewUserAnswersDB イニシャライザ
func NewUserAnswersDB(db *sqlx.DB) *UserAnswersDB {
	return &UserAnswersDB{DB: db}
}

func (db *UserAnswersDB) GetList(ctx context.Context) ([]UserAnswers, error) {
	sql, prepare, err := sq.Select("*").
		From("user_answers").
		OrderBy("created_at", "desc").
		ToSql()
	if err != nil {
		goa.LogError(ctx, "UserAnswersDB GetList Error 1: err", "err", err)
		return []UserAnswers{}, err
	}
	ua := []UserAnswers{}
	err = db.DB.Select(&ua, sql, prepare...)
	if err != nil {
		goa.LogError(ctx, "UserAnswersDB GetList Error 2: err", "err", err)
		return []UserAnswers{}, err
	}
	return ua, nil
}

// Add Insert
func (db *UserAnswersDB) Add(ctx context.Context, a UserAnswers) error {
	sql, prepare, err := sq.Insert("user_answers").
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
	score := s.DocumentSentiment.GetScore()
	a.Score, err = strconv.ParseFloat(fmt.Sprint(score), 64)
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

func (ua UserAnswers) UserAnswerToUserAnswertype() app.Useranswertype {
	u := app.Useranswertype{}
	u.ID = ua.ID
	u.Score = ua.Score
	u.Answer = ua.Answer
	u.Question = ua.Question
	u.CreatedAt = ua.CreatedAt
	u.QuestionID = ua.QuestionID
	return u
}
