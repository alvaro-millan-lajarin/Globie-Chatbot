"""
Globie Chatbot — entry point called by PHP (ChatbotController.php)
==================================================================
Usage:
    python3 chatbot.py "Is Japan safe?"

Output: JSON  {"reply": "..."}

Logic lives in chatbot_rules.py (ported from Downloads/ChatBot).
Data comes from the CSV files in assets/.
"""

import sys
import json
import os

# Make sure sibling modules are importable regardless of cwd
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
