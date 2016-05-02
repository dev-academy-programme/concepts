Instead of storing usernames and passwords locally we delegate authentication to a third party. This is becoming more and more common and has the following advantages:

* easier for users - they can just click a few buttons and they are logged in
* fast to build - you don't have to worry about hashes or encryption
* user data - profile images, email address, name etc. can all be retrieved with the user's consent

#### OAuth
OAuth is the industry standard for third party authentication. It is pretty simple to implement, though it can be painful to debug and there is a lot going on under the hood.

Short for OmniAuth.
It's a specific way to do authentication.
Whenever you see "Sign in with X", that's usually OAuth.

Trusted third party, e.g.:
  - google
  - facebook
  - twitter
  - github

Anyone can become a OAuth provider.

There are some important pieces of jargon to understand
* **OAuth provider:** The server which authenticates the user (e.g. Facebook, Twitter etc.)
* **Client:** The server which makes the authentication request (your app)
* **User:** The person being authenticated
* **`client_id` & `client_secret`:** these are secret codes given to the client when they register their app. If the client misbehaves then the Provider can cancel these tokens and Oauth will stop working.
* **`authentication_code`**: a code that the *Provider* gives to the *User* after they have authenticated. The *User* then gives this to the *Client*.
* **`access_token`**: a secret token (like an API token) which a client can use to access the Provider's API on the user's behalf.

This Diagram is a pretty good overview of what's going on.
![OAuth Diagram](http://tutorials.jenkov.com/images/oauth2/overview-1.png)
(source : http://tutorials.jenkov.com/images/oauth2)

The steps can be broken down into two phases

**Registration**

The Client registers their application with the Provider. They will get a client id and a client secret which need to be stored in the application's .env file. These should only ever be available on server side code in your application and never your client side code.

**Authentication**

A user comes along and wants to login or create an account.

1. The client sends a redirect to the user sending them to the provider. This redirect includes a `callback_url` for the provider to send the user to.
1. The user follows the redirect and authenticates with the provider. The provider creates their own redirect to the `callback_url` and attaches an `authentication_code` to it.
1. The user follows the redirect and visits the client, giving them the `authentication_code`.
1. The client uses the `authentication_code`, `client_id` and `client_secret` to get an `access_token` from the provider. This often comes attached with some basic data about the user such as name and email.
  * If this is the first time the client has seen this user (sign up) they can create a new record, generate a new user id and save it in the user's session
  * If they have seen the user before they retrieve the user id from the database and save it to the user's session.

The user is now authenticated and the client also has an access token (which we often save in the user table) which it can use to access the provider's API on the user's behalf.

Luckily OAuth is a popular standard so we don't have to do this by hand, instead we use a library like [Passport](http://passportjs.org/) to do this for us.