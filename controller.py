
from database import DaysDatabase, UsersDatabase

class Controller:
    def __init__(self) -> None:
        self.user = UsersDatabase()
        self.days = DaysDatabase()

        self.session: int = 0

    def getUserStatistics(self):
        allDays = self.days.getDayByUser(self.session)
        userDays = []
        for day in allDays:
            userDays.append(
                {
                    "idday": day[0],
                    "time": day[1],
                    "weight": day[2],
                    "sugarLevel": day[3],
                    "mood": day[4],
                    "meals": day[5].split(";;"),
                    "notes": day[6].split(";;"),
                    "iduser": day[7]
                }
            )

        def average(list):
            result = sum(list) / len(list)
            return round(result, 2)

        all_timestamps = [day["time"] for day in userDays]
        all_weights = [day["weight"] for day in userDays]
        all_sugarLevels = [day["sugarLevel"] for day in userDays]
        last_10_weights = all_weights[-10:]
        last_10_sugarLevels = all_sugarLevels[-10:]

        all_time_max_weight = max(all_weights)
        all_time_max_sugarLevel = max(all_sugarLevels)
        all_time_min_weight = min(all_weights)
        all_time_min_sugarLevel = min(all_sugarLevels)

        last_10_max_weight = max(last_10_weights)
        last_10_max_sugarLevel = max(last_10_sugarLevels)
        last_10_min_weight = min(last_10_weights)
        last_10_min_sugarLevel = min(last_10_sugarLevels)
        last_10_average_weight = average(last_10_weights)
        last_10_average_sugarLevel = average(last_10_sugarLevels)

        return {
            "all_timestamps": all_timestamps,
            "all_weights": all_weights,
            "all_sugarLevels": all_sugarLevels,
            "last_10_weights": last_10_weights,
            "last_10_sugarLevels": last_10_sugarLevels,

            "all_time_max_weight": all_time_max_weight,
            "all_time_max_sugarLevel": all_time_max_sugarLevel,
            "all_time_min_weight": all_time_min_weight,
            "all_time_min_sugarLevel": all_time_min_sugarLevel,

            "last_10_max_weight": last_10_max_weight,
            "last_10_max_sugarLevel": last_10_max_sugarLevel,
            "last_10_min_weight": last_10_min_weight,
            "last_10_min_sugarLevel": last_10_min_sugarLevel,
            "last_10_average_weight": last_10_average_weight,
            "last_10_average_sugarLevel": last_10_average_sugarLevel,

        }
