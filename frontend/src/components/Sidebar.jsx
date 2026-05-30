import {
  LayoutDashboard,
  MessageSquare,
  StickyNote,
  Brain,
  Settings,
  LogOut,
} from "lucide-react"

export default function Sidebar({ page, setPage, logout }) {
  const isMobile = window.innerWidth < 768

  const items = [
    {
      name: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "chat",
      label: "AI Chat",
      icon: <MessageSquare size={18} />,
    },
    {
      name: "notes",
      label: "Notes",
      icon: <StickyNote size={18} />,
    },
    {
      name: "memory",
      label: "Memory",
      icon: <Brain size={18} />,
    },
    {
      name: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ]

  return (
    <div
      style={{
        width: isMobile ? "80px" : "260px",
        minWidth: isMobile ? "80px" : "260px",
        background: "#fff",
        borderRight: "1px solid #e2e0db",
        padding: isMobile ? "1rem" : "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: isMobile ? 18 : 32,
            marginBottom: "2rem",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {isMobile ? "SB" : "SecondBrain"}
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
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
                gap: 10,
                padding: "12px",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                background:
                  page === item.name ? "#1a1916" : "#f5f3ef",
                color:
                  page === item.name ? "#fff" : "#000",
                transition: "0.2s",
              }}
            >
              {item.icon}
              {!isMobile && item.label}
            </button>
          ))}
        </div>
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <LogOut size={18} />
        {!isMobile && "Logout"}
      </button>
    </div>
  )
}