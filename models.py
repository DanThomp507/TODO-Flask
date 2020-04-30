import sqlite3
from datetime import datetime, date
from auth import hash_password, verify_password
from flask_jwt_extended import (create_access_token)
from flask import Flask, request, jsonify


class Schema:
    def __init__(self):
        self.conn = sqlite3.connect('todo.db')
        self.create_user_table()
        self.create_to_do_table()
        # self.update_user_table()

    def __del__(self):
        self.conn.commit()
        self.conn.close()

    def create_to_do_table(self):

        query = """
        CREATE TABLE IF NOT EXISTS "Todo" (
          id INTEGER PRIMARY KEY,
          Title TEXT,
          Description TEXT,
          _is_done boolean DEFAULT 0,
          _is_deleted boolean DEFAULT 0,
          CreatedOn Date DEFAULT CURRENT_DATE,
          DueDate Date,
          UserId INTEGER FOREIGNKEY REFERENCES User(_id)
        );
        """

        self.conn.execute(query)

    def create_user_table(self):
        query = """
        CREATE TABLE IF NOT EXISTS "User" (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Email TEXT,
        CreatedOn Date default CURRENT_DATE
        );
        """
        self.conn.execute(query)

    # def update_user_table(self):
    #     query = """
    #     ALTER TABLE "User"
    #     ADD COLUMN password text;
    #     """
    #     self.conn.execute(query)


class ToDoModel:
    TABLENAME = "Todo"

    def __init__(self):
        self.conn = sqlite3.connect('todo.db')
        self.conn.row_factory = sqlite3.Row

    def __del__(self):
        # body of destructor
        self.conn.commit()
        self.conn.close()

    def get_by_id(self, _id):
        where_clause = f"AND id={_id}"
        return self.list_items(where_clause)

    def create(self, params):
        query = f'insert into {self.TABLENAME} ' \
                f'(Title, Description, DueDate, UserId) ' \
                f'values ("{params.get("Title")}","{params.get("Description")}",' \
                f'"{params.get("DueDate")}","{params.get("UserId")}")'
        result = self.conn.execute(query)
        return self.get_by_id(result.lastrowid)

    def delete(self, item_id):
        query = f"UPDATE {self.TABLENAME} " \
                f"SET _is_deleted =  {1} " \
                f"WHERE id = {item_id}"
        self.conn.execute(query)
        return self.list_items()

    def update(self, item_id, update_dict):
        """
        column: value
        Title: new title
        """
        set_query = " ".join([f'{column} = {value}'
                              for column, value in update_dict.items()])

        query = f"UPDATE {self.TABLENAME} " \
                f"SET {set_query} " \
                f"WHERE id = {item_id}"
        self.conn.execute(query)
        return self.get_by_id(item_id)

    def list_items(self, where_clause=""):
        query = f"SELECT id, Title, Description, DueDate, _is_done " \
                f"from {self.TABLENAME} WHERE _is_deleted != {1} " + \
            where_clause
        result_set = self.conn.execute(query).fetchall()
        result = [{column: row[i]
                   for i, column in enumerate(result_set[0].keys())}
                  for row in result_set]
        return result


class UserModel:
    TABLENAME = "User"

    def __init__(self):
        self.conn = sqlite3.connect('todo.db')
        self.conn.row_factory = sqlite3.Row

    def __del__(self):
        # body of destructor
        self.conn.commit()
        self.conn.close()

    def get_by_id(self, _id):
        where_clause = f"AND id={_id}"
        return self.list_items(where_clause)

    def create(self, params):
        hashed_password = hash_password(params.get("password"))
        query = f'insert into {self.TABLENAME} ' \
                f'(Name, Email, CreatedOn, password) ' \
                f'values ("{params.get("Name")}","{params.get("Email")}",' \
                f'"{datetime.now()}","{hashed_password}")'
        result = self.conn.execute(query)
        return self.get_by_id(result.lastrowid)

    def update(self, item_id, update_dict):
        """
        column: value
        Name: new name
        Email: new email
        password: new password
        """
        set_query = " ".join([f'{column} = {value}'
                              for column, value in update_dict.items()])

        query = f"UPDATE {self.TABLENAME} " \
                f"SET {set_query} " \
                f"WHERE _id = {item_id}"
        self.conn.execute(query)
        return self.get_by_id(item_id)

    def list_items(self, where_clause=""):
        query = f"SELECT _id, Name, Email, CreatedOn, password " \
                f"from {self.TABLENAME} "
        result_set = self.conn.execute(query).fetchall()
        result = [{column: row[i]
                   for i, column in enumerate(result_set[0].keys())}
                  for row in result_set]
        return result

    def delete(self, item_id):
        query = f"DELETE FROM {self.TABLENAME} " \
                f"WHERE _id = {item_id}"
        self.conn.execute(query)
        return self.list_items()

    def login(self, params):
        email = params.get('Email')
        password = params.get('password')
        result = ""

        query = f'SELECT * FROM User  ' \
                f'where email = "{email}"'
        result_set = self.conn.execute(query).fetchone()

        print(result_set['password'])

        if verify_password(result_set['password'], password):
            access_token = create_access_token(
                identity={'Name': result_set['Name'], 'Email': result_set['Email']})
            result = access_token
        else:
            result = {"error": "Invalid email and password"}
        return result
