import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

API_KEY = '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'
ENDPOINT = 'https://api.openai.com/v1/engines/text-davinci-002/completions'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_response", methods=["POST"])
def get_response():
    user_input = request.json.get("userInput")
    text_response, voice_response = generate_response(user_input)
    return jsonify({"response": text_response, "voice_response": voice_response})

def generate_response(user_input):
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {
        'prompt': f"{user_input}\nChatbot:",
        'max_tokens': 150,
        'temperature': 0.7
    }

    response = requests.post(ENDPOINT, headers=headers, json=data)
    
    try:
        text_response = response.json()['choices'][0]['text'].strip()
    except KeyError:
        text_response = "Error: Unexpected response from the AI model."
    
    voice_response = text_response

    return text_response, voice_response

if __name__ == "__main__":
    app.run(debug=True)







