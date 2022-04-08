from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy import event

db = SQLAlchemy()


class Users(UserMixin, db.Model):
    """
    creates User table in db
    each user is given an id(primary key) and user which is their display name
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120))
    password = db.Column(db.String(100))
    email = db.Column(db.String(100))

    # def __init__(self, username, password, email):
    #     self.username = username
    #     self.password = password
    #     self.email = email


class Posts(db.Model):
    """
    id(Intger) primary key
    user_id(Integer) the creater of the post
    image(String) I am assuming this a url
    caption(String) caption under the post
    """

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    image = db.Column(db.String())
    caption = db.Column(db.String())


class Comments(db.Model):
    """
    id(Integer) primary key
    user_id(Intger) user that creater comment
    post_id(Integer) post that this under
    comment(String) the content
    """

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer())
    post_id = db.Column(db.Integer)
    comment = db.Column(db.String())


class Saved(db.Model):
    """
    id(Integer) primary key
    user_id(Intger) user that saved
    post_id(Integer) post that is saved
    """

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer)
