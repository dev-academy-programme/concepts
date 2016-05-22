When your asynchronous function calls another asynchronous function, which calls another asynchronous function, your callbacks can get quite nested.

This anti-pattern can make your code very difficult to read and maintain.

It's affectionately, and appropriately, known as called "[callback hell](http://callbackhell.com/)"
