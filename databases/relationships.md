Different types of databases represent their records in different ways. For example, document databases use _composition_, wherein records are represented _inside_ of other entities. An example of this would be the relationship between a `User` and their `Bookmarks`. Composition would place the bookmark data inside the user record perhaps as a property on the users object.

Relational databases represent their records in separate _tables_ and relationships are established between tables. In our bookmarks example, there would be two tables: users and bookmarks. Each bookmark record would include a `user_id` field that refers to the `id` field of an associated record in the users table.

| Users              |
|--------------------|
| *id* :arrow_left:  |
| name               |
| address            | 

| Bookmarks              |
|------------------------|
| id                     |
| link                   |
| *user_id* :arrow_left: |

Modern databases are highly optimised to perform fast queries across multiple tables at once - these are called joins.

### Types of relationship

The relationship between tables is often described using broad _types_ that reflect a relationship modelled on 'real life'. These are usually described as _one-to-one_, _one-to-many_, and _many-to-many_.

One of the canonical examples is the relationship authors have with books: for example, one book may have many authors, and one author may have written many books. We often say an author _HAS MANY_ books, and a book _HAS MANY_ authors. (Even if it doesn't, it _could_!)

### One to one

A user _HAS ONE_ username. Most of the time this is true: although we might have display names and aliases, but we normally only have one string that we use to login.

***users***
| id | username   |
|----|------------|
| 1  | xkcd       |
| 2  | smbc       |
| 3  | rms        |
| 4  | greenblatt |
| 5  | gosper     |

### One to many

A user _HAS MANY_ blog posts. Even if they've only written one so far, they _could_ have thousands! So we think of the relationship as _one-to-many_.

***users***
| id | username   |
|----|------------|
| 1  | xkcd       |
| 2  | smbc       |
| 3  | rms        |
| 4  | greenblatt |
| 5  | gosper     |

***posts***
| id | title             | author_id |
|----|-------------------|-----------|
| 1  | Thing Explainer   | 1         |
| 2  | The GNU Manifesto | 3         |
| 3  | GNU Emacs Manual  | 3         |

Notice that `author_id` is not unique in the `posts` table: it can appear as many times as each author has posts.

### Many to many

In our hypothetical system, much like Facebook, users can have 'friends'. There is practically no limit on the number of friends a user can have. A user _HAS MANY_ friends, and each friend might have many friends.

***users***
| id | username   |
|----|------------|
| 1  | xkcd       |
| 2  | smbc       |
| 3  | rms        |
| 4  | greenblatt |
| 5  | gosper     |

***friends***
| id | user_id | friend_id |
|----|---------|-----------|
| 1  | 4       | 5         |
| 2  | 3       | 4         |
| 3  | 4       | 3         |
| 4  | 5       | 4         |
| 5  | 1       | 2         |

Here again, the same `user_id` can appear more than once, but it can also appear as a `friend_id`. We don't need the user's username to make the friend connection.
