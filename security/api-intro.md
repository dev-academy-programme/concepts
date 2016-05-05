If we think back to our bank API analogy, there are certain authentication checks that have to be in place for you to get your money. A bank teller will have to identify you with one of your documents in order to get you your money - or, the bank could just give your money to anyone who asks for it.

This is the same with some API calls. There are certain APIs which will require you to prove your identity (authenticate yourself).

One way you can do this is showing some known ID. This is what we'll be doing today with some APIs - they will give us a code that no-one else has, and when we make a request, we'll include that code (`API_KEY` to prove who we are).

There are a couple of reasons APIs require authentication:
  - sensitive data/actions (e.g. I don't want other people to be able to read my bank details, or post messages on my behalf)
  - API over-use (if you force people to show ID when they ask a question, it's easier to block people who are spamming you with questions)
