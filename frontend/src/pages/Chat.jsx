export default function Chat() {
  return (
    <div>
      <h1>AI Chat</h1>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          marginTop: 20,
          minHeight: "60vh",
        }}
      >
        <p>OpenAI integration coming next.</p>

        <div
          style={{
            display: "flex",
            flexDirection:
              window.innerWidth < 768
                ? "column"
                : "row",
            gap: 10,
            marginTop: 20,
          }}
        >
          <input
            placeholder="Ask anything..."
            style={{
              flex: 1,
              padding: 12,
            }}
          />

          <button
            style={{
              padding: 12,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}