package model

import (
	"context"

	sq "github.com/Masterminds/squirrel"
	"github.com/jmoiron/sqlx"
)

// UserAnswers DBカラム
type UserAnswers struct {
	ID         int     `db:"id"`
	Word       string  `db:"word"`
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
			"id",
			"word",
			"score",
			"question_id",
		).
		Values("id", a.ID).
		Values("word", a.Word).
		Values("score", a.Score).
		Values("question_id", a.QuestionID).
		ToSql()
	if err != nil {
		return err
	}
	db.DB.MustExec(sql, prepare...)
	return nil
}
