A `get` requests is a _read_ operation, and read operations shouldn't have _side effects_ - meaning, nothing should change as the result of just reading it. The parameters sent in the URL are called the _query_ part of the URL and are designed to be used to filter the data the request is requesting - not for saving data on the server.

If you're sending data to the server to be saved, you expect side effects - the saving of the data. That's fine, you should just be more explicit in your intent - by using `post`.

There are a lot of _shoulds_ in this topic. These are motivated by being a good HTTP citizen and using the protocol how it was intended. It is certainly possible to write `get` requests that have side effects, but adhering to this guidance will help you maintain expectations with other developers and illustrate your appreciation for the HTTP specification and its authors. This guidance will become even more important when we learn about REST web APIs.

