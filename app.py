import os
from dotenv import find_dotenv, load_dotenv
from flask import Flask, Blueprint, render_template
import flask
from utils.models import db, User, Posts

load_dotenv(find_dotenv())

uri = os.getenv("DATABASE_URL")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


with app.app_context():
    db.create_all()

# set up a separate route to serve the index.html file generated
# by create-react-app/npm run build.
# By doing this, we make it so you can paste in all your old app routes
# from Milestone 2 without interfering with the functionality here.
bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)

# route for serving React page
@bp.route("/")
def index():
    return flask.render_template("index.html")


app.register_blueprint(bp)


@app.route("/post", methods=["POST"])
def post():
    data = flask.request.form
    image = data.get("image")
    caption = data.get("caption")

    new_post = Posts(
        image=image,
        caption=caption,
    )

    db.session.add(new_post)
    db.session.commit()
    return flask.redirect("index")


@app.route("/get_post")
def foo():
    post = Posts.query.filter_by.all()
    return flask.jsonify(
        [
            {
                "image": Posts.image,
                "caption": Posts.caption,
            }
            for Posts in post
        ]
    )


if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        # port = int(os.getenv("PORT", 8080)),
        debug=True,
    )
