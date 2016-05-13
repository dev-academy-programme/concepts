Like a factory function, but spins up a minimum project setup.

Slush provides a cli tool which lets you use and create recipes: https://www.npmjs.com/package/slush

Check out some generators: https://www.npmjs.com/search?q=slush  (notice the query params)

[slush-pages](https://www.npmjs.com/package/slush-pages) is a generator that Mikey made.
Generators packages follow a naming convention `slush-xxx`, and when you're calling the generator you just use `xxx`.
Mikey a bit of a name-grab with his package, which makes his generator easy to remember:

```bash
npm install -g slush slush-pages
cd some_new_project_folder
slush pages 
```
