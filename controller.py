
from database import DaysDatabase, UsersDatabase

class Controller:
    def __init__(self) -> None:
        self.user = UsersDatabase()
        self.days = DaysDatabase()

        self.session: int = 0
