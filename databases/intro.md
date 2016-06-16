Databases make it easy for applications to save and retrieve data. They allow the data to be accessed by multiple users and potentially many applications while maintaining performance.

There are different kinds of databases. They vary based on how they store data, which can be advantageous to different types of apps depending on the data it operates on and how it needs to be structured. Examples of these database types include: relational, document, object, and graph. We'll focus on relational databases because they are very common and are appropriate for many types of applications.


### Files versus servers

Databases may run on the same computer as the web server or on a different one. Regardless, it is an explicitly different service. In the same way a web server is an application waiting for HTTP requests, a database server is an application waiting for data-related requests. Database services require credentials in order to connect to them. So before you can store or retrieve any data to a database, you must first create a connection using predefined credentials. Examples of database servers, also called Database Management Systems (DBMS) include: Oracle, MySQL, PostgreSQL and MS SQL Server. These are all relational DBMS, or RDBMS.

There are also some file-based relational databases, such as Microsoft Access and SQLite. These are appropriate when our application is only used by one user at a time because there isn't a service managing the data. However our application will access the data the same way it would if we were using an RDBMS. There are significant disadvantages to using file-based databases and they should normally not be used with production web applications. However, they are useful during development and for single-user applications, such as mobile apps.


### Structured storage (relational)

Relational data is stored in a structured way so it can be saved and retrieved easily. Fortunately you are already familiar with a structure very similar to databases: spreadsheets. While databases and spreadsheets are very different, there are enough similarities in how they conceptualise data that's it's useful to compare them.

**Entities**, also called tables, are similar to a single sheet of a spreadsheet. Each database will have at least one of these, but often has many. An example of an entity is: `Users`.

**Fields**, also called columns, are similar to the the vertical lines in the sheet of a spreadsheet. Each entity will have at least one field. Examples of fields are: `first_name`, `last_name` and `username`. There are some special fields we'll cover later.

**Records**, also called rows, are similar to the horizontal lines in the sheet of a spreadsheet. An entity will only have records when there is data stored. Until then, there are no records. An examples of a record is: 'Bernie', 'Sanders', 'burningsand'.


### Schema versus records

A database is made up two kinds of information: data and metadata. Data is the actual data being stored - 'Bernie', 'Sanders' and 'burningsand' in the example above. Metadata is the information about the data. Entities and fields define the kind of data being stored: first name, last name, and usernames of Users. It's important that you keep these concepts separate when you think about databases.


### Data operations

After making a connection, you will perform your operations. Most databases permit 4 different types of operations and a very common mneumonic to refer to them is CRUD: create, read, update, and delete. Each of these operations represent something done on a piece of data, also called a record.

* **Create**: a new record is saved.
* **Read**: an existing record is retrieved.
* **Update**: an existing record is changed (edited).
* **Delete**: an existing record is removed.


### Structured Query Language (SQL)

SQL is the language we use to perform CRUD operations on relational databases. Here are some examples of SQL statements that perform CRUD operations:

**Create**

```sql
INSERT INTO Users (id, firstName, lastName, username)
VALUES (123, 'Brendan', 'Eich', 'beich');
```

**Read**

```sql
SELECT firstName, lastName FROM Users;
```

**Update**

```sql
UPDATE Users
SET firstName='Haskell', lastName='Curry', username='hascurry'
WHERE id=10;
```

**Delete**

```sql
DELETE FROM Users WHERE id = 123;
```


## Database maintenance

There are a number of tools you can use to manage your databases. Some are graphical and some are libraries you can automate with code. The graphical tools are specific to the database engine you're using, but the libraries can often work with a number of different similar databases (e.g. RDBMS).

**Migrations** provide an automated way to create, modify and undo changes to the database schema. 
**Seeding** provides an automated way to populate the database with data. These are useful when setting up a new development environment and doing deployments.

We'll be using [Knex.js](https://knexjs.org) as a library to perform database operations and database maintenance tasks. Review the [Knex.js documentation on migrations](https://knexjs.org/#Migrations) and [schema building](https://knexjs.org/#Schema-Building) to create migrations that will establish the database schema.

