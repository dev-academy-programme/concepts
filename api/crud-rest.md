 Resource action | Associated HTTP request
:----------------|:------------------------
 **C**reate      | `POST`
 **R**ead        | `GET`
 **U**pdate      | `PUT`
 **D**estroy     | `DELETE`

REST = Representational State Transfer


### Example: managing users

CRUD is a way of talking about the basic actions we might want to perform with users:
 - create a new user
 - see all the users
 - see a particular user
 - update a particular user
 - delete a particular user


 Resource action | Path/route | HTTP request | ?
:----------------|:-----------|:-------------|------
 **C**reate      | `/users`   | `POST`       | creates a new user with the parcel of data you have `POST`ed
 **R**ead        | `/users`   | `GET`        | `GET` a list of all users
 **R**ead        | `/users/5` | `GET`        | `GET` the data of user 5
 **U**pdate      | `/users/5` | `PUT`        | update the date of user 5 with data you have `PUT`
 **D**estroy     | `/users/5` | `DELETE`     | `DELETE` / destroy user 5
                 | `/users/new`| `GET`       | `GET` the form for creating a new user
                 | `/users/5/edit` | `GET`   | `GET` the form for editing a new user

