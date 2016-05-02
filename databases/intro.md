You have been building programs that need to store data. Up to this point you have been storing data in memory as arrays and objects. Most applications have the requirement to store data for longer periods of time and are made up of much more data than could reasonably fit in an object or array. Imagine Facebook storing its users' information in one data structure. It would be massive, difficult to navigate, and the site would take a really long time to load. Instead, information is often stored in a database, which can store it for long periods of time and provide flexibility in which data is stored and retrieved.

Databases may run on the same computer as the web server or on a different one. Regardless, it is an explicitly different service and requires credentials in order to connect to it. So before you can store or retrieve any data to a database, you must first create a connection using predefined credentials.

After making a connection, you will perform your operations. Most databases permit 4 different types of operations and a very common mneumonic to refer to them is CRUD: create, read, update, and delete. Each of these operations represent something done on a piece of data, also called a _record_.

* Create: a new record is saved.
* Read: an existing record is retrieved.
* Update: an existing record is changed (edited).
* Delete: an existing record is removed.