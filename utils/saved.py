from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import (
    login_required,
    current_user,
)
from utils.models import db, User, Saved


saved = Blueprint("saved", __name__)


@saved.route("/load_saved", methods=["POST", "GET"])
# @login_required
def load_saved():
    """
    queries the saved posts of the logged in user
    """

    # query the Saved table by the user id that is logged in
    saves = Saved.query.filer_by(user_id=current_user.id)
    saves_list = []

    # add each saved post's data to the saves_list
    for save in saves:
        data = {"id": save.id, "user_id": save.user_id, "post_id": save.post_id}
        saves_list.append(data)

    # get the user name that is logged in, try to replace this later, kinda jank
    user = User.query.get(current_user.id).user

    return jsonify({"saves": saves_list, "user": user})
