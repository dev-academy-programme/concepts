Deploying a web application is most certainly specific to the environment being deployed to. With that said, it is increasingly common for cloud providers to allow applications to be deployed using Git. 

Some cloud providers, such as Azure, are able to watch our GitHub repo, notice when we push a new commit to a specific branch we define, and clone it for deployment each time we push. Other cloud providers, such as Heroku, allow us to push directly to it. To do so, we just create a `git remote` that points to our account on the cloud platform. These approaches make deployment _really_ easy.


### Deploying to Heroku

For more information on deploying a Node.js application to Heroku, see the [associated documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).
