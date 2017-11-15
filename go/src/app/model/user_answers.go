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
	Emotion    int       `db:"emotion"`
	QuestionID int       `db:"question_id"`
	CreatedAt  time.Time `db:"created_at"`
}

// UserAnswersDB DB
type UserAnswersDB struct {
	DB *sqlx.DB
}

// NewUserAnswersDB イニシャライザ
func NewUserAnswersDB(db *sqlx.DB) *UserAnswersDB {
	return &UserAnswersDB{DB: db}
}

// GetList ユーザー回答の取得
func (db *UserAnswersDB) GetList(ctx context.Context) ([]UserAnswers, error) {
	sql, prepare, err := sq.Select("*").
		From("user_answers").
		OrderBy("created_at DESC").
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

type UserAnswersGroupByEmotion struct {
	// Formatが違う
	CreatedAt string `db:"created_at"`
	Emotion   int    `db:"emotion"`
	Count     int    `db:"count"`
}

func (db *UserAnswersDB) GetListGroupByEmotion(ctx context.Context) ([]UserAnswersGroupByEmotion, error) {
	q, prepare, err := sq.Select(
		"DATE_FORMAT(created_at, '%Y-%m-%d') as created_at",
		"emotion",
		"COUNT(*) as count",
	).
		From("user_answers").
		GroupBy("DATE_FORMAT(created_at, '%Y%m%d')", "emotion").
		OrderBy("created_at DESC").
		ToSql()
	goa.LogInfo(ctx, "a", "a", q)
	if err != nil {
		goa.LogError(ctx, "UserAnswersDB GetGroupByEmotion Error 1: err", "err", err)
		return []UserAnswersGroupByEmotion{}, err
	}
	ua := []UserAnswersGroupByEmotion{}
	err = db.DB.Select(&ua, q, prepare...)
	if err != nil {
		goa.LogError(ctx, "UserAnswersDB GetGroupByEmotion Error 2: err", "err", err)
		return []UserAnswersGroupByEmotion{}, err
	}
	return ua, nil
}

type UserAnswersGetListEmotionRatio struct {
	Emotion int     `db:"emotion"`
	Percent float64 `db:"percent"`
}

func (db *UserAnswersDB) GetListEmotionRatio(ctx context.Context) ([]UserAnswersGetListEmotionRatio, error) {
	q, prepare, err := sq.Select(
		"emotion",
		"round(COUNT(*) / (SELECT COUNT(*) FROM user_answers) * 100, 1) as percent",
	).
		From("user_answers").
		GroupBy("emotion").
		OrderBy("created_at DESC").
		ToSql()
	if err != nil {
		goa.LogError(ctx, "UserAnswersDB GetGroupByEmotion Error 1: err", "err", err)
		return []UserAnswersGetListEmotionRatio{}, err
	}
	ua := []UserAnswersGetListEmotionRatio{}
	err = db.DB.Select(&ua, q, prepare...)
	if err != nil {
		goa.LogError(ctx, "UserAnswersDB GetGroupByEmotion Error 2: err", "err", err)
		return []UserAnswersGetListEmotionRatio{}, err
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
			"emotion",
			"question_id",
		).
		Values(
			a.Question,
			a.Answer,
			a.Score,
			a.Emotion,
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
	a.Emotion = getEmotion(ctx, score)
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

// UserAnswerToUserAnswertype レスポンス用の構造体へ
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

// UserAnswerToUserAnswertypePtr レスポンス用の構造体へ(ポインター)
func (ua UserAnswers) UserAnswerToUserAnswertypePtr() *app.Useranswertype {
	u := &app.Useranswertype{}
	u.ID = ua.ID
	u.Score = ua.Score
	u.Answer = ua.Answer
	u.Question = ua.Question
	u.CreatedAt = ua.CreatedAt
	u.QuestionID = ua.QuestionID
	return u
}

func (ua UserAnswersGetListEmotionRatio) UserAnswerToGraphpietype() app.Graphpietype {
	u := app.Graphpietype{}
	u.Emotion = ua.Emotion
	u.Percent = ua.Percent
	return u
}

func (ua UserAnswersGetListEmotionRatio) UserAnswerToGraphpietypePtr() *app.Graphpietype {
	u := &app.Graphpietype{}
	u.Emotion = ua.Emotion
	u.Percent = ua.Percent
	return u
}

// func (uae UserAnswersGroupByEmotion) UserAnswerToGraphpietype() app.Graphbartype {
// 	u := app.Graphbartype{}
// 	u.Emotion = uae.Emotion
// 	u.Count = uae.Count
// 	u.Date = fmt.Sprint(uae.CreatedAt)
// 	return u
// }

// func (uae UserAnswersGroupByEmotion) UserAnswerToGraphpietypePtr() *app.Graphbartype {
// 	u := &app.Graphbartype{}
// 	u.Emotion = uae.Emotion
// 	u.Count = uae.Count
// 	u.Date = fmt.Sprint(uae.CreatedAt)
// 	return u
// }
