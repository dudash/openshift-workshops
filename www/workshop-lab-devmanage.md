---
layout: lab
title: Developing and Managing Your Application
subtitle: 
html_title: App Development
categories: [lab, developers]
---

## Developing and managing an application in Open Shift
In this lab we will explore some of the common activities undertaken by developers working in Open Shift.  You will become familiar with how to use environment variables, secrets, build configurations, and more.  Let's look at some of the basic things a developer might care about for a deployed app.

### Setup
From the previous lab you should have the DC Metro Maps web app running in Open Shift.  

**If you don't already have it running, you can quickly add it with the following steps.**

> <i class="fa fa-terminal"></i> Goto the terminal and type these commands:

{% highlight csh %}
$ oc new-app --name=dc-metro-map https://github.com/dudash/openshift-workshops.git --context-dir=dc-metro-map
$ oc expose service dc-metro-map
{% endhighlight %}


### See the app in action and inspect some details
There is no more ambiguity or confusion about where the app came from.  Open Shift provides traceability for your running deployment back to the docker image and the registry it came from, as well as (for images built by openshift) back to the exact source code branch and commit.  Let's take a look at that.

<div class="panel-group" id="accordionA" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingAOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionA" href="#collapseAOne" aria-expanded="true" aria-controls="collapseAOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseAOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingAOne">
      <div class="panel-body">

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
$ oc status
{% endhighlight %}

This is going to show the status of your current project.  In this case it will show the dc-metro-map service (svc) with a nested deployment config (dc) along with some more info that you can ignore for now.  

<br/><br/><i class="fa fa-info-circle"></i>  A deployment in OpenShift is a replication controller based on a user defined template called a deployment configuration <br/><br/>

The dc provides us details we care about to see where our application image comes from, so let's check it out in more detail.

<blockquote>
<i class="fa fa-terminal"></i> Type the following to find out more about our dc:
</blockquote>
{% highlight csh %}
$ oc describe dc/dc-metro-map
{% endhighlight %}

Notice under the template section it lists the containers it wants to deploy along with the path to the container image.

<br/><br/><i class="fa fa-info-circle"></i> There are a few other ways you could get to this information.  If are feeling adventurous, you might want to describe the replication controller (oc describe rc -l app=dc-metro-map), the image stream (oc describe is -l app=dc-metro-map) or the running pod itself (oc describe pod -l app=dc-metro-map).<br/><br/>

Because we built this app using S2I, we get to see the details about the build - including the container image that was used for building.  So let's find out where the image came from.  Here are the steps to get more information about the build configuration (bc) and the builds themselves.

<blockquote>
<i class="fa fa-terminal"></i> Type the following to find out more about our bc:
</blockquote>
{% highlight csh %}
$ oc describe bc/dc-metro-map
{% endhighlight %}

Notice the information about the configuration of how this app gets built.  In particular look at the github URL, the webhooks you can use to automatically trigger a new build, the docker image where the build runs inside of, and the builds that have been completed.  Let's look at one of those builds.

<blockquote>
<i class="fa fa-terminal"></i> Type the following:
</blockquote>
{% highlight csh %}
$ oc describe build/dc-metro-map-1
{% endhighlight %}

Now we can see even more about the deployed build's source code including exact commit GUID for this build.  We can also can see the commit's author, and the commit message.  You can inspect the code by opening a web browser and pointing it to: https://github.com/dudash/openshift-workshops/commit/[COMMIT_GUID]

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

<blockquote>
Click "Overview"
</blockquote>
Check out the details within the deployment (next to the Pods circle). Within the deployment for the dc-metro-map is a container summary that shows both the GUID for the image and the GUID for the git branch.
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-devman-containertracibility.png" width="500"/></p>

<blockquote>
Click on the link next to "Image:"
</blockquote>
Here are the details of the image stream for this deployment.
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-devman-dcmteroimagestream.png" width="500"/></p>

<i class="fa fa-info-circle"></i> If you hover over the shortened image GUID or edit the image stream you can see the full GUID.<br/><br/>

<blockquote>
Click "Overview" to get back to the deployment summary
</blockquote>

<blockquote>
Click "#1" to see the build details
</blockquote>
Because we built this app using S2I, we get to see the details about the build - including the container image that was used for building.  Note that you can kick-off a rebuild here if something went wrong with the initial build and you'd like to attempt it again.
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-devman-buildsummary.png" width="500"/></p>

<blockquote>
Click "Overview" to get back to the deployment summary again
</blockquote>
Notice that next to the build # you can see the comment from the last commit when the build was started.  And you can see the that commit's author.  You can click that commit GUID to be taken to the exact version of the source code that is in this deployed application.
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-devman-commitmsg.png" width="400"/></p>

      </div>
    </div>
  </div>
</div>


### Pod logs
In the S2I lab we looked at build logs for inspecting the process of turning source code into an image.  Now let's inspect the logs related to the running of those images within one or more pods.

<div class="panel-group" id="accordionB" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingBOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionB" href="#collapseBOne" aria-expanded="true" aria-controls="collapseBOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseBOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingBOne">
      <div class="panel-body">

TBD

      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingBTwo">
      <div class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordionB" href="#collapseBTwo" aria-expanded="false" aria-controls="collapseBTwo">
          Web Console Steps
        </a>
      </div>
    </div>
    <div id="collapseBTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingBTwo">
      <div class="panel-body">

TBD

      </div>
    </div>
  </div>
</div>


### How about we set some environment variables?
TBD - set these and show them set inside a container.

<div class="panel-group" id="accordionC" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingCOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionC" href="#collapseCOne" aria-expanded="true" aria-controls="collapseCOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseCOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingCOne">
      <div class="panel-body">

TBD

      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingCTwo">
      <div class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordionC" href="#collapseCTwo" aria-expanded="false" aria-controls="collapseCTwo">
          Web Console Steps
        </a>
      </div>
    </div>
    <div id="collapseCTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingCTwo">
      <div class="panel-body">

TBD

      </div>
    </div>
  </div>
</div>


### What about passwords and private API keys?
TBD - SECRETS
oc secrets new NAME
oc get secrets
oc get bc
oc edit bc/dc-metro-map -o yaml
More about secrets https://docs.openshift.com/enterprise/3.1/dev_guide/secrets.html


### Getting into a pod
We set some environment variables and secrets, let's jump onto our pod to inspect them.  TBD.




### Things will go wrong, and that's one reason why we have replication
Things will go wrong with your software, hardware, or from something out of your control.  But we plan for that failure and planning for it let's us minimize the impact.  Let's walk through a simple example of how the replication controller will keep your deployment at a desired state and the load balancer will route traffic to avoid dying pods.

TBD lab steps

Additionally, Open Shift will pay attention to the health of your application ...

 TBD lab steps

You can read more about application health in Open Shift [here][1].


### Metrics
TBD

## Summary
In this lab you've ... TBD


[1]: https://docs.openshift.com/enterprise/latest/dev_guide/application_health.html
[2]: https://docs.openshift.com/enterprise/latest/dev_guide/deployments.html