A *view* is the part of the web application that creates what the user sees in their browser. For a static website, such as the blogs you created in Phase 0, the view will be a single HTML file. In these cases, the HTML markup and the data are combined into a single file: the HTML file. However, in most web applications, the data is stored separately from the HTML and constructed dynamically when the user requests that page.

Think about this in the context of Facebook. Facebook has millions of users, all of whom have a homepage that is unique to them. It would be impossible to write all of these pages as static HTML files. Instead, the page is constructed from templates. These are filed in by information that is fetched from a database and dynamically placed into the template (rendered) which creates a unique page for each user.

Separating the data from how that data is displayed gives us a lot of flexibility and makes it easier to create pages that are specific to user or situation. Rather than include the data in each page, we add placeholders where we can add the data later. A _template_ for the web is an HTML page that contains placeholders for data instead of the actual data.

A real-world example of a template is a paint-by-numbers kit. The paper with lines and numbers (an empty picture) is the template and the paint is the data. Multiple copies of empty pictures will have very different outcomes with different combinations of paint.

![paint by numbers](https://raw.githubusercontent.com/dev-academy-programme/concepts/master/images/paint-by-numbers.jpg)
