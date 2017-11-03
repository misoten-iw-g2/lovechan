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

// Requests DBカラム
type Requests struct {
	ID             int    `db:"id"`
	RequestDisplay string `db:"request_display"`
	Request        string `db:"request"`
	VideoFileName  string `db:"video_file_name"`
	VoiceFileName  string `db:"voice_file_name"`
}

// RequestsDB DB
type RequestsDB struct {
	DB *sqlx.DB
}

// NewRequestsDB イニシャライザ
func NewRequestsDB(db *sqlx.DB) *RequestsDB {
	return &RequestsDB{DB: db}
}

// GetList 答えを取得する
func (db *RequestsDB) GetList(ctx context.Context) ([]Requests, error) {
	sql, prepare, err := sq.Select("*").
		From("requests").
		ToSql()
	if err != nil {
		return []Requests{}, err
	}
	q := []Requests{}
	err = db.DB.Select(&q, sql, prepare...)
	if err != nil {
		return []Requests{}, err
	}
	return q, nil
}

// GetUserRequest ユーザーが選んだリクエストを取得する
func (db *RequestsDB) GetUserRequest(ctx context.Context, rs []Requests, userAnswer string) (Requests, error) {
	topRateIndex := 0
	var topRate float64
	for k, v := range rs {
		res := strings.Split(v.Request, ",")
		for _, v2 := range res {
			rate := levenshtein.RatioForStrings([]rune(v2), []rune(userAnswer), levenshtein.DefaultOptions)
			if rate > topRate {
				topRateIndex = k
				topRate = rate
			}
		}
	}
	if len(rs) != 0 {
		return rs[topRateIndex], nil
	}
	goa.LogInfo(ctx, "ChoiceAnswersDB GetChoiceAnswerReplay NoHit 2: rs", "rs", rs)
	return Requests{}, nil
}

// RequestToRequesttype レスポンス構造体に格納する
func (r Requests) RequestToRequesttype() app.Requesttype {
	a := app.Requesttype{}
	a.ID = r.ID
	a.Request = r.RequestDisplay
	return a
}

// RequestToRequesttypePtr レスポンス構造体に格納する（ポインタ）
func (r Requests) RequestToRequesttypePtr() *app.Requesttype {
	a := &app.Requesttype{}
	a.ID = r.ID
	a.Request = r.RequestDisplay
	return a
}
