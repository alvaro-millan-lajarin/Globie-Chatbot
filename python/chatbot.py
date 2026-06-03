import sys
import json
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from chatbot_rules import chatbot_response


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No message provided"}))
        sys.exit(1)

    user_message = " ".join(sys.argv[1:])

    try:
        reply = chatbot_response(user_message)
    except Exception as exc:
        reply = f"Internal error: {exc}"

    print(json.dumps({"reply": reply}, ensure_ascii=False))
