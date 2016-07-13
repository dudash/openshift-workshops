---
layout: lab
title: Blue | Green Deployment
subtitle: 
html_title: Blue/Green
categories: [lab, ops, blue, green]
---

## Blue/Green deployments
When implementing continuous delivery for your software one very useful technique is called Blue/Green deployments.  It addresses the desire to minimize downtime during the switch from test to production.  Essentially, it involves running two production versions of your app and then switching the routing from the last stable version to the new version.  In this lab we will walk through a simple Blue/Green workflow with an simple web application.

For more information about Blue/Green deployments, check out this blog: http://martinfowler.com/bliki/BlueGreenDeployment.html

### Let's deploy an application
To demonstrate Blue/Green deployments, we'll use a simple application that renders a colored box as an example. Using your GitHub account, please fork the following project: https://github.com/VeerMuchandi/bluegreen

You should be comfortable deploying an app at this point, but here are the steps anyway:

> <i class="fa fa-terminal"></i> Goto the terminal and type these commands:

{% highlight csh %}
$ oc new-app --name=blue [your-project-repo-url]
$ oc expose service blue
{% endhighlight %}

Note that we exposed this application using a route named "blue". Navigate to your application and validate it deployed correctly.

### Release a new version of our app and test it in the same environment
What we'll do next is create a new version of the application called "green". The quickest way to make a change to the code is directly in the GitHub web interface. In GitHub, edit the image.php file in the root directory of your repo. Switch the commented out line to change the color of the rendered box (lines 9-10). Commit your changes.

Use the same commands to deploy this new version of the app, but this time name it "green".

> <i class="fa fa-terminal"></i> Goto the terminal and type these commands:

{% highlight csh %}
$ oc new-app --name=green [your-project-repo-url]
$ oc expose service green
{% endhighlight %}


### Switch from Blue to Green
Now that we are satisfied with our change we can do the Blue/Green switch.  With OpenShift services and routes, this is super simple.  Follow the steps below to make the switch:

Coming soon...

### Good work, let's clean this up
> <i class="fa fa-terminal"></i> Let's clean up all this to get ready for the next lab:

{% highlight csh %}
$ oc delete all -l subproject=dc-busses
{% endhighlight %}


## Summary
Coming soon...

If you want to read more about Blue/Green check out [this post][1] with a longer description as well as links to additional resources.

[1]: http://martinfowler.com/bliki/BlueGreenDeployment.html
