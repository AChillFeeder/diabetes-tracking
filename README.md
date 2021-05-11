


# API ENDPOINTS

## User routes

URL   			| Arguments 				| JSON 																	| HTTP Code
 -------------- | ------------------------- | ---------------------------------------------------------------------	| ---------
REGISTER 		| USERNAME, PASSWORD, NAME  | - 																	| 201 - 406 | 
CONNECT  		| USERNAME, PASSWORD 		| {"message": message, "name": name, "days": days, "user_id": user_id} 	| 201 - 401 | 
GET_USER_DAYS 	| - 						| {"message": message, "name": name, "days": days} 						| 200 - 500 | 
LOGOUT 			| - 						| - 																	| 200 		| 


## Day routes

URL   			| Arguments 							| HTTP Code
 -------------- | ------------------------------------- | ---------
ADD DAY 		| DATE, WEIGHT, SUGAR-AMOUNT, USER_ID  	| 201 - 500 | 
EDIT DAY  		| ID, DATE, WEIGHT, SUGAR_AMOUNT		| 200 		|	 
DELETE DAY	 	| ID									| 200		| 


# CHANGELOG:
- removed flask-session
- Home page shows days
- use Effect to fix the infinite loop issue
- Add Day now accepts both form data and JSON
- Added graph
- Added delete option

# DO'S:
- [ ]  update API documentation, some returns have changed
- [x] change weight to FLOAT

# Screenshots:
## Home screen
![Screenshot of the home screen](https://raw.githubusercontent.com/AChillFeeder/diabetes-tracking/main/screenshots/home.png)
## Login screen
![Screenshot of the login screen](https://raw.githubusercontent.com/AChillFeeder/diabetes-tracking/main/screenshots/login_screen.png)
## Stats screen
![Screenshot of the stats screen](https://raw.githubusercontent.com/AChillFeeder/diabetes-tracking/main/screenshots/stats.png)
