---
layout: lab
title: BYO Docker
subtitle: Deploy an existing docker image
html_title: BYO Dockerfile
category: lab, docker
---

## Bring your own Docker
It's easy to get started with OpenShift whether that be using our app templates or bringing your existing Docker assets.  In this quick lab we will deploy app using an exisiting Docker image.  OpenShift will create an image stream for the image as well as deploy and manage containers based on that image.  And we will dig into the details to show how all that works.

### Let's point OpenShift to an existing built docker image
> <i class="fa fa-terminal"></i> Goto the terminal and type the following:

{% highlight csh %}
$ oc new-app hello-world
{% endhighlight %}

{% highlight csh %}
The output will show:
	--> Found Docker image 8be990e (5 months old) from Docker Hub for "hello-world"
    	- An image stream will be created as "hello-world:latest" that will track this image
    	- This image will be deployed in deployment config "hello-world"
    	- The image does not expose any ports - if you want to load balance or send traffic to this component
	      you will need to create a service with 'expose dc/hello-world --port=[port]' later
	--> Creating resources with label app=hello-world ...
	    ImageStream "hello-world" created
	    DeploymentConfig "hello-world" created
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

### Clean up
> <i class="fa fa-terminal"></i> Let's clean up all this to get ready for the next lab:

{% highlight csh %}
$ oc delete all --all
{% endhighlight %}
