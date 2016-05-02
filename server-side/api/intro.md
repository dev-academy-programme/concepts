Application Programming Interface - not an initialism that feels particularly useful.

Essentially, an API is a point where you can access information if you ask for it in a specific manner.

Let's recall the analogy of the server being like a bank teller:

![client server bank](./images/client_server_bank.png)

In this story, there is:
  - a specific location (the window) where we ask questions of the server (this is called an **endpoint**)
  - a list of legal questions we can ask the bank teller/server

If we ask the bank teller through the window (*endpoint*) 'Hey, can I have $300? Here is my ID and here is my bank account number', the bank teller will hear you, check your bank account and (as long as you have enough money) reply 'yeah sure, here you go' with a nice handful of cash. This is an example of successfully using the bank teller API to get some cash (data).

Imagine if you will, you go to the bank window (*endpoint*) wearing a mask, waving a toy gun around and shouting 'GIVE ME ALL THE MONEY!' You are not going to get any money (if the bank's security is sufficiently strong!)

This highlights one of the most important features of using an API: there will be a specific way in which you can interact with them, which will be listed in its documentation. If you don't ask an API for information in a way it expects, you will not get your required data.
