import { useState } from "react"

export default function Chat() {

  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi Piyush 👋 Welcome to SecondBrain."
    }
  ])

  async function sendMessage() {

    if (!message.trim()) return

    const userMessage = {
      sender: "user",
      text: message
    }

    setMessages(prev => [
      ...prev,
      userMessage
    ])

    const response = await fetch(
      "http://127.0.0.1:8000/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message
        })
      }
    )

    const data = await response.json()

    const aiMessage = {
      sender: "ai",
      text: data.response
    }

    setMessages(prev => [
      ...prev,
      aiMessage
    ])

    setMessage("")
  }

  return (
    <div>

      <h1>AI Chat</h1>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          height: "70vh",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            marginBottom: 20,
          }}
        >

          {messages.map((msg, index) => (

            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user"
                    ? "flex-end"
                    : "flex-start",

                marginBottom: 10,
              }}
            >

              <div
                style={{
                  background:
                    msg.sender === "user"
                      ? "#1a1916"
                      : "#f5f3ef",

                  color:
                    msg.sender === "user"
                      ? "#fff"
                      : "#000",

                  padding: "12px",
                  borderRadius: 12,
                  maxWidth: "70%",
                }}
              >
                {msg.text}
              </div>

            </div>

          ))}

        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >

          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask anything..."
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              border: "1px solid #ddd",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "12px 20px",
              borderRadius: 10,
              border: "none",
              background: "#1a1916",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Send
          </button>

        </div>

      </div>

    </div>
  )
}