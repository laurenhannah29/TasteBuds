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
import urllib

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


@create_post.route("/save_post", methods=["POST"])
def save_post():
    """
    This takes is used on the create post page.
    It adds the data to the database
    """
    data = request.form

    # print(request.json)
    # print(request.json["image"])
    # print(request.json["caption"])

    # i = open(request.files["image"], "rb")

    # image_url = request.json["image"]
    # caption = request.json["caption"]

    # image = data.get("myImage")
    # caption = data.get("caption")

    # new_post = Posts(
    #     user_id=0,
    #     image=image,
    #     caption=caption,
    # )
    # db.session.add(new_post)
    # db.session.commit()

    ###############################################################################################
    print()
    print(request.files["file"])
    print()

    file = request.files["file"].read()
    print(file)

    client = s3_client()
    client.put_object(Body=file, Bucket="swe-tastebuds", Key="key")

    return jsonify("Post successfully uploaded")


@create_post.route("/get_post", methods=["GET"])
def get_post():
    post = Posts.query.all()
    return jsonify(
        [
            {
                "image": Posts.image,
                "caption": Posts.caption,
            }
            for Posts in post
        ]
    )
