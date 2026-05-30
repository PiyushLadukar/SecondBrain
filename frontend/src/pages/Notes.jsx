export default function Notes() {
  return (
    <div>
      <h1>Notes</h1>

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 16,
          marginTop: 20,
        }}
      >
        <input
          placeholder="Write a note..."
          style={{
            width: "100%",
            padding: 12,
          }}
        />

        <button
          style={{
            marginTop: 10,
          }}
        >
          Save Note
        </button>
      </div>
    </div>
  )
}