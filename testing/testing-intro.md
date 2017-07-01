# An Introduction to Testing

On the client side watch for massive functions which are doing a lot of filtering and shuffling. Functions that are rendering templates are ideal targets for testing.

Broadly there are two types of tests we write for the front end:


## Unit tests

These test single functions. Typically these might be functions which parse API responses for the data we care about, and handle edge cases. These you can easily test with tape.


## Integration tests

These test the integration of a number of features to test you've got a working system of parts. In practice, this is done by spinning up a browser, then having a robot click things and read the page to check for the correct responses. We'll be doing this later in the course.

