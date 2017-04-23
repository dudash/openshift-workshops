---
layout: lab
title: CI | CD Pipelines
subtitle:
html_title: CI/CD
categories: [lab, developers, ops]
---

## Overview
In modern software projects many teams utilize the concept of continuous integration and continuous delivery (CI/CD).  By setting up a tool chain that continuously builds, tests, and stages software releases a team can ensure that their product can be reliably released at any time.  OpenShift can be an enabler in the creation and managecment of this tool chain.  In this lab we will walk through creating a simple example of a CI/CD [pipeline][1] utlizing Jenkins, all running on top of OpenShift!

### Start by creating a new project
To begin, we will create a new project. Name the new project "cicd".

<div class="panel-group" id="accordionAa" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingAaOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionAa" href="#collapseAaOne" aria-expanded="true" aria-controls="collapseAaOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseAaOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingAaOne">
      <div class="panel-body">
        <blockquote>
        <i class="fa fa-terminal"></i> Goto the terminal and type the following:
        </blockquote>
        {% highlight csh %}
        $ oc new-project cicd-$USER_ID
        {% endhighlight %}
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingATwo">
      <div class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordionAa" href="#collapseAaTwo" aria-expanded="false" aria-controls="collapseAaTwo">
          Web Console Steps
        </a>
      </div>
    </div>
    <div id="collapseAaTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingAaTwo">
      <div class="panel-body">

        <blockquote>Browse to original landing page, and click "New Project".</blockquote>
        <p><img src="{{ site.baseurl }}/www/3.3/default/screenshots/ose-lab-cicd-new-project.png" width="100"/></p>
        <blockquote>Fill in the name of the project as "cicd-$USER_ID" and click "Create"</blockquote>
        <p><img src="{{ site.baseurl }}/www/3.3/default/screenshots/ose-lab-cicd-new-project-detail.png" width="500"/></p>
      </div>
    </div>
  </div>
</div>

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

        <blockquote>Click "Add to Project", click "Browse Catalog" select "jenkins-ephemeral".</blockquote>
        <p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-cicd-jenkins-ephemeral.png" width="500"/></p>
        <blockquote>Click "continue to overview", wait for it to start</blockquote>
        <p><img src="{{ site.baseurl }}/www/3.3/default/screenshots/ose-lab-cicd-jenkins-start.png" width="500"/></p>

        <blockquote>Click the service link to open jenkins, login as admin/password</blockquote>
        <p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-cicd-jenkins-login.png" width="500"/></p>
      </div>
    </div>
  </div>
</div>

### Accessing Jenkins
Jenkins and OpenShift are integrated together in this version of the product. Upon attempting to access the route for Jenkins, you will be brought to a prompt:
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-sso1.png" width="400"/></p>

Click the button to "Login to OpenShift" and re-enter your OpenShift user credentials.
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-sso2.png" width="500"/></p>

You will then be prompted to grant permissions to the service. Click the button to "Allow Selected Permissions".
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-sso3.png" width="600"/></p>
If all worked, you should be re-directed to the Jenkins dashboard (which is now running on the OpenShift Container Platform).
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-sso4.png" width="600"/></p>

### The OpenShift Build pipeline

<div class="panel-group" id="accordionB" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingBOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionB" href="#collapseBOne" aria-expanded="true" aria-controls="collapseBOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseBOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingBOne">
      <div class="panel-body">
      <blockquote>
      <i class="fa fa-terminal"></i> Goto the terminal and get the pipeline yaml:
      </blockquote>
      {% highlight csh %}
      $ wget https://raw.githubusercontent.com/openshift/origin/master/examples/jenkins/pipeline/samplepipeline.yaml
      {% endhighlight %}

      <blockquote>
      <i class="fa fa-terminal"></i> Process the template into OpenShift:
      </blockquote>
      {% highlight csh %}
      $ oc new-app -f samplepipeline.yaml
      {% endhighlight %}



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
      <blockquote>Copy the YAML from the following URL</blockquote>
      {% highlight csh %}
        https://raw.githubusercontent.com/openshift/origin/master/examples/jenkins/pipeline/samplepipeline.yaml
      {% endhighlight %}

      <blockquote>Click "Add to Project" and select the tab that says "Import YAML/JSON". Paste the YAML from the previous link.</blockquote>
      <p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-importyaml.png" width="500"/></p>
      <blockquote>Click "Create"</blockquote>
      <blockquote>You will be prompted to Process or Save the template. Leave "Process Template" checked and click "Continue".</blockquote>
      <p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-processtemplate.png" width="500"/></p>
      <blockquote>You will be be directed to the "Create App" page. Accept all default values, scroll to the bottom of the page, and click "Create".</blockquote>
      <p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-runtemplate.png" width="500"/></p>
      </div>
    </div>
  </div>
</div>


### Verify
If all went as planned, you should see a setup similar to the image below. There is an application deployed with a Node.js frontend and a MongoDB backend. The Node.js front end has not been built or deployed yet.
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-pipelineresult1.png" width="600"/></p>
Click "Builds" -> "Pipelines"
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-pipelineresult2.png" width="300"/></p>
You should see a new Pipeline object called "sample-pipeline"
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-pipelineresult3.png" width="600"/></p>
Expand the details, and click the "Configuration" tab. From here, you can see the Groovy code that executes the Jenkins pipeline.
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-pipelineresult4.png" width="600"/></p>


### Run the Pipeline
<blockquote>
Click "Builds" -> "Pipelines"
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-pipelineresult2.png" width="300"/></p>

<blockquote>
At the top of the page, we you should see a button that says "Start Pipeline". Click the button.
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-startpipeline1.png" width="200"/></p>

<blockquote>
You should see a pipeline visually display in the browser as shown below.
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-startpipeline2.png" width="600"/></p>

<blockquote>
We can verify view logs of the pipeline in Jenkins by clicking "View Log" on the pipeline.
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-startpipeline4.png" width="200"/></p>
<blockquote>
You are then re-directed to the Console in Jenkins which contains the output from the Pipeline execution.
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-startpipeline5.png" width="600"/></p>
<blockquote>
When the pipeline completes all the steps, the Node.js application will be built and deployed. All of this was orchestrated by Jenkins on the back end.
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-startpipeline3.png" width="600"/></p>


You can read more about the plugin [here][3].


### Edit the Pipeline

<blockquote>
On the <strong>sample-pipeline</strong> details page, go to the <strong>Actions</strong> button and select <strong>Edit</strong>.
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-editpipeline1.png" width="200"/></p>
<blockquote>
Append the following script after the <strong>stage(deploy)</strong> element.
</blockquote>
{% highlight csh %}
stage('scale'){
    openshiftScale(deploymentConfig: 'nodejs-mongodb-example', replicaCount: 3)
}
{% endhighlight %}

<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-editpipeline2.png" width="600"/></p>

<blockquote>
Click "Save"
</blockquote>

<blockquote>
Click "Start Build"
</blockquote>

<blockquote>
You should see a new Pipeline execution, which has a third step called <strong>scale</strong>
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-editpipeline3.png" width="600"/></p>

<blockquote>
When the pipeline terminates, you can browse back to the "Overview". You will then see that the Node.js application has been scaled up by the OpenShift/Jenkins pipeline to 3 replicas.
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.4/default/screenshots/ose-lab-cicd-editpipeline4.png" width="600"/></p>

## Summary
In this lab, we have seen the integration between Jenkins and OpenShift to orchestrate complex CI/CD pipelines with Images running on OpenShift. Feel free to explore different CICD flows using the OpenShift Pipeline Plugin and be sure to ask one of the instructors if you run into any problems or have any questions.

Read more about usage of [Jenkins on OpenShift here][4].  Read more about the concepts behind [pipelines in Jenkins here][1].


[1]: https://jenkins.io/doc/pipeline/
[2]: https://wiki.jenkins-ci.org/display/JENKINS/OpenShift+Pipeline+Plugin
[3]: https://github.com/openshift/jenkins-plugin/
[4]: https://docs.openshift.com/enterprise/latest/using_images/other_images/jenkins.html
[5]: https://en.wikipedia.org/wiki/Continuous_delivery
[6]: https://github.com/openshift/origin/blob/master/examples/jenkins/README.md
[7]: https://docs.openshift.com/enterprise/latest/creating_images/s2i_testing.html#creating-images-s2i-testing
