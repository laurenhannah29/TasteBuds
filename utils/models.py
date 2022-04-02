from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy import event

db = SQLAlchemy()


class User(UserMixin, db.Model):
    """
    creates User table in db
    each user is given an id(primary key) and user which is their display name
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    creater = db.Column(db.Integer)
    image = db.Column(db.String())
    caption = db.Column(db.String())


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String())
    post_id = db.Column(db.Integer)
    comment = db.Column(db.String())


class Saved(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer)
