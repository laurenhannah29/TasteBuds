import os
from dotenv import find_dotenv, load_dotenv
from flask import Flask, Blueprint, render_template, request, url_for, current_app
from flask_mail import Mail, Message

# from flaskext.mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired

from flask_sqlalchemy import SQLAlchemy
from dotenv import find_dotenv, load_dotenv
from werkzeug.utils import redirect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import (
    LoginManager,
    login_user,
    login_required,
    current_user,
    logout_user,
)
from utils.models import db, Users

app = Flask(__name__)
app.config.from_pyfile("config.cfg")

mail = Mail(app)

s = URLSafeTimedSerializer("Thisisasecret!")

load_dotenv(find_dotenv())

uri = os.getenv("DATABASE_URL")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app.secret_key = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


db.init_app(app)


with app.app_context():
    db.create_all()

# set up a separate route to serve the index.html file generated
# by create-react-app/npm run build.
# By doing this, we make it so you can paste in all your old app routes
# from Milestone 2 without interfering with the functionality here.
bp = Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)

# route for serving React page
# @bp.route("/")
# @login_required
# def index():
#     # NB: DO NOT add an "index.html" file in your normal templates folder
#     # Flask will stop serving this React page correctly
#     return render_template("index.html")


@app.route("/", methods=["GET", "POST"])
@app.route("/login", methods=["GET", "POST"])
def login():  # login functionality with flask-login
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        user_data = Users.query.filter_by(username=username).first()
        invalid_username = user_data is None
        # if statement checking for invalid username or password
        # since we don't have the actual password, what we do is check the hash of the
        # password being passed in the hash is then being checked to see if it matches
        # the hash in database. If a database were to be comprised, the adversaries
        # don't have the actual password all they would have is the hash which to them
        # looks like a lot of random characters which they can't decode
        if invalid_username:
            return render_template(
                "login.html", is_login_page=False, invalid_username_or_password=True
            )
        if not check_password_hash(user_data.password, password):
            return render_template(
                "login.html", is_login_page=True, invalid_username_or_password=True
            )
        login_user(user_data)
        return redirect("/TasteBuds")  # redirect to the main page
    return render_template("login.html", is_login_page=True)


@app.route("/signup", methods=["GET", "POST"])
def signup():  # user can create a username and password and then login to the website
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")
        token = s.dumps(email, salt="email-confirm")

        msg = Message(
            "Confirm Email", sender="ClassiBeatz.info@gmail.com", recipients=[email]
        )

        link = url_for("confirm_email", token=token, _external=True)

        msg.body = "Your link is {}".format(link)

        mail.send(msg)

        user_data = Users.query.filter_by(username=username).first()
        user_exists = user_data is not None
        if not user_exists:
            # you should not store passwords in database
            # we should store the password hash instead within the database
            password_hash = generate_password_hash(password, method="sha256")
            user = Users(username=username, password=password_hash, email=email)
            # db.session.begin()
            db.session.add(user)
            db.session.commit()
            # return '<h1>The email you entered is {}. The token is {}</h1>'.format(email, token)

            return render_template("email.html")
        return render_template(
            "login.html", is_login_page=False, user_exists=user_exists
        )
    return render_template("login.html", is_login_page=False)


@app.route("/confirm_email/<token>")
def confirm_email(token):
    try:
        email = s.loads(token, salt="email-confirm", max_age=3600)
    except SignatureExpired:
        return "<h1>The token is expired!</h1>"
    return render_template("login.html", token_success=True, is_login_page=True)


@app.route("/TasteBuds", methods=["GET", "POST"])
@login_required
def index():
    return render_template(
        "index.html",
    )


@app.route("/logout")
@login_required
def logout():  # logout functionality with flask-login
    logout_user()
    return render_template("login.html", is_login_page=True)


app.register_blueprint(bp)


app.run(
    host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", "8080")), debug=True
)
