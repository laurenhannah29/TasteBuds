# pylint: disable=trailing-whitespace, disable=maybe-no-member, C0116, C0103, C0114
from flask import Blueprint, request, redirect, url_for, flash, render_template, jsonify
from flask_login import (
    login_user,
    login_required,
    logout_user,
)
from utils.models import db, Posts
import boto3

AWS_S3_CREDS = {
    "aws_access_key_id": "AKIATJ4NIX6YIMZ75S4M",
    "aws_secret_access_key": "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",
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
    image = data.get("myImage")
    caption = data.get("caption")

    new_post = Posts(
        user_id=0,
        image=image,
        caption=caption,
    )
    # db.session.add(new_post)
    # db.session.commit()

    ###############################################################################################

    print("postingingigningingingingign")
    print()
    # object = open(
    #     "/home/sage/tastebuds/p1m3-starter-code/static/react/batman.png", "rb"
    # )
    # object = open(image, "rb")

    # client = s3_client()
    # upload_file_response = client.put_object(
    #     Body=object, Bucket="swe-tastebuds", Key="key"
    # )

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
