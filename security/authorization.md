Authorization and Authentication go hand in hand but are quite different. Authentication is about proving who a user is. Authorization is about what a user is allowed to do.

Authentication is pretty standard and can be done with mostly off the shelf libraries.

Authorization is quite variable and changes from application to application. There are libraries out there to make this easier (e.g. [ACL](https://www.npmjs.com/package/acl) or [CanCan](https://www.npmjs.com/package/cancan)) but it is quite common for developers to build their own authorization logic.