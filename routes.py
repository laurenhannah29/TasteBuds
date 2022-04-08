from app import app, db
import os
import flask
from models import Profile


bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)


@bp.route("/profile_page")
def new_page():
    return flask.render_template("index.html")


app.register_blueprint(bp)


@app.route("/get_profile")
def foo():
    # profile_info = Rating.query.filter_by(username=current_user.username).all()
    profile_info = Profile.query.all()
    return flask.jsonify(
        [
            {
                
                "photo": profile.photo,
                "profile_name": profile.profile_name,
                "bio": profile.bio,
            }
            for profile in profile_info

        ]
    )


@app.route("/save_profile", methods=["POST"])
def save_profile():
    # user_profile = Profile.query.filter_by(username=current_user.username).all()

    #----------------------------------
    data = flask.request.json
    user_profile = Profile.query.all()
    new_profile = [
        Profile(
            # username=current_user.username,
            photo=p["photo"],
            profile_name=p["profile_name"],
            bio=p["bio"],
        )
        for p in data
    ]
    for profile in user_profile:
        db.session.delete(profile)
    for profile in new_profile:
        db.session.add(profile)
    db.session.commit()
    return flask.jsonify("Profile successfully saved")


@app.route("/profile", methods=["POST"])
def rate():

    data = flask.request.form
    photo = data.get("photo")
    profile_name = data.get("profile_name")
    bio = data.get("bio")

    new_profile = Profile(
        # username=current_user.username,
        photo=photo,
        profile_name=profile_name,
        bio=bio,
    )

    db.session.add(new_profile)
    db.session.commit()
    return flask.redirect("index")


@app.route("/")
def landing():
    return flask.redirect("index")


@app.route("/index")
def index():

    # profile_info = Profile.query.filter_by(username=current_user.username).all()
    profile_info = Profile.query.all()
    # profile_info=Profile.query.order_by(Profile.id.desc()).first()

    return flask.render_template(
        "createProfile.html",
        profile_info=profile_info,
    )


if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        # port=int(os.getenv("PORT", 8080)),
        debug=True,
    )
