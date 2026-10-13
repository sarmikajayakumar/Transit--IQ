import os
from groq import Groq

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

for m in client.models.list().data:
    print(m.id)