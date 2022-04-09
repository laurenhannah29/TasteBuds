import flask
from flask_login import current_user, login_required
from utils.models import db, Users


profile = flask.Blueprint("profile", __name__)


@profile.route("/get_profile")
def get_profile():
    """return json data of the user information"""
    # profile_info = Rating.query.filter_by(username=current_user.username).all()

    profile_info = Users.query.filter_by(id=current_user.id)
    return flask.jsonify(
        [
            {
                # "photo": profile.photo,
                "profile_name": profile.username,
                "bio": profile.bio,
            }
            for profile in profile_info
        ]
    )


@profile.route("/save_profile", methods=["POST"])
def save_profile():
    """
    updates profile table?
    """
    data = flask.request.json
    bio = data[0]["bio"]
    profile_name = data[0]["profile_name"]

    user_profile = Users.query.filter_by(id=current_user.id).first()

    # TODO add profile picture
    new_profile = Users(
        id=user_profile.id,
        username=profile_name,
        password=user_profile.password,
        email=user_profile.email,
        bio=bio,
    )

    db.session.delete(user_profile)
    db.session.add(new_profile)
    db.session.commit()

    return flask.jsonify("Profile successfully saved")


@profile.route("/profile", methods=["POST", "GET"])
def rate():
    """
    adds to profile table that does not exist
    """

    data = flask.request.form
    # photo = data.get("photo")
    profile_name = data.get("profile_name")
    bio = data.get("bio")

    new_profile = Users(
        # username=current_user.username,
        # photo=photo,
        username=profile_name,
        bio=bio,
    )

    db.session.add(new_profile)
    db.session.commit()
    return flask.redirect("index")


@profile.route("/index")
def index():
    """
    Displays the profile information
    """
    # profile_info = Profile.query.filter_by(username=current_user.username).all()
    profile_info = Users.query.filter_by(id=current_user.id)
    # profile_info=Profile.query.order_by(Profile.id.desc()).first()

    return flask.render_template(
        "profile.html",
        profile_info=profile_info,
    )
