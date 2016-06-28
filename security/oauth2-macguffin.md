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


## OAuth 2

Put simply, _third-party authentication_ partially shifts the burden of authentication to someone else. In the past, it was usual for web sites to store usernames and passwords for all their users. When a user visited the site, they would be asked for a password and the server would compare it with the passwords stored in the database to determine if the user would be granted access or not.

The trouble is, many sites were _really bad at it_. You may like to read up on some of the worst database intrusions in [World's Biggest Data Breaches](http://www.informationisbeautiful.net/visualizations/worlds-biggest-data-breaches-hacks/). If some of those big players can get it badly wrong, so can you! Increasingly, for convenience and security, web sites _outsource_ their authentication needs to larger providers like Facebook, Google, and GitHub. This can be a two-edged sword, and has some privacy implications. [The dangers of OAuth/Social Login](https://mortoray.com/2014/02/21/the-dangers-of-oauthsocial-login/) is an interesting treatment of the subject. However, for many modern applications it's a must, and clients will often request login via Facebook and Twitter.


## The Hunt for the MacGuffin: an OAuth Tale

Alfred Hitchcock used the term "MacGuffin" to refer to an object of desire, the _great and glorious thing_ that the protagonist (and the villains!) must obtain. We don't actually have to care what it is, exactly. We only know that it's hard to obtain.

Imagine that a user can obtain this _MacGuffin_ by logging into your site. So:

 - your site contains a _MacGuffin_
 - the user can only gain access to the _MacGuffin_ once they prove themselves
 - the way to prove themselves lies _outside_ your site, at the feet of the mighty Facebook
 - if they pass the Trial of Facebook, Facebook will give your site some unique way of identifying the user

It's just like the [_Maltese Falcon_](https://en.wikipedia.org/wiki/The_Maltese_Falcon_(1941_film)) already. (If you want a more modern example, think _unobtainium_ in [_Avatar_](https://en.wikipedia.org/wiki/Avatar_(2009_film)).)

### Requesting the MacGuffin
Your site has a job: it is the _Keeper of the MacGuffin_. This is a weighty task indeed: no-one must gain access to the MacGuffin if they are not deemed worthy! The user must prove themselves, and to do that we send them on a quest: to the hallowed servers of Facebook.

So, the user has visited our site and clicked on our "GIVE ME THE MACGUFFIN" button, which looks a lot like this:

![The MacGuffin Button](fb_icon_325x325.png)

This is but the beginning of their journey. They are shown a Facebook login form, but not just any form! This form was obtained with a URL containing directions back to your site... after the user logs in, they are sent back to your site at the location you specify. With it, Facebook sends back a _CODE_. The user still can't access the MacGuffin: all that has happened is that they have proven themselves to Facebook!


### Checking the code

When your site receives the _CODE_, it needs to check it. After all, anyone could visit the URL and provide any old code. It can do that by requesting an _ACCESS TOKEN_ using the _CODE_. To do so, it communicates directly with the mountain again: almighty Facebook.

 - Your site: "O mighty Facebook! You are the keeper of the ACCESS TOKENS. Here is my CODE: grant me an ACCESS TOKEN, that I may authenticate this lowly user."
 - Facebook: ***ACCESS TOKEN***

With the _ACCESS TOKEN_, your site has all the information it needs to prove that the user is who they say they are. Then, and only then, can they be granted the wonderous _MacGuffin_.


### Tell the story again

 - The user needs a MacGuffin. Your site has the MacGuffin. The user must prove themselves.
 - You redirect the user to Facebook, providing a URL on your site where the user will be redirected later.
 - The user logs in at Facebook and is sent back to the redirect URL with a code.
 - Your site takes the code and exchanges it for an access token.
 - The access token lets your site query information about the user from Facebook, including a unique ID.
 - You use the unique ID to check that the user is who they say they are, and give them their MacGuffin.
