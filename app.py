from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from service import ToDoService, UserService
from models import Schema
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)

import json

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'secret'


@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, X-Requested-With"
    response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, OPTIONS"
    return response


@app.route("/")
def hello():
    return "TODO App API"

# user routes
@app.route("/users", methods=["GET"])
def list_users():
     return jsonify(UserService().list())

@app.route("/users/register", methods=["POST"])
def create_users():
    return jsonify(UserService().create(request.get_json()))

@app.route("/users/login", methods=["POST"])
def login_user():
    return jsonify(UserService().login(request.get_json()))

@app.route("/users/<item_id>", methods=["PUT"])
def update_user(item_id):
    return jsonify(UserService().update(item_id, request.get_json()))

@app.route("/users/<item_id>", methods=["DELETE"])
def delete_user(item_id):
    return jsonify(UserService().delete(item_id))

# To do routes
@app.route("/todo", methods=["GET"])
def list_todo():
    return jsonify(ToDoService().list())


@app.route("/todo", methods=["POST"])
def create_todo():
    return jsonify(ToDoService().create(request.get_json()))


@app.route("/todo/<item_id>", methods=["PUT"])
def update_item(item_id):
    return jsonify(ToDoService().update(item_id, request.get_json()))


@app.route("/todo/<item_id>", methods=["DELETE"])
def delete_item(item_id):
    return jsonify(ToDoService().delete(item_id))


if __name__ == "__main__":
    Schema()
    app.run(debug=True, port=8888)
