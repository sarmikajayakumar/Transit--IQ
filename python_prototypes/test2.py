import os
import json
from groq import Groq

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)
MODEL = "openai/gpt-oss-20b"

def ask(question, system="You are a helpful assistant."):
    resp = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": question},
        ],
    )
    return resp.choices[0].message.content

def ask_json(question):
    system = 'Reply ONLY in JSON like {"answer": "...", "confidence": "high|medium|low"}'
    text = ask(question, system)
    text = text.replace("```json", "").replace("```", "").strip()
    return json.loads(text)

data = ask_json("What is the capital of India?")
print(data["answer"])
print(data["confidence"])
print(ask("Explain RAG in one sentence."))