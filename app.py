import os
from ssl import OPENSSL_VERSION_NUMBER
from dotenv import find_dotenv, load_dotenv
from flask import Flask, Blueprint, render_template, request
from flask_login import LoginManager

# import boto3

from utils.models import db, Users
from utils.saved import saved
from utils.auth import auth
from utils.create_post import create_post
from utils.profile import profile


load_dotenv(find_dotenv())

uri = os.getenv("DATABASE_URL")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# AWS_S3_CREDS = {
#     "aws_access_key_id": "AKIATJ4NIX6YIMZ75S4M",
#     "aws_secret_access_key": "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",
# }

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


# def s3_client():
#     session = boto3.session.Session()
#     client = session.client("s3", **AWS_S3_CREDS)

#     return client


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


db.init_app(app)


with app.app_context():
    db.create_all()

bp = Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)


@bp.route("/", methods=["POST", "GET"])
@bp.route("/saved")
@bp.route("/EditProfile")
@bp.route("/NewPost")
def index():
    return render_template("index.html")


# @bp.route("/upload", methods=["POST"])
# def upload():
#     """
#     Upload a file to the swe-tastebuds amazon s3 bucket
#     """
#     print("uploaded")
#     print(request.json)
#     # object = open(
#     #     "/home/sage/tastebuds/p1m3-starter-code/static/react/batman.png", "rb"
#     # )
#     # object = open(image, "rb")

#     client = s3_client()
#     # upload_file_response = client.put_object(
#     #     Body=object, Bucket="swe-tastebuds", Key="key"
#     # )

#     return render_template("index.html")


app.register_blueprint(bp)
app.register_blueprint(saved)
app.register_blueprint(auth)
app.register_blueprint(create_post)
app.register_blueprint(profile)


app.run(
    host=os.getenv("IP", "0.0.0.0"),
    port=int(os.getenv("PORT", 8080)),
    debug=True,
)
