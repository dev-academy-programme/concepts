Different types of databases represent their records in different ways. For example, document databases use _composition_, wherein records are represented _inside_ of other entities. An example of this would be the relationship between a `User` and their `Bookmarks`. Composition would place the bookmark data inside the user record perhaps as a property on the users object.

Relational databases represent their records in separate _tables_ and relationships are established between tables. In our bookmarks example, there would be 2 tables: users and bookmarks. Each bookmark record would include a `user_id` field that refers to the `id` field of an associated record in the users table.

```
+--------------------+        +-------------+
| Users              |        | Bookmarks   |
+--------------------+        +-------------+
| id                 |<---    | id          |
| name               |    \   | link        |
| address            |     ---| user_id     |
+--------------------+        +-------------+
```


Modern databases are highly optimised to perform fast queries across multiple tables at once - these are called joins.
