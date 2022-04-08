# pylint: disable=trailing-whitespace, disable=maybe-no-member, C0116, C0103, C0114
from flask import Blueprint, request, redirect, url_for, flash, render_template, jsonify
from flask_login import (
    login_user,
    login_required,
    logout_user,
)
from utils.models import db, Posts


create_post = Blueprint("create_post", __name__)


@create_post.route("/save_post", methods=["POST"])
def save_post():
    """
    This takes is used on the create post page.
    It adds the data to the database
    """
    data = request.form
    image = data.get("myImage")
    caption = data.get("caption")

    new_post = Posts(
        user_id=0,
        image=image,
        caption=caption,
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify("Post successfully uploaded")
