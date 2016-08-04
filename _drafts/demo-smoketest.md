---
layout: post
title: "Deploy a Docker Image"
date: "2016-02-29 13:16"
---

# Objectives
After completing this lab, you should be able to:

- Deploy your first Docker Image/Container to OpenShift.
- Gain insight into how the Docker Daemon and OpenShift interact behind the scenes.

# The `oc get` Command

The `oc get` command displays one or many resources.

Possible resources are all OpenShift resources (builds, buildConfigs, deployments, deploymentConfigs, images, imageRepositories, routes, projects, and others) and all Kubernetes resources (pods, replicationControllers, services, minions, events).

Let's look at the Pods that were deployed as part of the smoke application in the smoketest project.

    # Switch to the 'smoketest' project
    $ oc project smoketest

    $ oc get pods

You should see output similar to the following:

![OC Get Pods Command]({{ site.url }}/images/2016/02/oc-get-pods.png)

The above output lists all of the Pods in the current Project, including the Pod name, state, restarts, and uptime for the Pod. Once you have a Pod's name, you can get more information about the Pod's using the oc get command.

To make the output readable, I suggest changing the output type to JSON using the following syntax:

    $ oc get pod smoke-1-d36u2 -o json

:warning: Make sure you use the correct Pod name from your output.

Which should output something like so (truncated).

![OC Get Pod JSON Command]({{ site.url }}/images/2016/02/oc-get-pod-json.png)

Other commands to explore include:

    $ oc get replicationController
    $ oc get service

# Deploy a Docker Image

Let's start by doing the simplest thing possible - get a plain old Docker image to run inside of OpenShift. This is incredibly simple to do. We are going to use the [Kubernetes Guestbook](https://registry.hub.Docker.com/u/kubernetes/guestbook/) application for this example.

Again, the first thing we want to do is create a new project called `guestbook`.

    $ oc new-project guestbook

:information_source: Remember projects group resources together.

Which outputs something similar to the folowing:

![OC New Project Command]({{ site.url }}/images/2016/02/oc-new-project-guestbook.png)

:fast_forward: To see all the projects you have access to, you can simply use `oc get projects`.

Run the Docker image in OpenShift by creating a new application in the `guestbook` project.

    $ oc new-app kubernetes/guestbook

The output should be similar to the following screenshot.

![OC New Application Command]({{ site.url }}/images/2016/02/oc-new-app-guestbook.png)

Pretty easy, huh?

This may take a while to complete depending on whether you are the first or last student to create your "application". Each OpenShift node has to pull (download) the Docker image for kubernetes/guestbook from the Docker hub if it does not already have it locally.

You can check on the status of the image download and deployment by:

1. If you haven't already, login to the OpenShift web console.

    Open a browser and navigate to the following URL:

        https://master00-GUID.oslab.opentlc.com:8443

    :panda_face: Don't forget to replace the `GUID` with your own.

    Enter these credentials when prompted by the OpenShift master server.

          Username: student
          Password: redhat

    ![OpenShift Master Login]({{ site.url }}/images/2016/02/ose-master-login.png)

    :information_source: The master server manages nodes in its Kubernetes cluster and schedules pods to run on nodes.

    After you have authenticated to the web console, you will be presented with a list of projects that your user has permission to work with, like so.

    ![OpenShift Master Console]({{ site.url }}/images/2016/02/ose-master-console.png)

  2. Select the `guestbook` project.

      ![OpenShift Guestbook Project]({{ site.url }}/images/2016/02/ose-master-console-guestbook.png)

  3. Mouseover **Browse**, and then select **Pods**.

      ![OpenShift Select Guestbook Project Pods]({{ site.url }}/images/2016/02/ose-guestbook-project-pods.png)

  4. Inspect the `guestbook` project's pods status.

      ![OpenShift Select Guestbook Project Pods]({{ site.url }}/images/2016/02/ose-guestbook-project-pods-status.png)

:eyes: Under status you might see *Pending* rather than *Running*.

You can also use the `oc` command line tool to watch for changes in pods:

    $ oc get pods -w

To exit hit **Control+c**, **CTRL+c**, or **^c**.

# More About the Docker Daemon

Whenever OpenShift asks the node's Docker daemon to run an image, the Docker daemon will check to make sure it has the right "version" of the image to run. If it doesn't, it will pull it from the specified registry.

There are a number of ways to customize this behavior. They are documented in [specifying an image](https://docs.openshift.com/enterprise/3.1/dev_guide/new_app.html#specifying-an-image) as well as [image pull policy](https://docs.openshift.com/enterprise/3.1/architecture/core_concepts/builds_and_image_streams.html#image-pull-policy).

:warning: These few commands are the only ones you need to run to get a "vanilla" Docker image deployed on OpenShift 3. This should work with any Docker image that follows best practices, such as defining an EXPOSE port, not running as the root user or specific user name, and a single non-exiting CMD to execute on start.

:exclamation: It is important to understand that, for security reasons, OpenShift 3 does not allow the deployment of Docker images that run as root by default. If you want or need to allow OpenShift users to deploy Docker images that do expect to run as root (or any specific user), a small configuration change is needed. You can learn more about the [Docker guidelines](https://docs.openshift.com/enterprise/3.1/creating_images/guidelines.html) for OpenShift 3, or you can look at the section on [enabling images to run with a USER in the Dockerfile](https://docs.openshift.com/enterprise/3.1/admin_guide/manage_scc.html#enable-images-to-run-with-user-in-the-dockerfile).
