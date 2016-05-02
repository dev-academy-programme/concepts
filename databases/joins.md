
Imagine I wanted to find the names of all the pets who belonged to Jane. This could be done with two queries

```
SELECT id FROM people WHERE name = 'Jane';
SELECT name FROM pets WHERE id = ?; //where ? equals the id we got from the previous query.
```

This is very slow, especially as the queries become more complex so SQL lets us do this in a single query.

```
SELECT pets.name
FROM pets
INNER JOIN people
WHERE pets.people_id = people.id;
```