  ---
layout: lab
title: Developing and Managing Your Application
subtitle: This will come in handy
html_title: App Development
categories: [lab, developers]
---

## Developing and managing an application in Open Shift
In this lab we will explore some of the common activities undertaken by developers working in Open Shift.  You will become familiar with how to use environment variables, secrets, build configurations, and more.  Let's look at some of the basic things a developer might care about for a deployed app.

### Setup
From the previous lab you should have the DC Metro Maps web app running in Open Shift.  

<i class="fa fa-warning"></i> **Only if you don't already have it running already, add it with the following steps.**

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

<br/><br/><i class="fa fa-info-circle"></i> There are a few other ways you could get to this information.  If you are feeling adventurous, you might want to describe the replication controller (oc describe rc -l app=dc-metro-map), the image stream (oc describe is -l app=dc-metro-map) or the running pod itself (oc describe pod -l app=dc-metro-map).<br/><br/>

Because we built this app using S2I, we get to see the details about the build - including the container image that was used for building the source code.  So let's find out where the image came from.  Here are the steps to get more information about the build configuration (bc) and the builds themselves.

<blockquote>
<i class="fa fa-terminal"></i> Type the following to find out more about our bc:
</blockquote>
{% highlight csh %}
$ oc describe bc/dc-metro-map
{% endhighlight %}

Notice the information about the configuration of how this app gets built.  In particular look at the github URL, the webhooks you can use to automatically trigger a new build, the docker image where the build runs inside of, and the builds that have been completed.  New let's look at one of those builds.

<blockquote>
<i class="fa fa-terminal"></i> Type the following:
</blockquote>
{% highlight csh %}
$ oc describe build/dc-metro-map-1
{% endhighlight %}

This shows us even more about the deployed container's build and source code including exact commit GUID for this build.  We can also can see the commit's author, and the commit message.  You can inspect the code by opening a web browser and pointing it to: https://github.com/dudash/openshift-workshops/commit/[COMMIT_GUID]

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
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-containertracibility.png" width="500"/></p>

<blockquote>
Click on the link next to "Image:"
</blockquote>
Here are the details of the image stream for this deployment.
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-dcmteroimagestream.png" width="500"/></p>

<i class="fa fa-info-circle"></i> If you hover over the shortened image GUID or edit the image stream you can see the full GUID.<br/><br/>

<blockquote>
Click "Overview" to get back to the deployment summary
</blockquote>

<blockquote>
Click "#1" to see the build details
</blockquote>
Because we built this app using S2I, we get to see the details about the build - including the container image that was used for building the source code.  Note that you can kick-off a rebuild here if something went wrong with the initial build and you'd like to attempt it again.
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-buildsummary.png" width="500"/></p>

<blockquote>
Click "Overview" to get back to the deployment summary again
</blockquote>
Notice that next to the build # you can see the comment from the last commit when the build was started.  And you can see the that commit's author.  You can click that commit GUID to be taken to the exact version of the source code that is in this deployed application.
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-commitmsg.png" width="400"/></p>

      </div>
    </div>
  </div>
</div>


### Pod logs
In the S2I lab we looked at a build log to inspect the process of turning source code into an image.  Now let's inspect the log for a running pod - in particular let's see the web application's logs.

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

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
$ oc get pods
{% endhighlight %}

This is going to show basic details for all pods in this project (including the builders).  Let's look at the log for the pod running our application.  Find the pod that is "Running" you will use it below.

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following (replacing the POD ID with your pod's ID):
</blockquote>
{% highlight csh %}
$ oc logs [POD NAME]
{% endhighlight %}

You will see in the output details of your app starting up and any status messages it has reported since it started.

<br/><br/><i class="fa fa-info-circle"></i> You can see more details about the pod itself with 'oc describe [POD NAME]'

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

<blockquote>
Hover over "Browse" and then click on "Pods"
</blockquote>
This is going to show basic details for all pods in this project (including the builders).
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-allpods.png" width="500"/></p>
Next let's look at the log for the pod running our application.

<blockquote>
Click the pod that starts with "dc-metro-map-" and has a status of Running
</blockquote>
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-poddetails.png" width="500"/></p>
Here you see the status details of your pod as well as its configuration

<blockquote>
Click the "Logs" button
</blockquote>
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-podslogs.png" width="500"/></p>
Now you can see in the output window the details of your app starting up and any status messages it has reported since it started.

      </div>
    </div>
  </div>
</div>


### How about we set some environment variables?
Whether it's a database name or a configuration variable, most applications make use of environment variables.  It's best not to bake these into your containers because they do change and you don't want to rebuild an image just to change an environment variable.  Good news!  You don't have to.  Open Shift let's you specify environment variables in your deployment configuration and they get passed along through the pod to the container.  Let's try doing that.

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

Let's have a little fun.  The app has some easter eggs that get triggered when certain env vars are set to 'true'.
<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
$ oc env dc/dc-metro-map -e BEERME=true
{% endhighlight %}

{% highlight csh %}
$ oc get pods -w
{% endhighlight %}

Due to the deployment config strategy being set to "Rolling" and the "ConfigChange" trigger being set, Open Shift auto deployed a new pod as soon as you updated with the env variable.  If you were quick enough you saw this happening with the get pods command

<blockquote>
<i class="fa fa-terminal"></i> Type Ctrl+C to stop watching the pods
</blockquote>

<i class="fa fa-info-circle"></i> You can set env variables across all deployment configs with 'dc --all' instead of specifying a specifc config

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

<blockquote>
Hover over "Browse" and then click on "Deployments"
</blockquote>
This is going to show basic details for all deployment configurations in this project

<blockquote>
Click the "dc-metro-map" deployment config
</blockquote>
There are a lot of details here, feel free to check them out and ask questions, but we are here to set some new environment variables.  

<blockquote>
Click the vertically stacked "..." button in the top right to edit this config (next to the deploy button).
</blockquote>
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-deployconfigdetails.png" width="500"/></p>
This opens up an edit window with the yaml data for this deployment config.  Scroll down to the section spec->template->spec->containers and:

<blockquote>
Add an env section to look like the following:
</blockquote>
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-deployconfigsetenv.png" width="500"/></p>

<blockquote>
Click "Save".  And go back to the summary view by clicking "Overview" on the left menu bar
</blockquote>
If you are quick enough you will see a new pod spin up and an the old pod spin down.  This is due to the deployment config strategy being set to "Rolling" and having a "ConfigChange" trigger, Open Shift auto deployed a new pod as soon as you updated with the env variable.
      </div>
    </div>
  </div>
</div>

With the new environment variables set the app should look like this in your web browser (with beers instead of busses):

<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-beerme.png" width="500"/></p>


### What about passwords and private keys?
Environment variables are great, but sometimes we don't want sensitive data exposed in the environment.  We will get into using **secrets** later when you do the lab: [Keep it Secret, Keep it Safe][2]


### Getting into a pod
There are situations when you might want to jump into a running pod, and Open Shift lets you do that pretty easily.  We set some environment variables and secrets in this lab, let's jump onto our pod to inspect them.  

<div class="panel-group" id="accordionD" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingDOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionD" href="#collapseDOne" aria-expanded="true" aria-controls="collapseDOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseDOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingDOne">
      <div class="panel-body">

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
$ oc get pods
{% endhighlight %}

Find the pod name for your Running pod

{% highlight csh %}
$ oc exec -it [POD NAME] /bin/bash
{% endhighlight %}
 
You are now interactively attached to the container in your pod.  Let's look for the environment variables we set:

{% highlight csh %}
$ env | grep BEER
{% endhighlight %}

That should return the **BEERME=true** matching the value that we set in the deployment config.

{% highlight csh %}
$ exit
{% endhighlight %}

      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingDTwo">
      <div class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordionD" href="#collapseDTwo" aria-expanded="false" aria-controls="collapseDTwo">
          Web Console Steps
        </a>
      </div>
    </div>
    <div id="collapseDTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingDTwo">
      <div class="panel-body">

<blockquote>
Hover over "Browse" and then click on "Pods"
</blockquote>

<blockquote>
Click the pod that starts with "dc-metro-map-" and has a status of Running
</blockquote>

<blockquote>
Click the "Terminal" button
</blockquote>

<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-podterminal.png" width="500"/></p>
Let's look for the environment variables we set:

<blockquote>
Inside the web page's terminal type: 'env | grep BEER'
</blockquote>
That should return the **BEERME=true** matching the value that we set in the deployment config.

      </div>
    </div>
  </div>
</div>

### Good work, let's clean this up
> <i class="fa fa-terminal"></i> Let's clean up all this to get ready for the next lab:

{% highlight csh %}
$ oc delete all -l app=dc-metro-map
{% endhighlight %}
  
## Summary
In this lab you've seen how to trace running software back to its roots, how to see details on the pods running your software, how to update deployment configurations, how to inspect logs files, how to set environment variables consistently across your environment, and how to interactively attach to running containers.  All these things should come in handy for any developer working in an Open Shift platform.

To dig deeper in to details behind the steps you performed in this lab, check out the OSE [developer's guide][1].

[1]: https://docs.openshift.com/enterprise/3.1/dev_guide/index.html
[2]: ./workshop-lab-secrets.html

