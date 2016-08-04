---
layout: post
title: "Using GitHub Webhooks"
date: "2016-02-29 13:20"
---

# Objectives
After completing this lab, you should:

- Understand webhook triggers.
- Be able to use GitHub webhooks.
- Update code remotely and trigger a new build on OpenShift.

# Webhook Triggers

Webhooks allow you to build or set up integrations which subscribe to certain events in order to trigger a new build by sending a request to the OpenShift API endpoint. You can define these triggers using [GitHub webhooks](https://developer.github.com/webhooks/) or Generic webhooks.

When one of those events is triggered, it'll send a HTTP POST payload to the webhook's configured URL. Webhooks can be used to update an external issue tracker, trigger CI builds, update a backup mirror, or even deploy to your production server. You're only limited by your imagination.

Each webhook can be installed on an organization or a specific repository. Once installed, they will be triggered each time one or more subscribed events occurs on that organization or repository.

# Create a GitHub Webhook

In the OpenShift web console, navigate to your `mlbparks` Project, and then mouse-over *Browse* and then *Builds*. Click the `openshift3mlbparks` build.

On this screen you will see the option to copy the GitHub webhook URL as shown in the following image:

![OpenShift Webhook]({{ site.url }}/images/2016/02/webhook1.png)

Once you have the URL copied to your clipboard, navigate to the code repository that you forked on GitHub. Remember, it probably looks like:

      https://github.com/USERNAME/openshift3mlbparks

Click the Settings link on the right hand side of the screen as shown in the following image:

![OpenShift Webhook]({{ site.url }}/images/2016/02/webhook2.png)

Click the Webhooks & Services link:

![OpenShift Webhook]({{ site.url }}/images/2016/02/webhook3.png)

And finally, click on Add webhook. On this screen, enter the URL you copied to your clipboard from the OpenShift web console in the Payload URL box and ensure that you disable SSL verification and save your changes:

![OpenShift Webhook]({{ site.url }}/images/2016/02/webhook4.png)

Boom! From now on, every time you commit new source code to your GitHub repository, a new build and deploy will occur inside of OpenShift. Let's try this out.

Navigate to the /src/main/webapp directory in your GitHub project and then click on the index.html file.

Once you have the file on the screen, click the edit button in the top right hand corner as shown here:

![OpenShift Webhook]({{ site.url }}/images/2016/02/webhook5.png)

Change the following HTML header (line number 34):

      <h1 id="title">MLB Stadiums</h1>

To "MLB Stadiums - OpenShift Roadshow", by modifying the text between &lt;h1&gt; and &lt;\\h1&gt; like so:

      <h1 id="title">MLB Stadiums - OpenShift Roadshow</h1>

:grey_exclamation: Ensure you are changing the h1 on line 34 and not the title element.

Click on Commit changes at the bottom of the screen.

Once you have committed your changes, a Build should almost instantaneously be triggered in OpenShift. Look at the Builds page in the web console, or run the following command to verify:

      $ oc get builds

You should see that a new build is running:

      NAME                   TYPE      STATUS     POD
      openshift3mlbparks-1   Source    Complete   openshift3mlbparks-1-build
      openshift3mlbparks-2   Source    Running    openshift3mlbparks-2-build

Once the build and deploy has finished, verify your new Docker image was automatically deployed by viewing the application in your browser:

![MLB Parks]({{ site.url }}/images/2016/02/mlbparks.png)
