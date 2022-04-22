from flask import Blueprint, render_template, url_for, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import redirect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import (
    login_user,
    login_required,
    logout_user,
)
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired

from utils.models import db, Users
from utils.models import db


auth = Blueprint("auth", __name__)

mail = Mail()

s = URLSafeTimedSerializer("Thisisasecret!")

@auth.route("/login", methods=["GET", "POST"])
def login():
    """
    login functionality with flask-login
    """
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
        return redirect(url_for("bp.home"))  # redirect to the main page
    return render_template("login.html", is_login_page=True)


@auth.route("/signup", methods=["GET", "POST"])
def signup():  # user can create a username and password and then login to the website
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")
        token = s.dumps(email, salt="email-confirm")

        msg = Message(
            "Confirm Email", sender="ClassiBeatz.info@gmail.com", recipients=[email]
        )

        link = url_for("auth.confirm_email", token=token, _external=True)

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

@auth.route("/confirm_email/<token>")
def confirm_email(token):
    try:
        email = s.loads(token, salt="email-confirm", max_age=3600)
    except SignatureExpired:
        return "<h1>The token is expired!</h1>"
    return render_template("login.html", token_success=True, is_login_page=True)


@auth.route("/logout")
@login_required
def logout():  # logout functionality with flask-login
    logout_user()
    return render_template("login.html", is_login_page=True)
