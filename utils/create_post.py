# pylint: disable=trailing-whitespace, disable=maybe-no-member, C0116, C0103, C0114
import os
from flask import Blueprint, request, redirect, url_for, flash, render_template, jsonify
from flask_login import (
    login_user,
    login_required,
    logout_user,
)
from dotenv import load_dotenv
import boto3
import uuid

from utils.models import db, Posts

load_dotenv()

AWS_S3_CREDS = {
    "aws_access_key_id": os.getenv("AWS_ACCESS_KEY_ID"),
    "aws_secret_access_key": os.getenv("AWS_SECRET_ACCESS_KEY"),
}

create_post = Blueprint("create_post", __name__)


def s3_client():
    session = boto3.session.Session()
    client = session.client("s3", **AWS_S3_CREDS)

    return client


@create_post.route("/upload_post", methods=["POST"])
def upload_post():
    """
    This takes is used on the create post page.
    It adds the data to the database
    """

    # create id to be used in amazon s3 and in postgresql
    id = str(uuid.uuid4())
    # make sure id does not already exist
    while Posts.query.filter_by(id=id).first():
        id = str(uuid.uuid4())

    title = request.form["title"]
    caption = request.form["caption"]
    nationality = request.form["nationality"]

    # add new row to posts
    new_post = Posts(
        id=id, user_id=0, title=title, caption=caption, nationality=nationality
    )
    db.session.add(new_post)
    db.session.commit()

    ###############################################################################################

    # image file
    file = request.files["file"].read()

    # add to amazon s3
    client = s3_client()
    client.put_object(Body=file, Bucket="swe-tastebuds", Key="Posts/" + id)

    return jsonify({"success": True})


@create_post.route("/get_post", methods=["GET"])
def get_post():
    post = Posts.query.all()
    return jsonify(
        [
            {
                "id": Posts.id,
                "caption": Posts.caption,
                "title": Posts.title,
                "nationality": Posts.nationality,
            }
            for Posts in reversed(post)
        ]
    )
