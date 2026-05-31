import { useState, useEffect, useRef } from "react"

const MESSAGES = [
  ["What are we shipping today,", "Every great product starts with one focused session."],
  ["Back at it,", "Your next commit could be the one that changes everything."],
  ["Ready to build,", "The AI chat system won't write itself — but you might."],
  ["Hey,", "Pick up where you left off. SecondBrain is waiting."],
  ["Let's go,", "One feature at a time. What's on deck today?"],
]

function AnimatedIcon() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const cx = cv.getContext("2d")
    const CX = 26, CY = 26, OR = 16, pts = 6
    const t0 = Date.now()
    let raf
    const draw = () => {
      cx.clearRect(0, 0, 52, 52)
      const t = (Date.now() - t0) / 1000
      const ang = t * 20 * Math.PI / 180
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.6)
      for (let k = 0; k < pts; k++) {
        const a = ang + k * (2 * Math.PI / pts)
        const nx = CX + Math.cos(a) * OR, ny = CY + Math.sin(a) * OR
        cx.beginPath(); cx.moveTo(CX, CY); cx.lineTo(nx, ny)
        cx.strokeStyle = "#d8d4ce"; cx.lineWidth = 0.75
        cx.setLineDash([2, 3]); cx.stroke(); cx.setLineDash([])
        cx.beginPath(); cx.arc(nx, ny, 2 + pulse, 0, 2 * Math.PI)
        cx.fillStyle = "#eae7e1"; cx.fill()
        cx.strokeStyle = "#c8c4be"; cx.lineWidth = 0.75; cx.stroke()
      }
      cx.beginPath(); cx.arc(CX, CY, 6 + pulse * 0.8, 0, 2 * Math.PI)
      cx.fillStyle = "#1c1a17"; cx.fill()
      cx.beginPath(); cx.arc(CX, CY, 2.2, 0, 2 * Math.PI)
      cx.fillStyle = "#f7f5f2"; cx.fill()
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={canvasRef} width={52} height={52} />
}

function useTypewriter(text, speed = 46, delay = 400) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed(""); setDone(false)
    const t = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => {
        i++; setDisplayed(text.slice(0, i))
        if (i >= text.length) { clearInterval(iv); setDone(true) }
      }, speed)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(t)
  }, [text])
  return { displayed, done }
}

function FadeUp({ children, delay = 0 }) {
  const [on, setOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOn(true), delay); return () => clearTimeout(t) }, [])
  return (
    <div style={{ opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
      {children}
    </div>
  )
}

export default function Dashboard() {
  const username = localStorage.getItem("username") || "Piyush"
  const [pick] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
  const full = `${pick[0]} ${username}.`
  const { displayed, done } = useTypewriter(full)

  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)
  const taRef = useRef(null)

  const handleInput = () => {
    const ta = taRef.current
    if (!ta) return
    setValue(ta.innerText)
  }

  const handleSend = () => {
    const v = taRef.current?.innerText?.trim()
    if (!v) return
    if (taRef.current) taRef.current.innerText = ""
    setValue("")
  }

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const hasText = value.trim().length > 0

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f7f5f2",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1.5rem",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .tw-cursor { display:inline-block; width:2px; height:.82em; background:#1c1a17; vertical-align:text-bottom; margin-left:2px; animation:blink 1s step-end infinite; }
        .sb-editable { flex:1; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:15px; color:#1c1a17; background:transparent; line-height:1.65; min-height:52px; white-space:pre-wrap; word-break:break-word; }
        .sb-editable:empty:before { content:attr(data-placeholder); color:#c8c4be; pointer-events:none; }
        .sb-icon-btn:hover { background:#f0ede8 !important; color:#888480 !important; }
        .sb-send-btn:hover { transform:scale(1.05); }
      `}</style>

      <div style={{ width: "100%", maxWidth: 600, display: "flex", flexDirection: "column", alignItems: "center" }}>

        <FadeUp delay={50}>
          <div style={{ marginBottom: "2rem" }}>
            <AnimatedIcon />
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(30px, 5vw, 44px)",
            color: "#1c1a17",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.4px",
            textAlign: "center",
            marginBottom: "0.75rem",
            minHeight: "1.2em",
          }}>
            {displayed}
            {!done && <span className="tw-cursor" />}
          </h1>
        </FadeUp>

        <FadeUp delay={380}>
          <p style={{ fontSize: 14, color: "#a8a49e", fontWeight: 300, textAlign: "center", marginBottom: "2.8rem", lineHeight: 1.6, maxWidth: 400 }}>
            {pick[1]}
          </p>
        </FadeUp>

        <FadeUp delay={550}>
          <div style={{ width: "100%" }}>
            <div style={{
              background: "#fff",
              border: `1px solid ${focused ? "#b8b4ae" : "#e4e1db"}`,
              borderRadius: 20,
              overflow: "hidden",
              transition: "border-color 0.2s, box-shadow 0.2s",
              boxShadow: focused ? "0 0 0 3px rgba(28,26,23,.05)" : "none",
            }}>
              {/* Input area */}
              <div style={{ padding: "16px 120px 25px", display: "flex", alignItems: "flex-end", gap: 12 }}>
                <div
                  ref={taRef}
                  className="sb-editable"
                  contentEditable
                  data-placeholder="Ask anything…"
                  onInput={handleInput}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={handleKey}
                  suppressContentEditableWarning
                />
              </div>

              {/* Footer toolbar */}
              <div style={{
                padding: "10px 14px 10px 18px",
                borderTop: "1px solid #f0ede8",
                background: "#faf9f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#b8b4ae" }}>
                  <i className="ti ti-brain" aria-hidden="true" style={{ fontSize: 13 }} />
                  <span>SecondBrain</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {[
                    { icon: "ti-paperclip", label: "Attach" },
                    { icon: "ti-microphone", label: "Voice" },
                  ].map(({ icon, label }) => (
                    <button key={label} className="sb-icon-btn" aria-label={label} style={{
                      width: 30, height: 30, borderRadius: 8, border: "none",
                      background: "transparent", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#b8b4ae", transition: "background 0.15s, color 0.15s",
                    }}>
                      <i className={`ti ${icon}`} style={{ fontSize: 15 }} />
                    </button>
                  ))}
                  <button
                    className="sb-send-btn"
                    onClick={handleSend}
                    aria-label="Send"
                    style={{
                      width: 32, height: 32, borderRadius: 9,
                      border: "none", background: "#1c1a17", cursor: hasText ? "pointer" : "default",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      opacity: hasText ? 1 : 0, pointerEvents: hasText ? "auto" : "none",
                      transition: "opacity 0.18s, transform 0.15s",
                    }}
                  >
                    <i className="ti ti-arrow-up" style={{ fontSize: 15, color: "#f7f5f2" }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </div>
  )
}