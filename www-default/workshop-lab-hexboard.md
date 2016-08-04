---
layout: lab
title: Smoke Test (Hexboard)
subtitle:
html_title: Hexboard
categories: [lab, ops, app, demo, test]
---

## Using a project

An OpenShift project allows a community of users (or a user) to organize and manage their content in isolation from other communities. Each project has its own resources, policies (who can or cannot perform actions), and constraints (quotas and limits on resources, etc). Projects act as a "wrapper" around all the application services and endpoints you (or your teams) are using for your work.

Users must be given access to projects by administrators, or if allowed to create projects, automatically have access to their own projects.

Projects can have a separate **name**, **displayName**, and **description**.

- The mandatory **name** is a unique identifier for the project and is most visible when using the CLI tools or API.
- The optional **displayName** is how the project is displayed in the web console (defaults to name).
- The optional **description** can be a more detailed description of the project and is also visible in the web console.

:thought_balloon: A project is technically a Kubernetes namespace with additional annotations.


###  Let's create the Hexboard project

{% highlight csh %}
$ oc new-project hexboard \
     --display-name="Hexboard" \
     --description="Red Hat Summit 2015 Middleware keynote demo project."
{% endhighlight %}

This creates a new project, with the currently logged-in user as the project admin. Option --display-name specifies the user-facing name of the project. Option --description specifies its description.

:information_source: Note that we use double-quotes around the option arguments.

###  Displaying the current project

Check that you are currently using the "hexboard" project before proceeding.

{% highlight csh %}
$ oc project
{% endhighlight %}

The expected output is, Using project "hexboard" on server "[URI]".

###  Creating the Hexboard application

The following creates a new application in OpenShift with the specified source code, templates, and images.

{% highlight csh %}
$ oc new-app -f https://raw.githubusercontent.com/2015-Middleware-Keynote/hexboard/master/app_template.json \
             -p ACCESS_TOKEN=$(oc whoami -t)
{% endhighlight %}

It builds up the components of an application using images, templates, or code that has a public repository. It looks up images on the local Docker installation (if available), a Docker registry, or an OpenShift image stream.

If you specify a source code URL, it sets up a build that takes the source code and converts it into an image that can run in a pod.

The images will be deployed via a deployment configuration, and a service will be connected to the first public port of the app. You may either specify components using the various existing flags or let new-app autodetect what kind of components you have provided.

:information_source: Local source must be in a git repository that has a remote repository that the OpenShift instance can see.

###  Checking the results

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
$ oc get builds -w
{% endhighlight %}

This will tail the deployment process as a image is instantiated into a container.

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

Login to the Web Console:
<p><img alt="OpenShift Web Console" src="{{ site.baseurl }}/images/ose-master-login.png" width="500"/></p>
:information_source: The master server is the host or hosts that contain the master components, including the API server, controller manager server, and etcd.<br/><br/>

After you have authenticated to the web console, you will be presented with a list of projects that your user has permission to work with like so.
<p><img alt="OpenShift Projects" src="{{ site.baseurl }}/images/ose-master-console.png" width="500"/></p>

Click on the <b>Hexboard</b> project to navigate to the the project overview page which lists all the routes, services, deployments, and pods running for the recently created project.
<p><img alt="OpenShift Hexboard" src="{{ site.baseurl }}/images/ose-hexboard-project.png" width="500"/></p>

Mouseover <b>Browse</b> tab on the left hand :point_left: side of the screen, and explore the different menus.<br/><br/>

:thought_balloon: If you'd like to view the deployed application... First click the :arrow_up: (up arrow) next to the circular image with "1 pod" displayed under the <b>sketchpod</b> service, then navigate to link above the deployed Hexboard pod i.e. `http://hexboard-hexboard.projectname-URI.com/`.<br/><br/>

Do this a couple more times while tabbing back and forth see what happens. But, please don't do this too many times in the lab environment (I'll explain, just ask).

      </div>
    </div>
  </div>
</div>
