## Combining tables for fun and profit

Sometimes we need information from more than one table. If we keep our users in one table, and our user demographic data in another, we need some way to associate (say) a user's name with their age:

| id | name           |
|----|----------------|
| 8  | Orinocco       |
| 12 | Tomsk          |
| 3  | Uncle Bulgaria |

| id | user_id | age |
|----|---------|-----|
| 1  | 8       | 3   |
| 2  | 12      | 4   |
| 3  | 3       | 61  |

A **join** allows us to combine the information based on the values in a column that exists in both tables, in this case combining values when `id` is equal to `user_id`:

| name           | age |
|----------------|-----|
| Orinocco       | 3   |
| Tomsk          | 4   |
| Uncle Bulgaria | 61  |


## A nod to normalisation

The question you're probably asking is, "Why not put all the information in one table to begin with?" Well, several reasons, centering around a concept called _normalisation_. This is a huge topic in itself, but can be summarised at a beginning level by saying, "Keep information in lots of small tables and link them to each other using unique IDs." This has a number of benefits including reducing redundancy, ease of adding new types of data, and reducing complexity. 


## Knex joins

Using Knex.js we can perform joins without having to know the SQL syntax for the query:

```
knex('dogs')
  .join('breeds', 'dogs.breed_id', '=', 'breeds.id')
  .select('dogs.name', 'breeds.name as breed')
```

| id | name   | breed_id |
|----|--------|----------|
| 1  | Daisy  | 5        |
| 2  | Dexter | 3        |
| 3  | Clarry | 2        |

| id | name                  |
|----|-----------------------|
| 1  | Boxer                 |
| 2  | Spoodle               |
| 3  | King Charles Cavalier |
| 4  | Bulldog               |
| 5  | Mutt                  |

| name      | breed                 |
|-----------|-----------------------|
| Daisy     | Mutt                  |
| Dexter    | King Charles Cavalier |
| Clarry    | Spoodle               |

Note a few things about the above result:

 1. Not _all_ of the dog breeds are listed: only those that correspond to the dogs in the first table
 2. Only the columns we asked for are returned, and they are labelled `name` and `breed`.


## Name conflicts

Let's talk about that second point for a moment. Why do we use this syntax?
```
  .select('dogs.name', 'breeds.name as breed')
```
The trick is, Knex returns column names as object properties. What's wrong with this picture?
```
  [ 
    {
      name: 'Daisy',
      name: 'Mutt'
    }
  ]
```
Of course, we can't have an object with two properties the same, so what actually happens is the second one gets overwritten:
```
  [
    {
      name: 'Mutt'
    }
  ]
```
Obviously that's not what we want! The solution is to provide another name, an _alias_, for any properties that conflict in this way. We can write `'tablename.columnname as foobar'` to achieve this. In the example above, our output from Knex looks like so:
```
  [
    {
      name: 'Daisy',
      breed: 'Mutt'
    },
    {
      name: 'Dexter',
      breed: 'King Charles Cavalier'
    }
  ]
```
