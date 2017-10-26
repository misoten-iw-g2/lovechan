package mywebsocket

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/gorilla/websocket"
	"github.com/stretchr/testify/assert"
)

// TestWebsocket websocketのルーム機能をテストする
func TestWebsocket(t *testing.T) {
	assert := assert.New(t)

	// テストケース
	cases := []message{
		{ // room1 にのみ配信されるべき
			Room: "room1",
			Type: "message",
			Body: "bodyText for room1",
		},
		{ // room2 にのみ配信されるべき
			Room: "room2",
			Type: "message-room2",
			Body: "bodyText for room2",
		},
		{ // nouserRoom に配信され、room1, room2のユーザーが受信しないことを確認する
			Room: "nouserRoom",
			Type: "message",
			Body: "no one receives this message",
		},
	}

	// サーバーの作成
	s := NewServer()
	go s.Start()

	// room1
	ts1 := httptest.NewServer(http.HandlerFunc(s.WebsocketServeHandler("room1")))
	defer ts1.Close()

	// room2
	ts2 := httptest.NewServer(http.HandlerFunc(s.WebsocketServeHandler("room2")))
	defer ts2.Close()

	// クライアント1-room1の作成
	client1, err := createClient(ts1)
	if err != nil {
		t.Fatal(err)
	}
	defer client1.Close()

	// クライアント2-room2の作成
	client2, err := createClient(ts2)
	if err != nil {
		t.Fatal(err)
	}
	defer client2.Close()

	// テストケースを送信
	for _, v := range cases {
		s.Send(v.Room, v.Type, v.Body)
	}

	// クライアント1が発言を受け取る
	res, err := readMessage(client1)
	if err != nil {
		t.Error(err)
	}
	assert.Equal(cases[0].Type, res.Type)
	assert.Equal(cases[0].Body, res.Body)

	// クライアント2が発言を受け取る
	res, err = readMessage(client2)
	if err != nil {
		t.Error(err)
	}
	assert.Equal(cases[1].Type, res.Type)
	assert.Equal(cases[1].Body, res.Body)

	// もう一度メッセージを受信し、何も無いことを確かめる
	// クライアント1
	_, err = readMessage(client1)
	assert.NotNil(err)
	// クライアント2
	_, err = readMessage(client2)
	assert.NotNil(err)
}

func createClient(ts *httptest.Server) (*websocket.Conn, error) {
	dialer := websocket.Dialer{
		Subprotocols:    []string{},
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}

	url := strings.Replace(ts.URL, "http://", "ws://", 1)
	header := http.Header{"Accept-Encoding": []string{"gzip"}}

	conn, _, err := dialer.Dial(url, header)
	if err != nil {
		return nil, err
	}

	return conn, nil
}

func readMessage(conn *websocket.Conn) (*message, error) {
	conn.SetReadDeadline(time.Now().Add(5 * time.Second))
	messageType, p, err := conn.ReadMessage()
	if err != nil {
		return nil, err
	}
	if messageType != websocket.TextMessage {
		return nil, errors.New("invalid message type")
	}

	message := message{}
	if err := json.Unmarshal(p, &message); err != nil {
		return nil, err
	}

	return &message, nil
}
