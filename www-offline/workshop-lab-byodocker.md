---
layout: lab
title: BYO Docker
subtitle: Deploy an existing docker image
html_title: BYO Dockerfile
categories: [lab, developers, docker]
---

## Bring your own Docker
It's easy to get started with OpenShift whether that be using our app templates or bringing your existing Docker assets.  In this quick lab we will deploy app using an exisiting Docker image.  OpenShift will create an image stream for the image as well as deploy and manage containers based on that image.  And we will dig into the details to show how all that works.

### Let's point OpenShift to an existing built docker image
> <i class="fa fa-terminal"></i> Goto the terminal and type the following:

{% highlight csh %}
$ oc new-app kubernetes/guestbook
{% endhighlight %}


The output should show something *similar* to below:

{% highlight csh %}
--> Found Docker image a49fe18 (17 months old) from Docker Hub for "kubernetes/guestbook"
    * An image stream will be created as "guestbook:latest" that will track this image
    * This image will be deployed in deployment config "guestbook"
    * Port 3000/tcp will be load balanced by service "guestbook"
--> Creating resources with label app=guestbook ...
    ImageStream "guestbook" created
    DeploymentConfig "guestbook" created
    Service "guestbook" created
--> Success
    Run 'oc status' to view your app.
{% endhighlight %}


### We can browse our project details with the command line
> <i class="fa fa-terminal"></i> Try typing the following to see what is available to 'get':

{% highlight csh %}
$ oc get
{% endhighlight %}

> <i class="fa fa-terminal"></i> Now let's look at what our image stream has in it

{% highlight csh %}
$ oc get is
{% endhighlight %}
{% highlight csh %}
$ oc describe is/guestbook
{% endhighlight %}

<i class="fa fa-info-circle"></i> An image stream can be used to automatically perform an action, such as updating a deployment, when a new image, such as a new version of the guestbook image, is created.

> <i class="fa fa-terminal"></i> The app is running in a pod, let's look at that

{% highlight csh %}
$ oc describe pods
{% endhighlight %}

### We can see those details using the web console too
Let's look at the image stream.  Hover over "Browse", then click "Image Streams", and then click on the guestbook image stream.  You should see something similar to this:

<img src="{{ site.baseurl }}/www/screenshots/ose-guestbook-is.png" width="600"/><br/>


### Does this guestbook do anything?
Good catch, your service is running but there is no way for users to access it yet.  We can fix that with the web console or the command line, you decide which you'd rather do from the steps below.

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Web Console Steps
        </a>
      </div>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">

<blockquote>
To expose via the web console, click on "Overview" to get to this view:
</blockquote>
<img src="{{ site.baseurl }}/www/screenshots/ose-guestbook-noroute.png" width="600"/><br/>

<p>Notice there is no exposed route </p>

<blockquote>
Click on the "Create Route" link
</blockquote>

<img src="{{ site.baseurl }}/www/screenshots/ose-guestbook-createroute.png" width="600"/><br/>

<p>This is where you could specify route parameters, but we will just use the defaults.</p>

<blockquote>
Click "Create"
</blockquote>

      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <div class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Alternatively: CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">

<blockquote>
<i class="fa fa-terminal"></i> In the command line type this:
</blockquote>

{% highlight csh %}
$ oc expose service guestbook
{% endhighlight %}

      </div>
    </div>
  </div>
</div>

<i class="fa fa-info-circle"></i> You can also create secured HTTPS routes, but that's an advanced topic for a later lab

### Test out the guestbook webapp
Notice that in the web console overview, you now have a URL in the service box.  There is no database setup, but you can see the webapp running by clicking the route you just exposed.

> Click the link in the service box


You should see:
<img src="{{ site.baseurl }}/www/screenshots/ose-guestbook-app.png" width="600"/><br/>


### Good work, let's clean this up
> <i class="fa fa-terminal"></i> Let's clean up all this to get ready for the next lab:

{% highlight csh %}
$ oc delete all --all
{% endhighlight %}


## Summary
In this lab you've deployed an example docker image, pulled from docker hub, into a pod running in Open Shift.  You exposed a route for clients to access that service via thier web browsers.  And you learned how to get and describe resources using the command line and the web console.  Hopefully, this basic lab also helped to get you familiar with using the CLI and navigating within the web console.
