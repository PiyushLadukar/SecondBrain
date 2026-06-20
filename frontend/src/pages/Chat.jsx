import { useState, useRef, useEffect } from "react"
import {
  Brain,
  Send,
  Sparkles,
  Code2,
  FileText,
  Lightbulb,
  Bot,
  User,
  Loader2,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Static config — extend these as new quick actions / providers are added
// ---------------------------------------------------------------------------

const QUICK_ACTIONS = [
  {
    icon: Code2,
    title: "Debug code",
    subtitle: "Paste an error and let's fix it",
    prompt: "Help me debug this code: ",
  },
  {
    icon: FileText,
    title: "Summarize",
    subtitle: "Condense long text or docs",
    prompt: "Summarize the following: ",
  },
  {
    icon: Lightbulb,
    title: "Brainstorm",
    subtitle: "Explore ideas for a feature",
    prompt: "Help me brainstorm ideas for ",
  },
  {
    icon: Sparkles,
    title: "Explain",
    subtitle: "Break down a tricky concept",
    prompt: "Explain this to me simply: ",
  },
]

const INITIAL_MESSAGES = [
  {
    sender: "ai",
    text: "Hi Piyush, welcome to SecondBrain. What are we working on today?",
  },
]

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function StatusBadge() {
  return (
    <div
      className="sb-status-badge"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        borderRadius: 999,
        background: "#f5f3ef",
        border: "1px solid #e4e1db",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#3B6D11",
          boxShadow: "0 0 0 3px rgba(99,153,34,0.18)",
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 12, fontWeight: 500, color: "#1c1a17", whiteSpace: "nowrap" }}>
        Local AI
      </span>
      <span className="sb-status-extra" style={{ fontSize: 12, color: "#a8a49e" }}>•</span>
      <span className="sb-status-extra" style={{ fontSize: 12, color: "#a8a49e", whiteSpace: "nowrap" }}>Ollama</span>
    </div>
  )
}

function ChatHeader() {
  return (
    <header
      className="sb-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: "12px clamp(12px, 4vw, 20px)",
        borderBottom: "1px solid #e4e1db",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "linear-gradient(135deg, #1c1a17, #3a362f)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Brain size={17} color="#f7f5f2" strokeWidth={2} />
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#1c1a17", margin: 0, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            SecondBrain
          </p>
          <p className="sb-header-sub" style={{ fontSize: 12, color: "#a8a49e", margin: 0, lineHeight: 1.2, whiteSpace: "nowrap" }}>
            Your personal AI
          </p>
        </div>
      </div>
      <StatusBadge />
    </header>
  )
}

function WelcomeSection({ username, onQuickAction }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem clamp(1rem, 5vw, 1.5rem)",
        textAlign: "center",
      }}
    >
      <div
        className="sb-welcome-icon"
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: "linear-gradient(135deg, #1c1a17, #3a362f)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          boxShadow: "0 8px 24px -8px rgba(28,26,23,0.35)",
          flexShrink: 0,
        }}
      >
        <Brain size={26} color="#f7f5f2" strokeWidth={1.8} />
      </div>

      <h1
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: "clamp(24px, 6vw, 34px)",
          fontWeight: 400,
          color: "#1c1a17",
          margin: "0 0 8px",
          letterSpacing: "-0.3px",
          wordBreak: "break-word",
        }}
      >
        {greeting}, {username}.
      </h1>
      <p style={{ fontSize: "clamp(13px, 3vw, 14px)", color: "#a8a49e", margin: "0 0 2.5rem", maxWidth: 380, lineHeight: 1.6 }}>
        Ask anything, paste some code, or pick a quick start below.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))",
          gap: 10,
          width: "100%",
          maxWidth: 560,
        }}
      >
        {QUICK_ACTIONS.map(({ icon: Icon, title, subtitle, prompt }) => (
          <button
            key={title}
            onClick={() => onQuickAction(prompt)}
            className="sb-quick-card"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              textAlign: "left",
              padding: "14px 14px",
              borderRadius: 14,
              border: "1px solid #e4e1db",
              background: "#fff",
              cursor: "pointer",
              transition: "border-color 0.18s, transform 0.15s, box-shadow 0.18s",
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: "#f5f3ef",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={15} color="#5a5754" strokeWidth={1.8} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13.5, fontWeight: 500, color: "#1c1a17", margin: "0 0 2px" }}>
                {title}
              </p>
              <p style={{ fontSize: 12, color: "#a8a49e", margin: 0, lineHeight: 1.4 }}>
                {subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Avatar({ sender }) {
  const isUser = sender === "user"
  return (
    <div
      className="sb-avatar"
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isUser ? "#e4e1db" : "linear-gradient(135deg, #1c1a17, #3a362f)",
      }}
    >
      {isUser ? (
        <User size={14} color="#5a5754" strokeWidth={2} />
      ) : (
        <Bot size={14} color="#f7f5f2" strokeWidth={2} />
      )}
    </div>
  )
}

function MessageBubble({ msg }) {
  const isUser = msg.sender === "user"
  return (
    <div
      className="sb-msg-enter"
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        flexDirection: isUser ? "row-reverse" : "row",
        marginBottom: 18,
      }}
    >
      <Avatar sender={msg.sender} />
      <div
        className="sb-bubble"
        style={{
          maxWidth: "82%",
          padding: "11px 15px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isUser ? "linear-gradient(135deg, #1c1a17, #2e2b27)" : "#fff",
          color: isUser ? "#f7f5f2" : "#1c1a17",
          border: isUser ? "none" : "1px solid #e4e1db",
          boxShadow: isUser
            ? "0 4px 14px -6px rgba(28,26,23,0.35)"
            : "0 1px 3px rgba(0,0,0,0.03)",
          fontSize: 14.5,
          lineHeight: 1.65,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {msg.text}
      </div>
    </div>
  )
}

function ThinkingBubble() {
  return (
    <div
      className="sb-msg-enter"
      style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 18 }}
    >
      <Avatar sender="ai" />
      <div
        style={{
          padding: "13px 16px",
          borderRadius: "16px 16px 16px 4px",
          background: "#fff",
          border: "1px solid #e4e1db",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Loader2 size={14} color="#a8a49e" className="sb-spin" />
        <span style={{ fontSize: 13, color: "#a8a49e" }}>Thinking</span>
        <span className="sb-dots">
          <span className="sb-dot" />
          <span className="sb-dot" />
          <span className="sb-dot" />
        </span>
      </div>
    </div>
  )
}

function ChatInput({ value, onChange, onSend, disabled }) {
  const taRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  useEffect(() => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px"
  }, [value])

  const hasText = value.trim().length > 0

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        padding: "14px clamp(10px, 4vw, 20px) max(14px, env(safe-area-inset-bottom))",
        background: "linear-gradient(180deg, rgba(247,245,242,0) 0%, #f7f5f2 35%)",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          padding: "10px 10px 10px clamp(12px, 3vw, 18px)",
          borderRadius: 18,
          background: "#fff",
          border: "1px solid #e4e1db",
          boxShadow: "0 4px 20px -8px rgba(0,0,0,0.08)",
        }}
      >
        <textarea
          ref={taRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          disabled={disabled}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: "inherit",
            fontSize: 14.5,
            color: "#1c1a17",
            background: "transparent",
            lineHeight: 1.6,
            maxHeight: 160,
            padding: "6px 0",
          }}
        />
        <button
          onClick={onSend}
          disabled={disabled || !hasText}
          aria-label="Send message"
          className="sb-send-btn"
          style={{
            width: 36,
            height: 36,
            borderRadius: 11,
            border: "none",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: disabled || !hasText ? "default" : "pointer",
            background: hasText ? "linear-gradient(135deg, #1c1a17, #3a362f)" : "#e4e1db",
            transition: "transform 0.15s, opacity 0.15s, background 0.18s",
            opacity: disabled ? 0.6 : 1,
          }}
        >
          <Send size={15} color={hasText ? "#f7f5f2" : "#a8a49e"} strokeWidth={2.2} />
        </button>
      </div>
      <p className="sb-input-hint" style={{ textAlign: "center", fontSize: 11, color: "#c4c0ba", marginTop: 8 }}>
        Enter to send • Shift + Enter for new line
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component — backend logic / state management unchanged
// ---------------------------------------------------------------------------

export default function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [isThinking, setIsThinking] = useState(false)

  const scrollRef = useRef(null)
  const username = localStorage.getItem("username") || "Piyush"

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isThinking])

  async function sendMessage(overrideText) {
    const text = (overrideText ?? message).trim()
    if (!text) return

    const userMessage = { sender: "user", text }
    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsThinking(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })

      const data = await response.json()

      const aiMessage = { sender: "ai", text: data.response }
      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Something went wrong reaching the AI service. Please try again." },
      ])
    } finally {
      setIsThinking(false)
    }
  }

  function handleQuickAction(prompt) {
    setMessage(prompt)
  }

  const showWelcome = messages.length <= 1 && !isThinking

  return (
    <div
      style={{
        height: "100vh",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "#f7f5f2",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .sb-quick-card:hover {
          border-color: #c4c0ba !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px -8px rgba(0,0,0,0.12);
        }
        .sb-send-btn:not(:disabled):hover { transform: scale(1.06); }
        .sb-send-btn:not(:disabled):active { transform: scale(0.94); }

        @keyframes sbFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sb-msg-enter { animation: sbFadeUp 0.32s ease both; }

        @keyframes sbSpin { to { transform: rotate(360deg); } }
        .sb-spin { animation: sbSpin 0.9s linear infinite; }

        @keyframes sbDotPulse { 0%, 80%, 100% { opacity: 0.25; } 40% { opacity: 1; } }
        .sb-dots { display: inline-flex; gap: 3px; }
        .sb-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #a8a49e;
          animation: sbDotPulse 1.2s ease-in-out infinite;
        }
        .sb-dot:nth-child(2) { animation-delay: 0.15s; }
        .sb-dot:nth-child(3) { animation-delay: 0.3s; }

        .sb-scroll::-webkit-scrollbar { width: 6px; }
        .sb-scroll::-webkit-scrollbar-thumb { background: #e4e1db; border-radius: 999px; }
        .sb-scroll::-webkit-scrollbar-track { background: transparent; }

        @media (max-width: 640px) {
          .sb-header-sub { display: none; }
          .sb-status-extra { display: none; }
          .sb-status-badge { padding: 5px 8px !important; }
          .sb-avatar { width: 24px !important; height: 24px !important; }
          .sb-bubble { max-width: 86% !important; font-size: 14px !important; padding: 10px 13px !important; }
          .sb-welcome-icon { width: 44px !important; height: 44px !important; }
        }

        @media (max-width: 420px) {
          .sb-input-hint { display: none; }
        }

        @media (max-width: 360px) {
          .sb-status-badge span:first-of-type { display: none; }
        }
      `}</style>

      <ChatHeader />

      <div
        ref={scrollRef}
        className="sb-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {showWelcome ? (
          <WelcomeSection username={username} onQuickAction={handleQuickAction} />
        ) : (
          <div style={{ maxWidth: 760, width: "100%", margin: "0 auto", padding: "24px clamp(12px, 4vw, 20px) 8px" }}>
            {messages.map((msg, index) => (
              <MessageBubble key={index} msg={msg} />
            ))}
            {isThinking && <ThinkingBubble />}
          </div>
        )}
      </div>

      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={() => sendMessage()}
        disabled={isThinking}
      />
    </div>
  )
}