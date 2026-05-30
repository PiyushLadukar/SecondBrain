export default function Sidebar({ page, setPage, logout }) {
  const items = [
    { name: "dashboard", icon: "🏠", label: "Dashboard" },
    { name: "chat", icon: "🤖", label: "AI Chat" },
    { name: "notes", icon: "📝", label: "Notes" },
    { name: "memory", icon: "🧠", label: "Memory" },
    { name: "settings", icon: "⚙️", label: "Settings" },
  ]

  return (
    <div
      style={{
        width: 260,
        background: "#fff",
        borderRight: "1px solid #e2e0db",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: 32,
          marginBottom: "2rem",
        }}
      >
        🧠 SecondBrain
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => setPage(item.name)}
            style={{
              padding: "12px",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              background:
                page === item.name ? "#1a1916" : "#f5f3ef",
              color:
                page === item.name ? "#fff" : "#000",
              textAlign: "left",
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={logout}
        style={{
          marginTop: "2rem",
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: 10,
          background: "#dc2626",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  )
}