import sqlite3


class Schema:
    def __init__(self):
        self.conn = sqlite3.connect('todo.db')
        self.create_user_table()
        self.create_to_do_table()


    def __del__(self):
        self.conn.commit()
        self.conn.close()

    def create_to_do_table(self):

      query="""
      CREATE TABLE IF NOT EXISTS "Todo" (
        id INTEGER PRIMARY KEY,
        Title TEXT,
        Description TEXT,
        is_done boolean DEFAULT 0, 
        is_deleted boolean DEFAULT 0,
        created_on Date DEFAULT CURRENT_DATE,
        due_date Date, 
        user_id INTEGER FOREIGNKEY REFERENCES User(id)
      );
      """
      self.conn.execute(query)
