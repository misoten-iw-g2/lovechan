package model

import (
	"github.com/jmoiron/sqlx"
)

// Answers DBカラム
type Answers struct {
	ID         int    `db:"id"`
	Emotion    int    `db:"emotion"`
	Filename   string `db:"filename"`
	Word       string `db:"word"`
	QuestionID int    `db:"question_id"`
}

// AnswersDB DB
type AnswersDB struct {
	DB *sqlx.DB
}

// NewAnswersDB イニシャライザ
func NewAnswersDB(db *sqlx.DB) *AnswersDB {
	return &AnswersDB{DB: db}
}

// func (db *AnswersDB) GetRandomQuestion() (Answers, error) {
// 	b := sq.Select("*").
// 		From("questions").
// 		OrderBy("count").
// 		Limit(1)
// 	sql, _, err := b.ToSql()
// 	if err != nil {
// 		return Questions{}, err
// 	}
// 	q := Questions{}
// 	err = db.DB.Get(&q, sql)
// 	if err != nil {
// 		return Questions{}, err
// 	}
// 	u := sq.Update("questions").
// 		Set("count", sq.Expr("count + 1")).
// 		Where("id = ?", q.ID)
// 	sql, prepare, err := u.ToSql()
// 	if err != nil {
// 		return Questions{}, err
// 	}
// 	db.DB.MustExec(sql, prepare...)
// 	return q, nil
// }
