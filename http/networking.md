A server is often referred to as the physical or virtual machine. It's what responds when we visit a web site, sending us all the information our browser needs to display the site correctly.

A service:

 - Just an application that runs on a particular computer
 - Listens for requests and then serves responses
 - A web server is a service which serves web pages

Network addresses:

 - Same as IP address
 - The address of a computer on a network
 - An example is 192.168.1.45
 - The internet started running out of the old kind of addresses (IPv4), so now there's IPv6! These addresses look like this: `2001:4860:4860::8888`. They can include letters: `1fff:0:a88:85a3::ac1f`.

Ports: 

 - The particular 'door' at an address
 - The connection to the application/service, such as HTTP, that is listening for requests

```
   IPv4 address  port
         v       v
   192.168.20.30:80
   192.168.20.30:3000

   IPv6 address           port
         v                v
   [2001:4860:4860::8888]:80
```

