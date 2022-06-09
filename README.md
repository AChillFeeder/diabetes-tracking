
# DESCRIPTION
A simple application where you log your weight and glycemy every day, you can then check on your progress by going through your previous days or from the graph.

# CHANGELOG:
- removed flask-session
- Home page shows days
- use Effect to fix the infinite loop issue
- Add Day now accepts both form data and JSON

# REFACTORING:
- [ ] Add more properties to 'Day', Eg: meals, notes, mood
- [ ] Graphs for everything
- [ ] Statistics page with in-depth information

# DO'S:
- [x] Delete Day
- [x] change weight to FLOAT
- [x] Check inputs in NewDay (don't allow mood more than 10 for example)
- [ ] More stats ( average of this week/month, best/worst day )
- [ ] Graphs
- [ ] Sorting
- [ ] Only show N number of days in home screen.
- [ ] Better Date format in Home screen.
- [ ] Enable theme change in Settings.
- [ ] Add Session decorator
- [ ] Language change in option.
- [ ] Update Day
- [ ] update API documentation, some returns have changed

# Screenshots:
## Home screen
![Screenshot of the home screen](https://raw.githubusercontent.com/AChillFeeder/diabetes-tracking/main/screenshots/home.png)
## Login screen
![Screenshot of the login screen](https://raw.githubusercontent.com/AChillFeeder/diabetes-tracking/main/screenshots/login_screen.png)
## Stats screen
![Screenshot of the stats screen](https://raw.githubusercontent.com/AChillFeeder/diabetes-tracking/main/screenshots/stats.png)
