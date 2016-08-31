Agile is a methodology for software development whose aims include responsiveness, flexibility, and early/continuous delivery of products.


### Why?

Agile's origins date back to the 1970s. People started becoming frustrated with the traditional 'waterfall' model of development:

![](https://raw.githubusercontent.com/dev-academy-programme/concepts/master/agile/waterfall.png)

Another way of describing this model is to think of it as a production line:

 - first we plan, 
 - then design,
 - then implement,
 - then test,
 - then enter a maintenance phase.

Trouble is, often what the finished product actually needs to be can't be determined perfectly during the requirements/planning phase. 

![](https://raw.githubusercontent.com/dev-academy-programme/concepts/master/agile/tree-swing.jpg)

> At the end of a project, a team might have built the software it was asked to build, but, in the time it took to create, business realities have changed so dramatically that the product is irrelevant. In that scenario, a company has spent time and money to create software that no one wants. Couldn’t it have been possible to ensure the end product would still be relevant before it was actually finished? ~ [agilemethodology.org](https://agilemethodology.org)


### Scrum

Scrum is the most common/popular approach to Agile development. You can read more about it <a href="https://en.wikipedia.org/wiki/Scrum_(software_development)">on Wikipedia</a>. Some people use the terms interchangeably, but strictly speaking Scrum is _a kind_ of Agile. Another way to describe it: Scrum is a _framework_ for Agile development. It gives specific guidance on roles (Product Owner, Scrum Master) and the process or order of events. Most of the following content is related to "Scrum-flavoured Agile".


### Team composition

Traditional teams are often siloed: all the management/architects together, all the designers together, all the developers together, all the testers together. Agile development encourages teams to be _cross-functional_: made up of people from many different disciplines. Scrum encourages self-organising teams.


### Iteration

In Agile, we try to incorporate a little of each phase of development (requirements, design, develop, etc) into short cycles, often called _sprints_. The idea is to have code that could potentially be _shipped_ (deployed, published) at the end of each sprint. Two week sprints are common.

![](https://raw.githubusercontent.com/dev-academy-programme/concepts/master/agile/agile.png)
[Source](https://commons.wikimedia.org/wiki/File:Agile_Project_Management_by_Planbox.png)


### The backlog

A backlog is a list of tasks that together make up an application: if you completed all of them, you'd have a great product! Some are product features, but not all: documentation and bug fixes are also entered on the backlog. Items on the backlog may be further classified with labels: is it a feature or a bug? Is it considered part of the Minimum Viable Product? Is it frontend or backend, or both?

The backlog is likely to feature _user stories_, and may break each story into multiple tasks to be completed.


### Sprint planning

At the start of each sprint, a [meeting](http://www.leadingagile.com/2012/08/simple-cheat-sheet-to-sprint-planning-meeting/) is held to set the scope of the sprint, deciding which tasks will be completed by the end of it.


### Stand-up

Held daily, the stand-up (or "scrum") should be carefully timeboxed and starts even with missing team members. Everybody should report:

 - what I did yesterday
 - what I will do today
 - any blocks

This isn't the time for long discussions! Standups are for quick summaries. For most teams they shouldn't take longer than 15 minutes. A scrum master or similar role will keep track of blocks that might affect the ability of the team to deliver on time, and who on the team is assigned to resolve the block.


### Sprint review

Review the work that was completed, and what was not completed. Demo the working code. Don't demo what was not completed!


### Sprint retrospective

What went well? What could we do differently or better next time?

This is a great chance to learn from the previous weeks. It should not be used as an opportunity to cast _blame_, however. Instead, identify _systemic_ problems. How could our team improve to overcome the difficulties we experienced?


### Resources

 - http://agilemethodology.org/
 - http://scrumreferencecard.com/
 - http://www.leadingagile.com/2012/08/simple-cheat-sheet-to-sprint-planning-meeting/
