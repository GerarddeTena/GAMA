from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    __table_args__ = {'schema': 'gama'}
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(512), nullable=False)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    players = db.relationship('Player', back_populates='user', cascade='all, delete, delete-orphan')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "user_id": self.user_id,
            "email": self.email
        }

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'email': self.email,
            'user_name': self.user_name,
        }


class Player(db.Model):
    __tablename__ = 'player'
    __table_args__ = {'schema': 'gama'}
    player_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(120), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('gama.user.user_id'), nullable=False)
    user = db.relationship('User', back_populates='players')

    def __repr__(self):
        return f'<Player {self.name}>'

    def serialize(self):
        return {
            "player_id": self.player_id,
            "name": self.name
        }
