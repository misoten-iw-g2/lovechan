package model

import (
	sq "github.com/Masterminds/squirrel"
	"github.com/jmoiron/sqlx"
)

// Questions DBカラム
type Questions struct {
	ID       int    `db:"id"`
	Question string `db:"question"`
	Count    int    `db:"count"`
}

// QuestionsDB DB
type QuestionsDB struct {
	DB *sqlx.DB
}

// NewQuestions イニシャライザ
func NewQuestions(db *sqlx.DB) *QuestionsDB {
	return &QuestionsDB{DB: db}
}

// GetRandomQuestion 質問をランダムに取得する 取得した質問のカウントはインクリメントする
func (db *QuestionsDB) GetRandomQuestion() (Questions, error) {
	b := sq.Select("*").
		From("questions").
		OrderBy("count").
		Limit(1)
	sql, _, err := b.ToSql()
	if err != nil {
		return Questions{}, err
	}
	q := Questions{}
	err = db.DB.Get(&q, sql)
	if err != nil {
		return Questions{}, err
	}
	u := sq.Update("questions").
		Set("count", sq.Expr("count + 1")).
		Where("id = ?", q.ID)
	sql, prepare, err := u.ToSql()
	if err != nil {
		return Questions{}, err
	}
	db.DB.MustExec(sql, prepare...)
	return q, nil
}
