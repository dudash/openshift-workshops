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
        $ oc new-app --template=jenkins-ephemeral
        $ oc expose svc jenkins
        $ oc policy add-role-to-user edit -z default
        {% endhighlight %}

        <blockquote>Copy hostname and paste in browser's address bar...</blockquote>

        {% highlight csh %}
        $ oc get routes | grep 'jenkins' | awk '{print $2}'
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
        <blockquote>Go into Jenkins project</blockquote>

        <blockquote>Click "Add to Project", select jenkins-ephemeral, click "Create". Accept all defaults.</blockquote>
        <p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-jenkins-ephemeral.png" width="500"/></p>
  
        <blockquote>Click "continue to overview", wait for it to start</blockquote>
        <p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-jenkins-start.png" width="500"/></p>
  
        <blockquote>Click the service link to open jenkins, login as admin/password</blockquote>
        <p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-jenkins-login.png" width="500"/></p>
      </div>
    </div>
  </div>
</div>



  


### The OpenShift pipeline plugin
Now let's make sure we have the OpenShift Pipeline [plugin][2] properly installed within Jenkins.  It will be used to define our application lifecycle and to let our Jenkins jobs perform commands on our OpenShift cluster.
<div class="panel-group" id="accordionB" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingBOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionB" href="#collapseBOne" aria-expanded="true" aria-controls="collapseBOne">
          Install OSE Plugin Steps
        </a>
      </div>
    </div>
    <div id="collapseBOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingBOne">
      <div class="panel-body">
  <blockquote>Click "Manage Jenkins"</blockquote>
  <p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-manage-jenkins.png" width="100" height="100"/></p>
  
  <blockquote>Click on "Manage Plugins"</blockquote> 
  <p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-manage-plugins.png" width="500" /></p>
  
  <blockquote>Click on "Available" tab, and filter on "openshift". Find and install "Openshift Pipeline Jenkins Plugin"</blockquote>
  <p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-jenkins-plugin.png" width="700" /></p>
      </div>
    </div>
  </div>
</div>

You can read more about the plugin [here][3].


### Our sample web app and its automated tests
In this example pipeline we will be building, testing, and staging a Node.js webapp.  We wrote all the code for you already, so don't worry you won't be coding in this lab.  You will just use the code and unit tests to see how CI/CD pipelines work.  And keep in mind that these principles are relevant whether your programming in Node.js, Ruby on Rails, Java, PHP or any one of today's popular programming languages.

<blockquote>Fork the project into your own GitHub account</blockquote>
<p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-fork.png" width="700" /></p>

* Create a new app in your the Jenkins project using the URL to your forked project. You can follow the steps to create a new project and Image Stream [HERE](workshop-lab-s2i.html)


### Setting up our OpenShift environment to match our lifecycle stages

#### Setup Jekins jobs to use their openshift image stream (which is off your GitHub fork)

<div class="panel-group" id="accordionC" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingCOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionC" href="#collapseCOne" aria-expanded="true" aria-controls="collapseCOne">
          Steps to Create Jenkins Job
        </a>
      </div>
    </div>
    <div id="collapseCOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingCOne">
      <div class="panel-body">
<blockquote>click "New Item"</blockquote>
<p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-new-item.png" width="500" /></p>
<blockquote>call it yourname-ci-devel, select freestyle, click OK</blockquote>
<p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-name-job.png" width="500" /></p>
<blockquote>under source code management select the OpenShift Image Streams and populate</blockquote>
<p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-ose-imagestream.png" width="500" /></p>

<blockquote>Click "Poll SCM", set a schedule of: * * * * *</blockquote>

<p>
<b>Notes:</b> You will not need the URL of the OpenShift api endpoint or the Authorization Token<br/>
to get this to work
</p>
      </div>
    </div>
  </div>
</div>

#### Connecting the pipeline for dev->test
TBD unit tests and tagging
* Click add build step and choose "Execute shell"
* TBD add unit test step here
* Click add build step and choose "Tag OpenShift Image"
  ** enter in all the info, tag as "readyfortest"
* In the "Post-build actions" subsection click "Add post-build action" and select "Build other projects"
*  type in yourname-ci-deploytotest
* Click Save, don't worry about the erorr here, we are about to build that Jenkins job.
* Click "Back to dashboard"
* click "New Item"
* call it yourname-ci-deploytotest, select freestyle, click OK
* TBD add build step to pull tagged image "readyfortest"

### Watch me release!
So now that you've done all that setup work, forget about it.  What?!  Yeah, all that configuration work only needed to be done once.  Now that the pipeline is defined everything happens automatically on every git commit.  Let's see it in action:

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

