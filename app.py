import os
from dotenv import find_dotenv, load_dotenv
from flask import Flask, Blueprint, render_template
from utils.models import db
from utils.saved import saved
from utils.create_post import create_post


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

bp = Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)

# route for serving React page
@bp.route("/")
@bp.route("/signup")
@bp.route("/profile")
@bp.route("/saved")
def index():
    return render_template("index.html")


app.register_blueprint(bp)
app.register_blueprint(saved)
app.register_blueprint(create_post)

app.run(
    host=os.getenv("IP", "0.0.0.0"),
    port=int(os.getenv("PORT", 8080)),
    debug=True,
)
