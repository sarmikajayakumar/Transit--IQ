import os
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

SYSTEM = """You are a helpdesk assistant for Dr. NGP iTech.
Answer ONLY using the CONTEXT given below.
If the answer is not in the CONTEXT, reply exactly: I don't know based on the provided information.
Never guess. Keep answers under 3 sentences."""

context = "HACKZEN '26 is held on 13-14 Oct 2026 in the AV Hall, D Block."

print(ask(f"CONTEXT: {context}\n\nQuestion: Where is the event?", SYSTEM))
print(ask(f"CONTEXT: {context}\n\nQuestion: Who won last year?", SYSTEM))
print(ask(f"CONTEXT: {context}\n\nQuestion: Write me a poem about cats.", SYSTEM))