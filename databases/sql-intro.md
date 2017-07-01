Each type of database uses a specific language to perform the CRUD operations. For example, relational databases such as MySQL, Postgres, and SQLite use the SQL language, and many document databases such as MongoDB and CouchDB use JavaScript as their query languages. Here are some examples of SQL statements for each of the CRUD operations to a relational database.

Create
```
INSERT INTO Users ('name', 'address')
VALUES ('Joe', '19 Ruru St');
```

Read
`SELECT * FROM Users;`

Update
```
UPDATE Users
SET name='Joe', address='19 Ruru St'
WHERE id=123;
```

Delete
`DELETE FROM Users WHERE id=123`

