from flask import Flask, Blueprint, render_template, request
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
from flask import Flask, Blueprint, render_template, url_for
from utils.models import db


auth = Blueprint("auth", __name__)

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
def signup():
    """
    user can create a username and password and then login to the website
    """
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")
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
            return render_template("login.html", is_login_page=True)
        return render_template(
            "login.html", is_login_page=False, user_exists=user_exists
        )
    return render_template("login.html", is_login_page=False)


@auth.route("/logout")
@login_required
def logout():  # logout functionality with flask-login
    logout_user()
    return render_template("login.html", is_login_page=True)
