import os
from groq import Groq

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

messages = [{"role": "user", "content": "Explain RAG in one sentence."}]
try:
    resp = client.chat.completions.create(model="openai/gpt-oss-20b", messages=messages)
    print(resp.choices[0].message.content)
except Exception as e:
    print("ERROR:", e)