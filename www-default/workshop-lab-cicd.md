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

  * Go into Jenkins project
  * Click "Add to Project", select jenkins-ephemeral, click "Create"
	<img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-jenkins-ephemeral.png" width="500"/>

  * Accept all defaults
  
  * click "continue to overview", wait for it to start
  	<img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-jenkins-start.png" width="500"/>
  
  * click the service link to open jenkins, login as admin/password
  	<img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-jenkins-login.png" width="500"/>




### The OpenShift pipeline plugin
Now let's make sure we have the OpenShift Pipeline [plugin][2] properly installed within Jenkins.  It will be used to define our application lifecycle and to let our Jenkins jobs perform commands on our OpenShift cluster.

  * click "Manage Jenkins"
  <p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-manage-jenkins.png" width="100" height="100"/></p>
  
  * click on "Manage Plugins" 
  <p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-manage-plugins.png" width="500" /></p>
  
  * click on "Available" tab
  
  * filter on "openshift"
  
  
  * install "Openshift Pipeline Jenkins Plugin"
  <img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-jenkins-plugin.png" width="700" />

You can read more about the plugin [here][3].


### Our sample web app and its automated tests
In this example pipeline we will be building, testing, and staging a Node.js webapp.  We wrote all the code for you already, so don't worry you won't be coding in this lab.  You will just use the code and unit tests to see how CI/CD pipelines work.  And keep in mind that these principles are relevant whether your programming in Node.js, Ruby on Rails, Java, PHP or any one of today's popular programming languages.

  * Fork the project into your own GitHub account
  <p><img src="{{ site.baseurl }}/www-default/screenshots/ose-lab-cicd-fork.png" width="700" /></p>

  * Create a new app in your the Jenkins project using the URL to your forked project. You can follow the steps [here](workshop-lab-s2i.html)


### Setting up our OpenShift environment to match our lifecycle stages

#### TBD setup Jekins jobs to use their openshift image stream (which is off github fork)
* click "New Item"
* call it yourname-ci-devel, select freestyle, click OK
* under source code management select the OpenShift Image Streams
  **  Setup the name of the ImageStream to monitor	
  ** The specific image tag in the ImageStream to monitor	
  ** URL of the OpenShift api endpoint	
  ** The name of the project the ImageStream is stored in	
  ** The authorization token for interacting with OpenShift

* Click "Poll SCM", set a schedule of: XXX


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

