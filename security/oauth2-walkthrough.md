What is the best way to implement any form of authentication?

 1. "Roll your own", or
 2. "Use a library?"

The answer is almost always 2. Why? Existing solutions are likely to be:

 - tested (with a specific eye to security flaws)
 - well-scrutinised
 - kept up-to-date
 - documented
 - familiar to other developers who have to maintain your code

However, it's a good idea to understand what's going on. We're going to look at an overview of one of the most common approaches to authentication on the web: OAuth 2.


### OAuth 2

Put simply, _third-party authentication_ partially shifts the burden of authentication to someone else. In the past, it was usual for web sites to store usernames and passwords for all their users. When a user visited the site, they would be asked for a password and the server would compare it with the passwords stored in the database to determine if the user would be granted access or not.

The trouble is, many sites were _really bad at it_. You may like to read up on some of the worst database intrusions in [World's Biggest Data Breaches](http://www.informationisbeautiful.net/visualizations/worlds-biggest-data-breaches-hacks/). If some of those big players can get it badly wrong, so can you! Increasingly, for convenience and security, web sites _outsource_ their authentication needs to larger providers like Facebook, Google, and GitHub. This can be a two-edged sword, and has some privacy implications. [The dangers of OAuth/Social Login](https://mortoray.com/2014/02/21/the-dangers-of-oauthsocial-login/) is an interesting treatment of the subject. However, for many modern applications it's a must, and clients will often request login via Facebook and Twitter.


### Step by step

 1. Your site contains a protected page.
 2. The user can only gain access to the page once they authenticate themselves (prove they are who they say they are).
 3. They can authenticate themselves using a _third party_, let's say Facebook.
 4. If they successfully authenticate, Facebook will give your site some unique way of identifying them.


#### The third party

Your site has a job: to protect the page (say, the user's settings page). The user must prove themselves, and to do that we send them to Facebook. They click on our "login with Facebook" button:

![Authenticate with Facebook](facebook.png)

They are shown a Facebook login form, but not just any form! This form was obtained with a URL containing directions back to your site... after the user logs in, they are sent back to your site at the location you specify. With it, Facebook sends back a _CODE_. The user still can't access the protected page: all that has happened is that they have proven themselves to Facebook.


#### Checking the code

When your site receives the _CODE_, it needs to check it. After all, anyone could visit the URL and provide any old code. It can do that by requesting an _ACCESS TOKEN_ using the _CODE_. To do so, it communicates directly with Facebook again:

 - Your site: Here is my CODE: give me an ACCESS TOKEN, so that I may authenticate this user."
 - Facebook: Fair enough... ***ACCESS TOKEN***

With the _ACCESS TOKEN_, your site has all the information it needs to prove that the user is who they say they are. Then, finally, you can give them access to the protected page.


### Tell the story again

 - The user needs a _thing_. Your site has the _thing_. The user has to authenticate themselves.
 - You redirect the user to Facebook, providing a URL on your site where the user will be redirected back to later.
 - The user logs in at Facebook and is sent back to the redirect URL with a code.
 - Your site takes the code and exchanges it for an access token with Facebook.
 - The access token lets your site query information about the user from Facebook, including a unique ID.
 - You use the unique ID to check that the user is who they say they are, and give them the _thing_ they asked for.
