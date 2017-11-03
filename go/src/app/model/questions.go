package model

import (
	"context"

	sq "github.com/Masterminds/squirrel"
	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
)

// Questions DBカラム
type Questions struct {
	ID            int      `db:"id"`
	Question      string   `db:"question"`
	Count         int      `db:"count"`
	AnswerType    int      `db:"answer_type"`
	VideoFileName string   `db:"video_file_name"`
	VoiceFileName string   `db:"voice_file_name"`
	Choice        []string `db:"-"`
}

// QuestionsDB DB
type QuestionsDB struct {
	DB *sqlx.DB
}

// NewQuestions イニシャライザ
func NewQuestions(db *sqlx.DB) *QuestionsDB {
	return &QuestionsDB{DB: db}
}

const (
	// TypeFree 判定用定数
	TypeFree = 1
	// TypeChoice 判定用定数
	TypeChoice = 2
)

// GetRandomQuestion 質問をランダムに取得する 取得した質問のカウントはインクリメントする
func (db *QuestionsDB) GetRandomQuestion(ctx context.Context) (Questions, error) {
	sql, _, err := sq.Select("*").
		From("questions").
		OrderBy("count").
		Limit(1).
		ToSql()
	if err != nil {
		goa.LogError(ctx, "QuestionsDB GetRandomQuestion Error 1: err", "err", err)
		return Questions{}, err
	}
	q := Questions{}
	err = db.DB.Get(&q, sql)
	if err != nil {
		goa.LogError(ctx, "QuestionsDB GetRandomQuestion Error 2: err", "err", err)
		return Questions{}, err
	}
	q.Choice = []string{}
	if q.AnswerType == TypeChoice {
		caDB := NewChoiceAnswersDB(db.DB)
		ca, err := caDB.GetList(ctx, q.ID)
		if err != nil {
			goa.LogError(ctx, "QuestionsDB GetRandomQuestion Error 3: err", "err", err)
			return Questions{}, err
		}
		for _, v := range ca {
			q.Choice = append(q.Choice, v.ChoiceDisplay)
		}
	}
	u := sq.Update("questions").
		Set("count", sq.Expr("count + 1")).
		Where("id = ?", q.ID)
	sql, prepare, err := u.ToSql()
	if err != nil {
		goa.LogError(ctx, "QuestionsDB GetRandomQuestion Error 4: err", "err", err)
		return Questions{}, err
	}
	db.DB.MustExec(sql, prepare...)
	return q, nil
}

// Get 質問を取得する
func (db *QuestionsDB) Get(ctx context.Context, id int) (Questions, error) {
	sql, prepare, err := sq.Select("*").
		From("questions").
		Where("id = ?", id).
		Limit(1).
		ToSql()
	if err != nil {
		goa.LogError(ctx, "QuestionsDB Get Error 1: err", "err", err)
		return Questions{}, err
	}
	q := Questions{}
	err = db.DB.Get(&q, sql, prepare...)
	if err != nil {
		goa.LogError(ctx, "QuestionsDB Get Error 1: err", "err", err)
		return Questions{}, err
	}
	return q, nil
}
