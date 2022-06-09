

from flask import Flask, request, jsonify, session
from flask_cors import CORS
from controller import Controller
import json

import secrets

controller = Controller()

# App configuration
app = Flask(__name__)

CORS(app)
app.secret_key = secrets.token_hex(16)
DEBUG = True


# USER routes
@app.route("/register", methods=["POST"])
def register() -> tuple:
    """
        Take USERNAME, PASSWORD, NAME as arguments\n
        Create a user and return HTTP Status Code 201 - 406
    """
    data = request.json
    try:
        controller.user.saveUser(data)
        return jsonify({"message": "User created", "success": True}), 201 # 201 for Created
    except Exception as exc:
        print(exc)
        return jsonify({"message": "Duplicate username", "success": False}), 406 # 406 for Not Acceptable

@app.route("/login", methods=["POST"])
def connect_user() -> tuple:
    """
        Take USERNAME, PASSWORD as arguments\n
        HTTP Status Code 201 - 401
    """
    data = request.json
    userID = controller.user.checkCreditentials(data["username"], data["password"])
    if userID: # Connected successfully!

        controller.session = userID

        # return message
        return jsonify(
                {"message": "login successful", "id": userID, "success": True, "data": get_user_information()}
            )
    else:
        return jsonify(
                {"message": "login failed", "success": False}
            )


@app.route("/user/getUserInformation")
def get_user_information() -> str:
    userData = controller.user.getUserData(controller.session)
    userDays = controller.days.getDayByUser(controller.session)

    print(userData, userDays)

    return {
            "message": "Data retrieved",
            "success": True,
            "data": {
                "userData": userData,
                "userDays": userDays
            }
        }
    


@app.route("/user/logout", methods=["GET"])
def logout() -> tuple:
    """
        Takes NO ARGUMENTS\n
        Deletes user's session
    """
    controller.session = 0
    return {"message": "logged out successfully", "success": True}, 201


# DAY routes
@app.route("/day/add", methods=["POST"])
def add_day() -> tuple:
    """
        Create a user and return HTTP Status Code 201 - 500
    """
    data = request.json
    print(data["meals"])
    print(type(data["meals"]))
    print(data["notes"])
    print(type(data["notes"]))
    controller.days.addDay(
        data["weight"],
        data["sugarLevel"],
        data["mood"],
        ";;".join(data["meals"]),
        ";;".join(data["notes"]),
        controller.session
    )
    return {"message": "Day added successfully", "success": True}, 201


@app.route("/day/edit", methods=["POST"])
def edit_day() -> tuple:
    """
        Takes ID, WEIGHT, SUGAR_AMOUNT as argument\n
        returns status code 200
    """
    pass

@app.route("/day/delete", methods=["DELETE"])
def delete_day() -> tuple:
    """
        Takes ID as argument
        returns status code 200
    """
    pass



if __name__ == '__main__':
    app.run('0.0.0.0', 80, DEBUG)

