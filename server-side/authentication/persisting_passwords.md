Saving passwords in plain text in the database is very bad form. If a hacker got access they could then try and login with the username and password on every site on the internet. By encrypting the passwords in the user table we can mitigate this risk.

BCrypt is a popular library that uses a hashing function to turn a plain text password into a hash that we can save in our database.

```
//Encrypt password
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  // Store hash in your password DB.
});

//Check password
bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
  // res == true
});

```
saltRounds is a variable which increases the complexity of the hashing - the higher the number the longer the hash takes but the more secure it is.