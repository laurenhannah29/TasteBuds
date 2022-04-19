from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import (
    login_required,
    current_user,
)
from utils.models import db, Users, Comments
import flask

comment = Blueprint("comment", __name__)


@comment.route("/upload_comment", methods=["POST", "GET"])
def upload_comment():

    data = flask.request.form
    comment = data.get("comment")
    post_id = data.get("post_id")

    new_comment = Comments(
        user_id=current_user.id,
        post_id=post_id,
        comment=comment,
    )

    db.session.add(new_comment)
    db.session.commit()
    return flask.redirect((url_for("bp.index")))
    # return jsonify({"saves": "skjnfsk", "user": "user"})


@comment.route("/load_comment", methods=["POST", "GET"])
def load_comment():

    comments = Comments.query.filter_by(user_id=current_user.id)

    comments_list = []

    for comment in comments:
        username = Users.query.filter_by(id=comment.user_id).first().username
        data = {
            "username": username,
            "post_id": comment.post_id,
            "comment": comment.comment,
        }
        comments_list.append(data)

    # get the user name that is logged in, try to replace this later
    user = Users.query.get(current_user.id).username

    return jsonify({"comments": comments_list, "user": user})
