TDD is a very popular and important programming practice. The idea is that you write a test for a feature/function/line of code _before you've actually written it_. By testing the outcome before you've written it, you plan more effectively exactly what that code needs to do.

The goal is to write less code of higher quality, which is always great!

*So how do we go about this madness?*

>  RED // GREEN // REFACTOR

First, we should name our expectations in the form of a test:

```js
t.equal(addTwo(2), 4)
```

Here, I am asserting that when I pass `2` to the `addTwo` function, I expect the result to be `4`. This will of course fail (*red*), as I have yet to create this function.

So, I create my function!

```js
function addTwo (number) {
  return 4
}

t.equal(addTwo(2), 4)
```

Now, my test will pass, turning it *green* (yay!). But if we take a wee look at this code, it's probably not going to work that well for values other than `2`, but let's write another test to be sure. 

```js
t.equal(addTwo(4), 6)
```

Naturally this test will fail (*red*) because the `4` returned from `addTwo` does not equal the `6` we expected. So, let's get this test passing.

```js
function addTwo (number) {
  if (number === 2) {
    return 4
  }
  
  if (number === 4) {
    return 6
  }
}
  
t.equal(addTwo(2), 4)
t.equal(addTwo(4), 6)
```

Now our tests are passing again (*green*), but looking at `addTwo` we can see this approach is getting unwieldy and isn't going to sustain us. That's a good indicator we should *refactor*. Refactoring is the process of improving the quality of the code without changing it's behaviour.

```js
function addTwo (number) {
  return number + 2
}
```

We should always run the tests again after we've refactored to be sure we haven't accidentally broken something.

```js
t.equal(addTwo(2), 4)
t.equal(addTwo(4), 6)
```

Passing, woohoo! Now we're ready to add another feature/expection in the form of another test that will initially fail (*red*), until we make it pass (*green*), all the while keeping our code quality high by *refactoring*. This is an extremely valuable practice that requires rigor and discipline, but pays huge rewards. Of course this was a trivial example, but the practice of TDD using red/green/refactor works in almost all scenarios.

Why is test driven development so important?

- Makes us explicitly name our expectations
- Allows us to manage complexity in small chunks
- Supports refactoring with confidence
- Alerts us if we break something by mistake in the future

