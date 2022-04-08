from app import db

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(80))
    photo = db.Column(db.String(200))
    profile_name = db.Column(db.String(200))
    bio = db.Column(db.String(1000))


db.create_all()
