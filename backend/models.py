from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date.isoformat(),
            'time': self.time.isoformat() if self.time else None
        }
