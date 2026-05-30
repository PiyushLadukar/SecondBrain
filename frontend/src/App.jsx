import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Chat from "./pages/Chat"
import Notes from "./pages/Notes"
import Memory from "./pages/Memory"
import Settings from "./pages/Settings"

import { useState } from "react"


export default function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("login")
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [toast, setToast] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
 )    
 const [page, setPage] = useState("dashboard")

  function showToast(msg, ok = true) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleSubmit() {
    if (!username.trim() || !password) {
      showToast("Please fill in all fields", false)
      return
    }
    setLoading(true)
    try {
      const url = mode === "login"
        ? "http://127.0.0.1:8000/login"
        : "http://127.0.0.1:8000/signup"
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (mode === "login") {
        if (data.access_token) {
           localStorage.setItem("token", data.access_token)

           setIsLoggedIn(true)

           showToast(`Welcome back, ${username}`, true)
        } else {
          showToast(data.error || "Login failed", false)
        }
      } else {
        showToast(data.message || data.error || "Done", !!data.message)
      }
    } catch {
      showToast("Could not reach server", false)
    }
    setLoading(false)
  }
  function logout() {
  localStorage.removeItem("token")
  setIsLoggedIn(false)
  }
  const inputStyle = {
    width: "100%",
    padding: "11px 12px 11px 38px",
    fontFamily: "inherit",
    fontSize: 14,
    color: "#1a1916",
    background: "#faf9f7",
    border: "1px solid #e6e3de",
    borderRadius: 10,
    outline: "none",
  }
 
  if (isLoggedIn) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f3ef",
      }}
    >
      <Sidebar
        page={page}
        setPage={setPage}
        logout={logout}
      />

      <div
        style={{
          flex: 1,
          padding: "2rem",
        }}
      >
        {page === "dashboard" && <Dashboard />}
        {page === "chat" && <Chat />}
        {page === "notes" && <Notes />}
        {page === "memory" && <Memory />}
        {page === "settings" && <Settings />}
      </div>
    </div>
  )
}
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ background: "#f5f3ef", fontFamily: "'DM Sans', sans-serif" }}
      onKeyDown={(e) => e.key === "Enter" && !loading && handleSubmit()}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500&display=swap');
        .sb-input::placeholder { color: #c4c1bc; }
        .sb-input:focus { border-color: #1a1916 !important; background: #fff !important; }
        @keyframes rot { to { transform: rotate(360deg); } }
        .spin { animation: rot 0.6s linear infinite; }
        @keyframes toastUp { from { opacity:0; transform:translateX(-50%) translateY(12px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }
        .toast-in { animation: toastUp 0.25s ease both; }
      `}</style>

      {/* Card */}
      <div style={{
        background: "#fff",
        border: "0.5px solid #e2e0db",
        borderRadius: 20,
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: 360,
      }}>
        {/* Brand */}
        <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: "#1a1916", textAlign: "center", marginBottom: 4 }}>
          SecondBrain
        </p>
        <p style={{ fontSize: 13, color: "#999490", textAlign: "center", marginBottom: "2rem" }}>
          Your AI operating system
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #ece9e4", marginBottom: "1.75rem" }}>
          {["login", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                padding: "8px",
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 500,
                background: "none",
                border: "none",
                borderBottom: mode === m ? "2px solid #1a1916" : "2px solid transparent",
                marginBottom: -1,
                cursor: "pointer",
                color: mode === m ? "#1a1916" : "#b0ada8",
                transition: "all 0.18s",
              }}
            >
              {m === "login" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        {/* Username */}
        <div className="relative" style={{ marginBottom: 10 }}>
          <i className="ti ti-user" aria-hidden="true" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#c4c1bc", fontSize: 15, pointerEvents: "none" }} />
          <input
            className="sb-input"
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Password */}
        <div className="relative" style={{ marginBottom: "1.25rem" }}>
          <i className="ti ti-lock" aria-hidden="true" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#c4c1bc", fontSize: 15, pointerEvents: "none" }} />
          <input
            className="sb-input"
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, paddingRight: 38 }}
          />
          <button
            onClick={() => setShowPwd(!showPwd)}
            aria-label="Toggle password"
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#c4c1bc", padding: 4, fontSize: 15 }}
          >
            <i className={showPwd ? "ti ti-eye-off" : "ti ti-eye"} />
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: 11,
            background: "#1a1916",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontFamily: "inherit",
            fontSize: 14,
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.75 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "opacity 0.18s",
          }}
        >
          {loading && (
            <div className="spin" style={{ width: 14, height: 14, border: "1.5px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%" }} />
          )}
          {!loading && (mode === "login" ? "Sign in" : "Create account")}
        </button>

        <p style={{ fontSize: 12, color: "#b8b5b0", textAlign: "center", marginTop: "1.25rem" }}>
          By continuing you agree to our{" "}
          <span style={{ color: "#888480", cursor: "pointer" }}>Terms</span>
          {" & "}
          <span style={{ color: "#888480", cursor: "pointer" }}>Privacy</span>
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="toast-in"
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1a1916",
            color: "#fff",
            borderRadius: 8,
            padding: "9px 16px",
            fontSize: 13,
            whiteSpace: "nowrap",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            gap:9 ,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: toast.ok ? "#4caf76" : "#e05a4e", flexShrink: 0 }} />
          {toast.msg}
        </div>
      )}
    </div>
  )
}
