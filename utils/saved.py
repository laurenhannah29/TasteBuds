from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import (
    login_required,
    current_user,
)
from utils.models import db, Users, Saved, Posts


saved = Blueprint("saved", __name__)


@saved.route("/load_saved", methods=["POST", "GET"])
@login_required
def load_saved():
    """
    queries the saved posts of the logged in user
    """

    # query the Saved table by the user id that is logged in
    # saves = Saved.query.filer_by(user_id=current_user.id)

    # place holder
    saves = Saved.query.filter_by(user_id=0)

    saves_list = []

    # add each saved post's data to the saves_list
    for save in saves:
        post = Posts.query.filter_by(id=save.post_id).first()
        data = {
            "user_id": save.user_id,
            "post_id": post.id,
            "caption": post.caption,
        }
        saves_list.append(data)

    # get the user name that is logged in, try to replace this later, kinda jank
    # user = Users.query.get(current_user.id).user
    user = "placeholder"

    return jsonify({"saves": saves_list, "user": user})
