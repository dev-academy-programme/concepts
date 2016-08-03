# Cucumber Tests

Cucumber is a flavour of integration tests that aim to improve collaboration between technical and non-technical people in developing software. 

The significant features of cucumber testing are:
  * tests are human readable - people without technical understanding can participate directly in reading and writing tests
  * tests are written in [Gherkin syntax](https://cucumber.io/docs/reference) which:
  * clarifies what the software should do from a user's perspective, and
  * follows a familiar pattern analogous to that of unit testing:  Given (arrange), When (act) Then (assert), and 
  * can be linked directly to the the team and client's broader intentions for the software such as User Stories or [Jobs-to-be-done](https://blog.intercom.io/using-job-stories-design-features-ui-ux/) - this provides 


A Behaviour Driven Development cycle that uses Cucumber might follow the following steps:


## 1. Intention clarification (user stories / jobs to be done)

At this stage the client and software team clarify the problems that the user faces and how the software assists them. 

For example, for a weather app we may define a User Story as the following:

```yml
As a User,
I want to view the likelihood of rain for my GPS coordinates
So that, when I go outside I know whether or not I need to take my jacket

```

We could re-write the same intention as a Job Story like so:

```yml
When I am planning my lunch date, 
I want to check the likelihood of rain, 
So I know whether or not to take my jacket
```

Most people use user stories, but either is fine. 

## 2. Gherkin feature specification

Once we have clarified the intentions we can begin "speccing out" how users will flow through the app and how particular software features will meet the user's needs. 

Gherkin syntax follows the [Given, When, Then](https://github.com/cucumber/cucumber/wiki/Given-When-Then) steps. Given will put the app into a particular state (on a particular page, signed-in, signed-out etc). When refers to actions the user takes (clicking a button etc). Then refers to the expected outcomes (updated information, notifications etc).

We often do this in conjunction with generating mockups or a clickable UI prototype using [Invision](https://www.invisionapp.com/), [Atomic](https://atomic.io/), [UXPin](https://www.uxpin.com/) or similar. 

For example, taking the Job Story above we might spec out the feature as follows:

```yml
# /features/rain-likelihood.feature
Feature: Rain likelihood for location

  # Job Story
  When I am planning my lunch date, 
  I want to check the likelihood of rain, 
  So I know whether or not to take my jacket

  Scenario: Request rain likelihood
    Given I am signed in
      And I view the main page
      And my Longitude and Latitude are [-42.2865, 174.7762] #Wellington
      And the time is "09.00"
    When I click "Will it rain?"
    Then I can see the text "It is likely to rain at your location in the next hour"
```

We can see from this example how the 

First, the Job Story that the feature targets is written directly into the specification. This helps the team and the client understand how the software achieves the broad goals more specifically. Or at least our assumptions about these.

Second, gherkin syntax is very specific. Does the user need to be signed in? Does the user need to click a button to request forecasts (maybe these should just be displayed by default). Clarifying these states and actions at this stage is much cheaper than re-building features later. 

Third, we see that the feature spec contains some very specific information:
 * the longitude and latitude
 * the time 
 * the text displayed on the button, "Will it rain?"
 * the resulting forecast text, "It is likely to rain at your location in the next hour".

This can help the client and team understand what we need for the feature to work, and the specific content of the page. This feature will likely make use of a weather API which will need the user's location. If we don't have this information currently we'll have to find some way to get it first. 

Sometimes clients leave page content up to the software team and then want it changed later when it doesn't meet their understanding. Also note that the likelihood is expressed in human readable terms "likely to rain". The software team know that the response from a weather API is alomost certainly going to be in percentage terms and transforming this into "likely" or "unlikely" will take additional code.

In the later steps we will write code to automate a browser that interacts with our software in the specific way detailed in the specification.

## App scaffolding

The team can begin scaffolding the app, setting up the directory, the testing, build and deployment script etc. We'll need a basic server for our automated browser to interact with.  

## Cucumber automation

At the moment we have some text in a `/features/rain-likelihood.feature` file and you might be wondering how we will program a browser to run the test. This is the magic of cucumber which interfaces betwen readable gherkin specs into less read browser automation code. We still need to write the latter though.

```js
#/features/step_definitions/steps.js

const assert = require('cucumber-assert')
const user = { name: 'Frodo', password: 'the0n3r1ng' }


module.exports = function () {
  
  this.Given('I am signed in', () => {
    browser.url('localhost:3000/login')
    browser.setValue('input#username', user.name)
    browser.setValue('input#password', user.password)
    browser.click('button#login')
  })

  this.Given('I view the main page', () => {
    browser.url('localhost:3000/')
  })

}
```


## Development

## Passing integration tests

## Acceptance tests







