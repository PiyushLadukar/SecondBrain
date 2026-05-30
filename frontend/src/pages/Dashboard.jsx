export default function Dashboard() {
  const stats = [
    { title: "Chats", value: 0 },
    { title: "Memories", value: 0 },
    { title: "Agents", value: 0 },
    { title: "Documents", value: 0 },
  ]

  return (
    <div>
      <h1
        style={{
          fontSize: window.innerWidth < 768 ? 28 : 42,
        }}
      >
        Welcome Back
      </h1>

      <p style={{ color: "#777" }}>
        Your AI operating system dashboard.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            window.innerWidth < 768
              ? "1fr"
              : "repeat(4,1fr)",
          gap: 20,
          marginTop: 30,
        }}
      >
        {stats.map((item) => (
          <div
            key={item.title}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 16,
            }}
          >
            <h3>{item.title}</h3>
            <h1>{item.value}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}