from flask import Flask, Blueprint, render_template, request, jsonify, url_for
from werkzeug.utils import redirect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import (
    user_loader,
    login_user,
    login_required,
    current_user,
    logout_user,
)
from utils.models import db, Users


auth = Blueprint("auth", __name__)

# @auth.route("/", methods=["GET", "POST"])
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
        return redirect(url_for("bp.index"))  # redirect to the main page
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


@auth.route("/is_authenticated")
def is_authenticated():
    """
    returns if user is authenticated and username if they are authenticated
    """
    logged_in = current_user.is_authenticated
    if logged_in:
        username = user_loader(current_user.id)
    else:
        username = None
    return jsonify(
        {"is_authenticated": current_user.is_authenticated, "user": username}
    )
