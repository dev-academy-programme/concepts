CI is a dev pattern that recommends continuously merging (inegrating) work as you go.
Adding small pieces often, and running tests as you go means you know early when there are problems, and can adapt code.
The inverse would be to build a monolithic feature, then try to merge it in an hope for the best.

There are many services that support CI, and do fancy things like auto-run all your tests every time you open a pull request.

examples :
  - Travis CI
  - Jenkins