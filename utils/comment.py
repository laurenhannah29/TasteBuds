from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import (
    login_required,
    current_user,
)
from utils.models import db, Users, Comment
import flask

comment = Blueprint("comment", __name__)


@comment.route("/upload_comment", methods=["POST", "GET"])
def upload_comment():

    data = flask.request.form
    comment = data.get("comment")
    post_id = data.get("post_id")

    new_comment = Comment(
        user_id=current_user.id,
        post_id=post_id,
        comment=comment,
    )

    db.session.add(new_comment)
    db.session.commit()
    return flask.redirect((url_for("bp.index")))
    # return jsonify({"saves": "skjnfsk", "user": "user"})


@comment.route("/load_comment", methods=["GET"])
def load_comment():

    # comments = Comment.query.filter_by(user_id=current_user.id)
    comments = Comment.query.all()
    return jsonify(
        [
            {
                "username": current_user.id,
                "post_id": Comment.post_id,
                "comment": Comment.comment,
            }
            for Comment in reversed(comments)
        ]
    )
