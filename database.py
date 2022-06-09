from typing import List
import mysql.connector

database = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="diabetes_tracking"
)



class DaysDatabase:
    def __init__(self) -> None:
        self.cursor = database.cursor(buffered=True)

    def addDay(self, weight: float, sugarLevel: float, mood: int, meals:List[str],  notes: List[str], iduser: int):
        sql = "INSERT INTO days (weight, sugarLevel, meals, mood, notes, iduser) VALUES (%s, %s, %s, %s, %s, %s)"
        self.cursor.execute(sql, (weight, sugarLevel, meals, mood, notes, iduser))
        database.commit()
        return self.cursor.lastrowid

    def getDayByUser(self, iduser: int):
        self.cursor.execute(f"SELECT * FROM days WHERE iduser={iduser}")
        results = self.cursor.fetchall()
        return results

    def deleteDayByID(self, idday: int):
        self.cursor.execute(f"DELETE FROM days WHERE idday={idday}")
        database.commit()
        return 1


class UsersDatabase:

    def __init__(self) -> None:
        self.cursor = database.cursor(buffered=True)

    def checkCreditentials(self, username: str, password: str):
        """Checks the validity of user creditentials
        => userID if correct
        => None if incorrect
        """ 
        # self.cursor.execute("SELECT password, id FROM users WHERE username=%s", (username))
        self.cursor.execute(f"SELECT password, idusers FROM users WHERE username='{username}'")
        result = self.cursor.fetchone()

        if result:
            id = result[1] if result[0] == password else None
        else:
            id = None

        return id

    def getUserData(self, id: int):
        self.cursor.execute(f"SELECT * FROM users WHERE idusers={id}")
        result = self.cursor.fetchone()

        organized_result = {
            "id": result[0],
            "username": result[1],
            # "password": result[2],
        } if result else None

        return organized_result

    def saveUser(self, data: dict):
        self.cursor.execute("INSERT INTO users (username, password, name) VALUES (%s, %s, %s)",
        (data["username"], data["password"], data["name"])
        )
        database.commit()
