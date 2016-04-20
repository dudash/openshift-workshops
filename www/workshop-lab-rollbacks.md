---
layout: lab
title: Webhooks and Rollbacks
subtitle: 
html_title: Webhooks and Rollbacks
categories: [lab, developers, ops, rollback]
---

### Rolling Deployments, Webhooks, and Rollbacks - Oh My!
Once you have an app deployed in Open Shift you can take advantage of some continuous capabilities that help to enable DevOps and automate your management process.  We will cover two of those in this lab: webhooks and rollbacks.


### A bit of configuration
TBD fork dc-metro-map app


### Code Change / Webhook
When using S2I there are a few different things that can be used to trigger a rebuild of your source code.  The first is a configuration change, the second is a builder image change, and the last (which we are covering here) is a webhook.  A webhook is basically your source code repository telling Open Shift that the code  we care about has changed.  Let's set that up for our project now to see it in action.

TBD Steps


### Rolling Deployment
TBD code change in the webhooked code


### Rollbacks
Well, what if something isn't quite right with the latest version of our app?  Let's say some feature we thought was ready for the world really isn't - and we didn't figure that out until it hit production.  No problem, we can roll it back with the click of a button.  Let's check that out:

TBD steps


## Summary
Coming soon...