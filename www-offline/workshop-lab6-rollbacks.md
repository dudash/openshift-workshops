---
layout: lab
title: Webhooks and Rollbacks
subtitle: A bit more automation can't hurt
html_title: Webhooks and Rollbacks
categories: [lab, developers, ops, rollback]
---

## Build Triggers, Webhooks and Rollbacks - Oh My!
Once you have an app deployed in Open Shift you can take advantage of some continuous capabilities that help to enable DevOps and automate your management process.  We will cover some of those in this lab: Build triggers, webhooks, and rollbacks.

### Build Trigger / Code Change Webhook
When using S2I there are a few different things that can be used to [trigger][1] a rebuild of your source code.  The first is a configuration change, the second is an image change, and the last (which we are covering here) is a webhook.  A webhook is basically your git source code repository telling Open Shift that the code we care about has changed.  Let's set that up for our project now to see it in action.

The builder template that was used when the webapp was added to the project created a number of resources for you.  What we care about right now is the build configuration because that contains the webhooks.  Let's find the URL for the webhook:

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
$ oc describe bc/webapp
{% endhighlight %}

You should see the output for the app's build configuration.  Look for the text "Webhook".

<blockquote>
Copy the Generic webhook to the clipboard
</blockquote>

      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <div class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Web Console Steps
        </a>
      </div>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">
        
<blockquote>
Hover over "Browse" and then click on "Builds"
</blockquote>
This is going to show basic details for all build configurations in this project
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-rollbacks-buildconfigs.png" width="500"/></p>

<blockquote>
Click the "dc-metro-map" build config
</blockquote>
You will see the summary of builds using this build config
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-rollbacks-buildconfigsummary.png" width="500"/></p>

<blockquote>
Click the "Configuration" tab (next to the active Summary tab)
</blockquote>
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-devman-deployconfigconfig.png" width="500"/></p>
Now you can see the various configuration details including the Github specific and Generic webhook URLs.

<blockquote>
Copy the Generic webhook to the clipboard
</blockquote>

      </div>
    </div>
  </div>
</div>

<br/>

> Now open a webbrowser and navigate to where we manage the [source code for this project][6] (http://openshift.example.com:3000/demo/openshiftexamples-nodemongo)

<div class="panel-group" id="accordionC" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingCOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionC" href="#collapseCOne" aria-expanded="true" aria-controls="collapseCOne">
          Github Steps
        </a>
      </div>
    </div>
    <div id="collapseCOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingCOne">
      <div class="panel-body">

Let's put the webhook URL into the repository. At the main page for this repository (the fork), you should see a tab bar with code, issues, commits, releases, wiki, and settings.

<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-rollbacks-settings.png" width="400"/></p>

<blockquote>
Click the "Settings" tab
</blockquote>

Now you will see a vertical list of settings groups.<br/><br/>

<blockquote>
Click the "Webhooks" item
</blockquote>

<blockquote>
Click the "Add webhook" button and select "Gogs"
</blockquote>
<blockquote>
Paste in the URL you copied
</blockquote>

<blockquote>
Click the button to "Add webhook"
</blockquote>

      </div>
    </div>
  </div>
</div>

Good work!  Now any "push" to the forked repository will send a webhook that triggers Open Shift to: re-build the code and image using s2i, and then perform a new pod deployment.


### Deployment Triggers
<i class="fa fa-info-circle"></i> In addition to setting up triggers for rebuilding code, we can setup a different type of [trigger][2] to deploy pods.  Deployment triggers can be due to a configuration change (e.g. environment variables) or due to an image change.  This powerful feature will be covered in one of the advanced labs.


### Rollbacks
Well, what if something isn't quite right with the latest version of our app?  Let's say some feature we thought was ready for the world really isn't - and we didn't figure that out until after we deployed it.  No problem, we can roll it back with the click of a button.  Let's check that out:

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
$ oc rollback webapp-1
$ oc get pods -w
{% endhighlight %}

Open Shift has done a graceful removal of the old pod and created a new one using the previous deployment configuration.  Open the page for the webapp and refresh it.  Notice it is no longer talking to the database.  Let's put it back to a working state again:

{% highlight csh %}
$ oc rollback webapp-2
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

<blockquote>
Hover over "Browse" and then click on "Deployments"
</blockquote>
This is going to show basic details for all deployment configurations in this project

<blockquote>
Click the "dc-metro-map" deployment config
</blockquote>
Toward the bottom of the screen you will see a table of deployments using this deployment config
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-rollbacks-deploymentconfigsummary.png" width="600"/></p>

<blockquote>
In the Deployments table click the #1
</blockquote>
<p><img src="{{ site.baseurl }}/{{ site.workshop-dir }}/screenshots/ose-lab-rollbacks-deploymentconfig1.png" width="500"/></p>

<blockquote>
Click the "Rollback button", accept defaults, and click "Rollback" again
</blockquote>

You can go back to the overview page to see your previous deployment spinning down and your new one spinning up.

Open Shift has done a graceful removal of the old pod and created a new one using the previous deployment configuration.  Open the page for the webapp and refresh it.  Notice it is no longer talking to the database.  Let's put it back to a working state again, 

<blockquote>
Following steps just like above, Click the "Rollback button", for the previously working deployment (should be #2).
</blockquote>


      </div>
    </div>
  </div>
</div>


<i class="fa fa-info-circle"></i> The old pod wasn't killed until the new pod was successfully started and ready to be used.  This is so that Open Shift could continue to route traffic to the old pod until the new one was ready.

<i class="fa fa-info-circle"></i> You can integrate your CI/CD tools to do [rollbacks with the REST API][5].

## Summary
In this lab we saw how you can configure a source code repository to trigger builds with webhooks.  This webhook could come from Github, Jenkins, Travis-CI, or any tool capable of sending a URL POST.  Keep in mind that there are other types of build triggers you can setup.  For example: if a new version of the upstream RHEL image changes.  We also inspected our deployment history and did a rollback of our running deployment to one based on an older image.


[1]: https://docs.openshift.com/enterprise/3.1/dev_guide/builds.html#build-triggers
[2]: https://docs.openshift.com/enterprise/3.1/dev_guide/deployments.html#triggers
[3]: https://github.com/join?source=header-home
[4]: https://github.com/dudash/openshift-workshops/
[5]: https://docs.openshift.com/enterprise/latest/rest_api/openshift_v1.html#create-a-deploymentconfigrollback-2
[6]: http://openshift.example.com:3000/demo/openshiftexamples-nodemongo
