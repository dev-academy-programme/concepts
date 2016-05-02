Authentication is the term for verifying that a user is who they say they are so that we can show them private content.
The most basic form of authentication is just a username password and a simple process could look like:

1. Client sends a GET request to '/sign-in'
2. Server renders a login form
3. Client submits the form - POST '/sign-in'
4. Server checks the username and password against the database
5. If successful it saves the userID into the session and redirects to a restricted page
6. If unsuccessful it redirects back to the login page