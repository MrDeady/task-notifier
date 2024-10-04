from flask import Blueprint, request, jsonify
from models import db, Task
from notify import send_telegram_notification
from datetime import datetime

task_bp = Blueprint('tasks', __name__)


@task_bp.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = Task(
        title=data['title'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        time=datetime.strptime(data['time'], '%H:%M').time()
    )
    db.session.add(new_task)
    db.session.commit()
    send_telegram_notification(new_task.title, new_task.date.isoformat(), new_task.time.isoformat())
    return jsonify(new_task.serialize()), 201


@task_bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.serialize() for task in tasks]), 200


@task_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted'}), 200
    return jsonify({'message': 'Task not found'}), 404