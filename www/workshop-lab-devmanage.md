---
layout: lab
title: Developing and Managing Your Application
subtitle: 
html_title: App Development
categories: [lab, developers]
---

## Developing and Managing an Application in Open Shift
In this lab we will explore some of the common activities undertaken by developers working in Open Shift.  You will become familiar with how to use environment variables, secrets, build configurations, and more.

### See the app in action and inspect some details
From the previous lab you should have the DC Metro Maps web app running in Open Shift.  If you don't already have it running, you can quickly add it with the following steps.

> <i class="fa fa-terminal"></i> Goto the terminal and type these commands:

{% highlight csh %}
$ oc new-app --name=dc-metro-map https://github.com/dudash/openshift-workshops.git --context-dir=dc-metro-map
$ oc expose service dc-metro-map
{% endhighlight %}


Let's look at some of the basic details a developer might care about for this deployed app.

TBD.

### Hook up to a database
TBD

### Env Variables
TBD - set these and show them set inside a container.

### Secrets
TBD

## Summary
In this lab you've 
