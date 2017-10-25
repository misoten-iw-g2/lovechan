package mywebsocket

import (
	"net/http"

	"github.com/gorilla/websocket"
)

// Server websocket
type Server struct {
	clientCount int
	clients     map[int]*Client
	// channels
	addClientCh    chan *Client
	removeClientCh chan *Client
	messageCh      chan *message
}

type message struct {
	Room string      `json:"-"`
	Type string      `json:"type"`
	Body interface{} `json:"body"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// NewServer websocket
func NewServer() *Server {
	return &Server{
		clientCount:    0,
		clients:        map[int]*Client{},
		addClientCh:    make(chan *Client),
		removeClientCh: make(chan *Client),
		messageCh:      make(chan *message),
	}
}

func (server *Server) addClient(client *Client) {
	server.clientCount++
	client.ID = server.clientCount
	server.clients[client.ID] = client
}

func (server *Server) removeClient(client *Client) {
	delete(server.clients, client.ID)
}

func (server *Server) sendMessage(message *message) {
	for _, client := range server.clients {
		if client.Room != message.Room {
			continue
		}
		client.sendCh <- message
	}
}

// Send roomに居るユーザーに対し,bodyを配信する
func (server *Server) Send(room, typeStr string, body interface{}) {
	message := &message{Room: room, Type: typeStr, Body: body}
	server.messageCh <- message
}

// Start websocket待受
func (server *Server) Start() {
	for {
		select {
		case client := <-server.addClientCh:
			server.addClient(client)
		case client := <-server.removeClientCh:
			server.removeClient(client)
		case message := <-server.messageCh:
			server.sendMessage(message)
		}
	}
}

// WebsocketServe websocket
func (server *Server) WebsocketServe(room string, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	client := NewClient(room, conn, server)
	server.addClientCh <- client
	go client.writePump()
}

// WebsocketServeHandler websocket
func (server *Server) WebsocketServeHandler(room string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		server.WebsocketServe(room, w, r)
	}
}
