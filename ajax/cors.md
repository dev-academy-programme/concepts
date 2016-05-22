A resource makes a cross-origin HTTP request when it requests a different type of resource from a different domain. For example, an HTML page served from http://accio.com makes an <img> src request for http://lumos.com/light.jpg. Many pages on the web today load resources like CSS stylesheets, images and scripts from separate domains; such as the [jQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.js) or [normalise](https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.css) CDN.

For security reasons, browsers restrict cross-origin HTTP requests initiated from within scripts.  So, a web application using XMLHttpRequest could only make HTTP requests to its own domain.

To get around this, on both the server and the request we have to explicitly state what type of requests and data we expect. CORS is a way to work safely within Cross Origin Resouce Sharing. CORS gives web servers cross-domain access controls, which enable secure cross-domain data transfers. Modern browsers use CORS in an API container - such as XMLHttpRequest - to mitigate risks of cross-origin HTTP requests.

There are some good examples of this in action on the W3 page [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) or another one [here](http://www.html5rocks.com/en/tutorials/cors/)

Within the wonderful world of express.js, we can set what content we expect in our servers using this fabulous and easy to use module, [npm cors](https://www.npmjs.com/package/cors) (other modules are available!)
