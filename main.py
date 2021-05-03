

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

import sqlalchemy
from sqlalchemy.exc import IntegrityError # to catch errors

# App configuration
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__)) # absolute path of this file
DEBUG = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # needed to stop warnings

db = SQLAlchemy(app)
now = datetime.now()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(30), nullable=False)

    days = db.relationship("Day")

    def __repr__(self) -> str:
        return f"<USER OBJECT>\nusername: {self.username}\npassword: {self.password}\nname: {self.name}"


class Day(db.Model):
    __tablename__ = "day"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    sugar_amount = db.Column(db.Float, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self) -> str:
        return f"<DAY OBJECT>\nuser: {self.user}\nweight: {self.weight}\nsugar_amount: {self.sugar_amount}"




# routes
@app.route("/user", methods=["POST"])
def create_user() -> dict:
    """
        Take USERNAME, PASSWORD, NAME as arguments
        Create a user and return {"message": result}, HTTP Status Code
    """
    data = request.json
    new_user = User(
        username = data["username"],
        password = data["password"],
        name = data["name"]
    )
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created"}), 200 # 200 for OK
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Duplicate username"}), 406 # 406 for Not Acceptable
        


@app.route("/user/get_all_users", methods=["GET"])
def get_all_users():
    users = User.query.all() 
    users = [{user.username: user.name} for user in users]
    return jsonify(users), 200

# @app.route("/account", methods=["GET"])

if __name__ == '__main__':
    app.run(debug=DEBUG, port=8000)

