## heroku link 
https://mighty-spire-93765.herokuapp.com/

# Setup Instructions
pip3 install -r requirements.txt

## Create a .env file in the top-level directory and enter the following as its contents:
export DATABASE_URL="<YOUR POSTGRESQL DB URL>"
AWS_ACCESS_KEY_ID= "<YOUR AWS ACCESS KEY ID>"
AWS_SECRET_ACCESS_KEY= "<YOUR AWS ACCESS KEY>"
SECRET_KEY="<YOUR SECRET KEY>"

# To run the app
Run python3 app.py

# Linting  

### auth.py

E1101: Instance of 'scoped_session' has no 'add' member (no-member)
E1101: Instance of 'scoped_session' has no 'commit' member (no-member)
    Reason for both: There is no error or bug in the code. The code runs fine.


auth.py:14:0: E0401: Unable to import 'utils.models' (import-error)
    Reason: Not an error. If 'utils.models' was changed to 'models', there would be an error because app.py imports this file and it is outside of the utils folder.

### comment.py

comment.py:6:0: E0401: Unable to import 'utils.models' (import-error)
    Reason: Not an error. If 'utils.models' was changed to 'models', there would be an error because app.py imports this file and it is outside of the utils folder.
comment.py:2:0: W0611: Unused request imported from flask (unused-import)
comment.py:2:0: W0611: Unused redirect imported from flask (unused-import)
    Reason: the request and redirect are used in app.py which imports comment.py

### create_post.py
create_post.py:13:0: E0401: Unable to import 'utils.models' (import-error)
    Reason: Not an error. If 'utils.models' was changed to 'models', there would be an error because app.py imports this file and it is outside of the utils folder.

### nutrition.py
nutrition.py:3:0: W0611: Unused name imported from unicodedata (unused-import)
    Reason: Not an error. Variable name is used in app.py and app.py imports this file.
nutrition.py:17:0: E0401: Unable to import 'utils.models' (import-error)
     Reason: Not an error. If 'utils.models' was changed to 'models', there would be an error because app.py imports this file and it is outside of the utils folder.

### profile.py
profile.py:3:0: E0401: Unable to import 'utils.models' (import-error)
profile.py:4:0: W0611: Unused login_required imported from flask_login (unused-import)
    Reason: Not an error. If 'utils.models' was changed to 'models', there would be an error because app.py imports this file and it is outside of the utils folder.

### utils.py
saved.py:9:0: W0611: Unused Users imported from utils.models (unused-import)
    Reason: Not an error. If 'utils.models' was changed to 'models', there would be an error because app.py imports this file and it is outside of the utils folder.
saved.py:11:0: W0611: Unused Users imported from utils.models (unused-import)
    Reason: Not an error. If 'utils.models' was changed to 'models', there would be an error because app.py imports this file and it is outside of the utils folder.

### saved.py
saved.py:55:4: C0103: Variable name "savedPosts" doesn't conform to snake_case naming style (invalid-name)
Reason: Just a variable name. It does not produce an error.
