---
layout: lab
title: Blue | Green Deployment
subtitle: 
html_title: Blue/Green
categories: [lab, ops, blue, green]
---

## Blue/Green deployments
When implementing continuous delivery for your software one very useful technique is called Blue/Green deployments.  It addresses the desire to minimize downtime during the release of a new version of an application to production.  Essentially, it involves running two production versions of your app side-by-side and then switching the routing from the last stable version to the new version once it is verified.  Using OpenShift, this can be very seamless because using containers we can easily and rapidly deploy a duplicate infrastructure to support alternate versions and modify routes as a service.  In this lab, we will walk through a simple Blue/Green workflow with an simple web application on OpenShift.

### Let's deploy an application
To demonstrate Blue/Green deployments, we'll use a simple application that renders a colored box as an example. Using your GitHub account, please fork the following [project][1].

You should be comfortable deploying an app at this point, but here are the steps anyway:

> <i class="fa fa-terminal"></i> Goto the terminal and type these commands:

{% highlight csh %}
$ oc new-app --name=blue [your-project-repo-url]
$ oc expose service blue
{% endhighlight %}

Note that we exposed this application using a route named "blue". Navigate to your application and validate it deployed correctly.

### Release a new version of our app and test it in the same environment
What we'll do next is create a new version of the application called "green". The quickest way to make a change to the code is directly in the GitHub web interface. In GitHub, edit the image.php file in the root directory of your repo. Switch the commented out line to change the color of the rendered box (lines 9-10). Commit your changes.

Use the same commands to deploy this new version of the app, but this time name it "green". No need to expose a new route -- we'll instead switch the "blue" route to point to the "green" service once we've verified it.

> <i class="fa fa-terminal"></i> Goto the terminal and type these commands:

{% highlight csh %}
$ oc new-app --name=green [your-project-repo-url]
{% endhighlight %}


### Switch from Blue to Green
Now that we are satisfied with our change we can do the Blue/Green switch.  With OpenShift services and routes, this is super simple.  Follow the steps below to make the switch:

<div class="panel-group" id="accordionA" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingAOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionA" href="#collapseAOne" aria-expanded="true" aria-controls="collapseAOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseAOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingAOne">
      <div class="panel-body">
      
<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
$ oc TBD...
{% endhighlight %}

      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingATwo">
      <div class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordionA" href="#collapseATwo" aria-expanded="false" aria-controls="collapseATwo">
          Web Console Steps
        </a>
      </div>
    </div>
    <div id="collapseATwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingATwo">
      <div class="panel-body">
      
      </div>
    </div>
  </div>
</div>

### Good work, let's clean this up
> <i class="fa fa-terminal"></i> Let's clean up all this to get ready for the next lab:

{% highlight csh %}
$ oc delete all -l subproject=dc-busses
{% endhighlight %}


## Summary
Coming soon...

If you want to read more about Blue/Green check out [this post][2] with a longer description as well as links to additional resources.

[1]: https://github.com/VeerMuchandi/bluegreen
[2]: http://martinfowler.com/bliki/BlueGreenDeployment.html
