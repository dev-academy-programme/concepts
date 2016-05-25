Deploying a web application is most certainly specific to the environment being deployed to. With that said, it is increasingly common for cloud providers to allow applications to be deployed using Git. 

Some cloud providers, such as Azure, are able to watch our GitHub repo, notice when we push a new commit to a specific branch we define, and clone it for deployment each time we push. Other cloud providers, such as Heroku, allow us to push directly to it. To do so, we just create a `git remote` that points to our account on the cloud platform. These approaches make deployment _really_ easy.


### Deploying to Heroku

These steps assume the file that starts your server is `server.js`. If it isn't, adjust the steps accordingly. The basic steps to deploy to Heroku are:

* Create an account on heroku.com.
* Install the Heroku Toolbelt.
* Login to Heroku in your terminal with `heroku login`.
* In the folder of your Node app, create the Heroku app with `heroku create YOUR_APP_NAME`.
* Ensure your `package.json` has a `start` script of `node server.js`.
* Ensure you have a `Procfile` whose only line is `web: node server.js`.
* Push your app to Heroku with `git push heroku master`.
* If you experience an error, use `heroku logs`.

For more information on deploying a Node.js application to Heroku, see the [associated documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).
