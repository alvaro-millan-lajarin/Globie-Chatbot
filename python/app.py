"""
Globie — Python Flask chatbot server
=====================================
Start with:  python3 app.py
Runs at:     http://localhost:5000

PHP (ChatbotController) calls POST /chat with JSON {"message": "..."}
"""

from flask import Flask, jsonify, request
from chatbot_rules import chatbot_response

app = Flask(__name__)


@app.route("/health")
def health():
    return jsonify({"status": "ok", "service": "globie-chatbot"})


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True)
    if not data or "message" not in data:
        return jsonify({"error": "Missing 'message' field."}), 400

    sentence = data["message"].strip()
    if not sentence:
        return jsonify({"reply": "Please type something!"}), 200

    reply = chatbot_response(sentence)
    return jsonify({"reply": reply})


if __name__ == "__main__":
    print("=" * 50)
    print("  Globie chatbot running at http://localhost:5000")
    print("  Keep this terminal open while using the web app")
    print("=" * 50)
    app.run(debug=False, port=5000, host="0.0.0.0")
