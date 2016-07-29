---
layout: lab
title: CI | CD Pipelines
subtitle: 
html_title: CI/CD
categories: [lab, developers, ops]
---

## Overview
In modern software projects many teams utilize the concept of continuous integration and continuous delivery (CI/CD).  By setting up a tool chain that continuously builds, tests, and stages software releases a team can ensure that their product can be reliably released at any time.  Open Shift can be an enabler in the creation and managecment of this tool chain.  In this lab we will walk through creating a simple example of a CI/CD [pipeline][1] utlizing Jenkins, all running on top of Open Shift!

### Start by installing Jenkins
First we will start by installing Jenkins to run in a pod within your workshop project.  Because this is just a workshop we use the ephemeral template to create our Jenkins sever (for a enterprise system you would probably want to use the persistent template).  Follow the steps below:

TBD...

### The OpenShift pipeline plugin
Now let's make sure we have the OpenShift Pipeline [plugin][2] properly installed within Jenkins.  It will be used to define our application lifecycle and to let our Jenkins jobs perform commands on our OpenShift cluster.

TBD...

You can read more about the plugin [here][3].


### Our sample web app and its automated tests
In this example pipeline we will be building, testing, and staging a Node.js webapp.  We wrote all the code for you already, so don't worry you won't be coding in this lab.  You will just use the code and unit tests to see how CI/CD pipelines work.  And keep in mind that these principles are relevant whether your programming in Node.js, Ruby on Rails, Java, PHP or any one of today's popular programming languages.

TBD fork the demo app in their github


### Setting up our OpenShift environment to match our lifecycle stages

TBD create Jenkins jobs (just copy a file?)
TBD setup Jekins jobs to use their github fork

TBD do we create OSE projects or just do in a single project due to users maybe not having project creation permissions?

TBD connect the pipeline for dev->test->prod


### Watch me release!
So now that you've done all that setup work, forget about it.  What?!  Yeah, all that configuration work only need to be done once.  Now that the pipeline is defined everything happens automatically on every git commit.  Let's see it in action:

TBD make a code change and commit it on an even minute boundary

TBD commit on an odd minute boundary


## Summary
Coming soon...  Read more about usage of [Jenkins on Open Shift here][4].  Read more about the concepts behind [pipelines in Jenkins here][1].


[1]: https://jenkins.io/doc/pipeline/
[2]: https://wiki.jenkins-ci.org/display/JENKINS/OpenShift+Pipeline+Plugin
[3]: https://github.com/openshift/jenkins-plugin/
[4]: https://docs.openshift.com/enterprise/latest/using_images/other_images/jenkins.html
[5]: https://en.wikipedia.org/wiki/Continuous_delivery
[6]: https://github.com/openshift/origin/blob/master/examples/jenkins/README.md

