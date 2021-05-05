
# API ENDPOINTS

## User routes
### register
Take USERNAME, PASSWORD, NAME as arguments
Create a user and return HTTP Status Code 201 - 406
### connect
Take USERNAME, PASSWORD as arguments
Check the creditentials and returns {"message": message, "name": name, "days": days, "user_id": user_id}
HTTP Status Code 201 - 401
### get_user_days
Takes NO DATA
Returns {"message": message, "username": username, "days": days}, HTTP Status Code 200 - 500
### logout
Takes NO ARGUMENTS
Deletes user's session


## Day routes
### add
Take DATE, WEIGHT, SUGAR-AMOUNT, USER_ID as arguments
Create a user and return HTTP Status Code 201 - 500
### edit
Takes ID, DATE, WEIGHT, SUGAR_AMOUNT as argument
returns status code 200
### delete
Takes ID as argument
returns status code 200



# CHANGELOG:
- removed flask-session
- Home page shows days
- use Effect to fix the infinite loop issue
- Add Day now accepts both form data and JSON
- Added graph
- Added delete option

# DO'S:
- update API documentation, some returns have changed
- change weight to FLOAT (done but look out for issues)
