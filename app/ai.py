import ollama


MODEL = "llama3.2"


def ask_ai(prompt: str):
    response = ollama.chat(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]


def stream_ai(prompt: str):
    try:
        stream = ollama.chat(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            stream=True
        )

        for chunk in stream:
            content = chunk["message"]["content"]

            if content:
                yield content

    except Exception as e:
        print(f"Ollama error: {e}")
        yield "\n\n[ERROR] Unable to connect to the local AI model."