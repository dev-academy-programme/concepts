It's common to have several different 'environments' that an application is run in.
They are :
  - dev environment: for building locally and observing
  - test environment: just for running tests, may have fake test data or a fake database
  - staging environment: a real server on the internet, with a copy of real data, used for final trial runs
  - production environment: the real server running live data

Each environment will be configured slightly differently - for example, I generally don't want my dev environemnt to send real emails to people!

It's also common to have different API keys for each environment. This is useful to ensure that when you're running your test environment, it isn't accidently executing money transfers, or posting gargage tweets to accounts I really care about.

We typically manage this by not hard-coding our keys into the application and instead storing them in **environment variables**.

In \*nix (unix/linux) these are declared in shell scripts using terminal commands like:

```
export TRANSIFEX_API_KEY=askdjas;lkj1;kb24i1wueaSD
```

Note that this is not JavaScript.

The package [dotenv](https://www.npmjs.com/package/dotenv) helps us set up environment variables on a per-project basis. Note the keys we put in out `.env` file follow that bash-like pattern, not a JavaScript pattern.

**VERY IMPORTANT** : make sure you have added `.env` to your `.gitignore` file, otherwise you might accidentally post your API keys on GitHub.
Worst case someone will use your keys to move money, post tweets, or max out your credit card. There are bots that trawl GitHub looking for API keys that have been commited by mistake, do not do it!
