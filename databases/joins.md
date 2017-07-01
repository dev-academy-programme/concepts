# Joins

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


ten queryies one after th other - fairly ineeficient
and so, they built SQL joins which joins the tables, so mutliple queries are no longer such a problem

SELECT * FROM accessories INNER JOIN pirates ON pirates.id = accessories.pirate.id

So what exactly does an inner join do?

This is short for 'left inner join' There are afew different ways of doing join queries. In the example above
[ [] ]

the two tables overlap - so instead of sleect * (all the attributes for everything) it only selects the attributes that overlap (which make things more efficient)

