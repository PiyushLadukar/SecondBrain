export default function Dashboard() {
  return (
    <div>
      <h1>🚀 Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
          marginTop: 20,
        }}
      >
        <Card title="Chats" value="0" />
        <Card title="Memories" value="0" />
        <Card title="Agents" value="0" />
      </div>
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 15,
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  )
}