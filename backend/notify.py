import requests


TELEGRAM_TOKEN = '7683546374:AAEIMn49qEUTvN0OeOY1mIhk3rNdHQv8QjQ'
CHAT_ID = 484049377


def send_telegram_notification(task_title, task_date, task_time):
    message = f"New task:\n{task_title}\nDate: {task_date}\nTime: {task_time}"
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        'chat_id': CHAT_ID,
        'text': message
    }
    requests.post(url, json=payload)

