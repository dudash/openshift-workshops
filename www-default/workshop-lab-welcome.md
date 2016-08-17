---
layout: lab
title: A Guided Tour of OpenShift Enterprise
subtitle: Welcome to OpenShift
html_title: Welcome to OpenShift
categories: [lab, intro, welcome, developers, ops]
---

## Welcome to Open Shift!
This lab provides a quick tour of the console to help you get familiar with the user interface along with some key terminology we will use in subsequent lab content.  If you are already familiar with the basics of OpenShift you can skip this lab - after making sure you can login.

## Key Terms
We will be using the following terms throughout the workshop labs so here are some basic definitions you should be familiar with.  And you'll learn more terms along the way, but these are the basics to get you started.

* Container - Your software wrapped in a complete filesystem containing everything it needs to run
* Image - We are talking about docker images; read-only and used to create containers
* Pod - One or more docker containers that run together
* Service - Provides a common DNS name to access a pod (or replicated set of pods)
* Project - A project is a group of services that are related logically
* Deployment - an update to your application triggered by a image change or config change
* Build - The process of turning your source code into a runnable image
* BuildConfig - configuration data that determines how to manage your build
* Route - a labeled and DNS mapped network path to a service from outside OpenShift
* Master - The foreman of the OpenShift architecture, the master schedules operations, watches for problems, and orchestrates everything
* Node - Where the compute happens, your software is run on nodes

## Accessing OpenShift
OpenShift provides a web console that allow you to perform various tasks via a web browser.  Additionally, you can utilize a command line tool to perfrom tasks.  Let's get started by logging into both of these and checking the status of the platform.

### Let's Login
> Navigate to the URI provided by your instructor and login with the user/password provided (if there's an icon on the Desktop, just double click that)

<img src="{{ site.baseurl }}/www-default/screenshots/ose-login.png" width="600"/><br/>
*Login Webpage*

Once logged in you should see your available projects - or a button to create a project if none exist already.

### So this is what an empty project looks like
First let's create a new project to do our workshop work in.  We will use the student number you were given to ensure you don't clash with classmates, so in the steps below replace 'YOUR#' with your student number.

> Click on the "New Project" button and give it a name of demo-YOUR#

> Populate "Display Name" and "Description" boxes with whatever you like.  And click "Create"

This is going to take you to the next logical step of adding something to the project, but we don't want to do that just yet.

> Click the "demo-#" link on the top left to goto your project

Don't worry, it's supposed to look empty right now because you currently don't have anything in your project (we'll fix that in the next lab).

### Let's try the command line
> <i class="fa fa-terminal"></i> Open a terminal and login using the same URI/user/password with following command:

{% highlight csh %}
$ oc login [URI]
{% endhighlight %}

> <i class="fa fa-terminal"></i> Check to see what projects you have access to:

{% highlight csh %}
$ oc get projects
{% endhighlight %}

### It looks empty via the command line too
You just created a project using the web console, let's tell the terminal command line tool to use it.

> <i class="fa fa-terminal"></i> Type the following command to use the demo project

{% highlight csh %}
$ oc project demo-YOUR#
{% endhighlight %}

> <i class="fa fa-terminal"></i> Type the following command to show services, deployment configs, build configurations, and active deployments (this will come in handy later):

{% highlight csh %}
$ oc status
{% endhighlight %}

## Summary
You should now be ready to get hands-on with our workshop labs.


