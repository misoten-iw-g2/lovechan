package mywebsocket

import (
	"time"

	"github.com/gorilla/websocket"
)

const (
	// WsMovieChannel channnel name
	WsMovieChannel = "movie"
	// WsUserAnswerChannel channnel name
	WsUserAnswerChannel = "user_answer"
	// WsPieChannel channnel name
	WsPieChannel = "pie"
)

const (
	// WsVideoChange action type
	WsVideoChange = "videoChange"
	// WsVideoChangeStory action type
	WsVideoChangeStory = "videoChangeStory"
	// WsPieChange action type
	WsPieChange = "pieChange"
	// WsUserAnswerChange action type
	WsUserAnswerChange = "userAnswerChange"
)

// VideoChange ws用構造体
type VideoChange struct {
	VideoFileName string `json:"video_file_name"`
	VoiceFileName string `json:"voice_file_name"`
	Text          string `json:"text"`
}

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = 60 * time.Second
)

const (
	WsAction = "action"
)

// Client websocketのコネクション
type Client struct {
	ID   int
	Room string
	conn *websocket.Conn
	// share with server
	sendCh chan *message
	server *Server
}

// NewClient websocketのコネクションを生成
func NewClient(room string, conn *websocket.Conn, server *Server) *Client {
	sendCh := make(chan *message)
	client := &Client{
		Room:   room,
		conn:   conn,
		server: server,
		sendCh: sendCh,
	}

	return client
}

func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.server.removeClientCh <- c
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.sendCh:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			if err := c.write(message); err != nil {
				return
			}

		case <-ticker.C:
			// 定期的にping送出
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}

func (c *Client) write(v interface{}) error {
	return c.conn.WriteJSON(v)
}
