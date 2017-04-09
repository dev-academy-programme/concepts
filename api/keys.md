It isn't uncommon when consuming an external web API that you'll need to authenticate your app in order to use it. Often this authentication doesn't need a high security solution; for example when accessing non-sensative read-only data. In these cases, we only need to send a string that identifies our app. We call this string a _key_. We usually get this key from the admin section of our developer user account on the site. In the case of [mashape.com](https://mashape.com), we must send this key as the value of a `X-Mashape-Authorization` HTTP request header in each of our API calls.

When using [`superagent`](https://github.com/visionmedia/superagent), we might make the request like this:

```js
request
  .get('https://numbersapi.p.mashape.com/1/22/date')
  .set('X-Mashape-Authorization', '7zdlxkb3jqmshIgOJzR0qN5NdQc3p1PxmhXjsnJvX4hNVr2Yio')
  .set('Accept', 'application/json')
  .end(function(err, res){
    console.log(res.body.text)
  })
```

This does require you to send your API key to the browser, which yes, means anyone can see your key and potentially use it. It also means you're probably commiting the key to your source control repository. In low security scenarios this can be okay. We will explore more secure scenarios later in the bootcamp, but what if you don't want to include your key in the client-side code even in low security scenarios? In this case you will need to consume the API from a server, your own API. Doing so will keep the key out of source control and away from any browsers. If you take this approach, consider using [`dotenv`](https://www.npmjs.com/package/dotenv) as a place to keep your API key. You'll place the key in a `.evn` file and make sure this file has an entry in your `.gitignore` file. The npm package is smart enough to use the contents of the `.env` file when it can find it, and use normal environment variables when it can't...
