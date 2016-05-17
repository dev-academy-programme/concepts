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

*(side note: REPL stands for Read-Evaluate-Print-Loop, when you have node installed and you type `node` into your command line, this brings up a simple interactive programming snadbox where you can play with inputs. The console on your browser is another example of a REPL)*

Try **chaining** property calls and navigating the data structure. e.g.

```js
results.query.totalGreaterThan
```

If an object is too deep you can also tell it to give you its keys using the method `Object.keys()` e.g.

```js
Object.keys(response)
Object.keys(response.query)
```

You will encounter a lot of objects like this over the next few weeks. It's important to not be scared off and feel comfortable with playing around; try different approaches to get information out of them.


