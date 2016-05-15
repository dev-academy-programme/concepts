SQL Injection

Something to be aware of


var name = fluffy

knex('cats').where('name  = '"' + name + '"') // never do this!

SELECT * FROM cats WHERE name = "fluffy";

SELECT * FROM cats WHERE name = "fluffy"; DROP TABLE cats;



"name = ? AND age < ?", ["Bob", "70"]

( {name: name} )

Also - Cross site script attack