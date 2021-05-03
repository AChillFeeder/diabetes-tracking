

from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime
from sqlalchemy import exc
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql.elements import Null # to catch errors

# App configuration
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__)) # absolute path of this file
DEBUG = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # needed, to stop warnings
app.secret_key = "super duper secret key!"

db = SQLAlchemy(app)

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
    date = db.Column(db.DateTime, nullable=False, default=datetime.now())
    weight = db.Column(db.Float, nullable=False)
    sugar_amount = db.Column(db.Float, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self) -> str:
        return f"<DAY OBJECT>\nuser: {self.user}\nweight: {self.weight}\nsugar_amount: {self.sugar_amount}"




# routes
@app.route("/user/register", methods=["POST"])
def create_user() -> tuple:
    """
        Take USERNAME, PASSWORD, NAME as arguments
        Create a user and return {"message": message}, HTTP Status Code 200 - 406
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

@app.route("/user/connect", methods=["POST"])
def connect_user() -> tuple:
    """
        Take USERNAME, PASSWORD as arguments
        Check the creditentials and returns {"message": message, "name": name, "days": days, "user_id": user_id}
        HTTP Status Code 200 - 401
    """
    data = request.json
    potential_user = User.query.filter_by(username=data["username"]).first()
    if potential_user and potential_user.password == data["password"]: # Connected successfully!

        # session
        session["current_user_id"] = potential_user.id

        # return message
        return jsonify(
                {"message": "login successful", "name": potential_user.name, "days": "", "user_id": potential_user.id}
            ), 200
    else:
        return jsonify(
                {"message": "login failed", "name": "", "days": "", "user_id": ""}
            ), 401 # 401 for Unauthorized

@app.route("/user/days", methods=["GET"])
def get_user_days() -> tuple:
    """
        Takes NO DATA
        Returns {"message": message, "username": username, "days": days}, HTTP Status Code 200 - 500
    """

    try:
        user_id = session["current_user_id"]
    except KeyError:
        return jsonify({"message": "not connected"}), 403

    try:
        relevant_days = Day.query.filter_by(user_id=user_id).all()
        serialized_days = [ # turn relevant_days into JSON-able data
            {
                "id": day.id,
                "date": day.date,
                "weight": day.weight,
                "sugar_amount": day.sugar_amount,
                "user_id": day.user_id
            } 
            for day in relevant_days
        ]
        return jsonify({"message": "success", "days": serialized_days}), 200
    except Exception as exc:
        return jsonify({"message": exc}), 500

@app.route("/user/logout", methods=["GET"])
def logout():
    session.pop("current_user_id", None)
    return {"message": "logged out successfully"}, 200



@app.route("/day/add", methods=["POST"])
def add_day() -> tuple:
    """
        Take DATE, WEIGHT, SUGAR-AMOUNT, USER_ID as arguments
        Create a user and return {"message": message}, HTTP Status Code 200 - 500
    """
    data = request.json
    if "date" in data.keys():
        # add option to input a different day
        pass

    new_day = Day(
        weight = data["weight"],
        sugar_amount = data["sugar_amount"],
        user_id = data["user_id"]
    )
    try:
        db.session.add(new_day)
        db.session.commit()
        return jsonify({"message": "Day created"}), 200 # 200 for OK
    except Exception as exc:
        print(exc)
        db.session.rollback()
        return jsonify({"message": "An error occured"}), 500 # 500 for Internal Server Error

@app.route("/day/edit", methods=["POST"])
def edit_day() -> tuple:
    pass

@app.route("/day/delete", methods=["DELETE"])
def delete_day() -> tuple:
    pass

# TESTS ONLY
# @app.route("/user/get_all_users", methods=["GET"])
# def get_all_users():
#     users = User.query.all() 
#     users = [{user.username: user.name} for user in users]
#     return jsonify(users), 200


if __name__ == '__main__':
    app.run(debug=DEBUG, port=8000)

