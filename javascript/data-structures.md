You need to be able to navigate complicated nested data structures.
When you ask questions of servers on the internet, you're going to get complicated responses, like:

```js
var response = {
  statusCode: 200,
  path: "users/subscriptions",
  query: {
    basePlan: "standard",
    totalGreaterThan: 400
  },
  results: [
    {
      id: 201,
      name: "Rinsed Ltd",
      email: "rinsed@gmail.com",
      basePlan: "standard",
      xeroPlan: "starter",
      addOns: {
        gstReview: 20,
        companyAdvice: 75
      }
    },{
      id: 332,
      name: "Loomio Cooperative Ltd",
      email: "accounts@loomio.org",
      basePlan: "social enterprise",
      xeroPlan: "starter",
      addOns: {
        extraSoftware: 10,
        gstReview: 5
      }
    }
  ]
}
```

You might like to play with ways of explore this data structure in the Node REPL.

Note: REPL stands for "Read Evaluate Print Loop". When you have node installed and you type `node` in your terminal, you'll enter a simple interactive programming snadbox where you can play with JavaScript directly. The console on your browser is another type of a REPL that provides access to the browser's DOM rather than the Node.js library.

Try **chaining** property calls and navigating the data structure. For example:

```js
results.query.totalGreaterThan
```

If an object is too deep you can also tell it to give you its keys using the method `Object.keys()`. For example:

```js
Object.keys(response)
Object.keys(response.query)
```

You will encounter a lot of objects like this over the next few weeks. It's important to not be scared off and feel comfortable exploring them. Try different approaches to get information out of them.

