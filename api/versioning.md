# Versioning APIs

APIs should be properly versioned. APIs evolve and change, we must do this while supporting old versions. Otherwise, if you just change your API, a lot of your clients would be in trouble. Although, we won't be developing multiple versions (today we're working on V1), it is important that we plan for the future and properly namespace our documentation and work under V1 namespace.

Here's our v2 api: get a list of all cats at `/cats`

```
api/v2/cats
```

Our original api might have been badly designed, or we learned a lot from it.
We can leave this api running and give people notice that we're going to close it in a year.
The original route for getting all the cats was `/show_me_the_cats`

```
api/v1/show_me_the_cats
```

