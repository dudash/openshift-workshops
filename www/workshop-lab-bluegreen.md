---
layout: lab
title: Blue | Green Deployment
subtitle: 
html_title: Blue/Green
categories: [lab, ops, blue, green]
---

## Blue/Green deployments
When implementing continuous delivery for your software one very useful technique is called Blue/Green deployments.  It addresses the desire to minimize downtime during the switch from test to production.  Essentially, it involves running two production versions of your app and then switching the routing from the last stable version to the new version.  In this lab we will walk through a simple Blue/Green workflow with an simple web application.

### Let's deploy an application
You should be comfortable deploying an app at this point, but here are the steps anyway:

TBD

<i class="fa fa-info-circle"></i> Labels can be used to group resources so that you can reference them all together in CLI commands like 'oc delete'


### Release a new version of our app and test it in the same environment


### Switch from Blue to Green
Now that we are satisfied with our change we can do the "Blue / Green" switch.  With Open Shift services and routes, this is super simple.  Follow the steps below to make the switch:

TBD

### Good work, let's clean this up
> <i class="fa fa-terminal"></i> Let's clean up all this to get ready for the next lab:

{% highlight csh %}
$ oc delete all -l subproject=dc-busses
{% endhighlight %}


## Summary
In this lab... TBD

If you want to read more about Blue/Green check out [this post][1] with a longer description as well as links to additional resources.

[1]: http://martinfowler.com/bliki/BlueGreenDeployment.html
