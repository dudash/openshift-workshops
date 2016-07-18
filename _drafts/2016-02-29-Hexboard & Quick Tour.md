---
layout: post
title: "Hexboard & Quick Tour"
date: "2016-02-29 13:03"
---

# Objectives
After completing this lab, you should:

- Understand what OpenShift projects are and how to create them.
- Create a test application for purposes of environment verification.
- Become familiar with the OpenShift web-based console via the browser.

# Projects

An OpenShift project allows a community of users (or a user) to organize and manage their content in isolation from other communities. Each project has its own resources, policies (who can or cannot perform actions), and constraints (quotas and limits on resources, etc). Projects act as a "wrapper" around all the application services and endpoints you (or your teams) are using for your work.

Users must be given access to projects by administrators, or if allowed to create projects, automatically have access to their own projects.

Projects can have a separate **name**, **displayName**, and **description**.

- The mandatory **name** is a unique identifier for the project and is most visible when using the CLI tools or API.
- The optional **displayName** is how the project is displayed in the web console (defaults to name).
- The optional **description** can be a more detailed description of the project and is also visible in the web console.

:thought_balloon: A project is technically a Kubernetes namespace with additional annotations.

# Hexboard

Container vizualization for [OpenShift V3](http://openshift.com/). As featured in the [Red Hat Summit 2015 Middleware Keynote](https://www.youtube.com/watch?v=wWNVpFibayA&t=26m48s).


#### Authentication

Login to the OpenShift Enterprise (OSE) 3.1 environment for this lab.

    $ oc login https://master00-GUID.oslab.opentlc.com:8443 --username=student --password=redhat --insecure-skip-tls-verify=true

After logging in, run `oc whoami` using the `-t` flag to fetch your cli tool's oauth access_token.  

    $ oc whoami -t

:exclamation: You will need this token to give the hexboard access to the kubernetes core services API.

####  Create the Hexboard Project

    $ oc new-project hexboard \
         --display-name="Hexboard" \
         --description="Red Hat Summit 2015 Middleware keynote demo project."

This creates a new project, with the currently logged-in user as the project admin. Option --display-name specifies the user-facing name of the project. Option --description specifies its description.

:information_source: Note that we use double-quotes around the option arguments.

####  Display the Current Project

Check that you are currently using the "hexboard" project before proceeding.

    $ oc project

The expected output is the following:

    Using project "hexboard" on server "https://master00-GUID.oslab.opentlc.com:8443".

####  Create the Hexboard Application

The following creates a new application in OpenShift with the specified source code, templates, and images.

    $ oc new-app -f https://raw.githubusercontent.com/2015-Middleware-Keynote/hexboard/master/app_template.json \
                 -p ACCESS_TOKEN=$(oc whoami -t)

It builds up the components of an application using images, templates, or code that has a public repository. It looks up images on the local Docker installation (if available), a Docker registry, or an OpenShift image stream.

If you specify a source code URL, it sets up a build that takes the source code and converts it into an image that can run in a pod.

The images will be deployed via a deployment configuration, and a service will be connected to the first public port of the app. You may either specify components using the various existing flags or let new-app autodetect what kind of components you have provided.

:information_source: Local source must be in a git repository that has a remote repository that the OpenShift instance can see.

####  Install the Application Template (optional)

:thought_balloon: The following details several other methods for installing the Hexboard application, but if you used the single-line method above this is primarily for educational purposes.

Additionally, you can create each service individually using `oc new-app` like before.

    $ oc new-app -l servicegroup=sketchpod openshift/nodejs~http://github.com/2015-Middleware-Keynote/sketchpod
    $ oc new-app -e "ACCESS_TOKEN=${ACCESS_TOKEN}" openshift/nodejs~http://github.com/2015-Middleware-Keynote/hexboard

Or, install the template directly into your current project (advanced).

    $ oc create -f https://raw.githubusercontent.com/2015-Middleware-Keynote/hexboard/master/app_template.json

:information_source: This creates resources. It does not require pointers about what resource it should create because it reads it from the provided JSON/YAML. After successful creation, the resource name will be printed to the console.

####  Check the Results

- Using the `oc` client.

        $ oc get builds -w

  Where the expected output is the following:

        NAME          TYPE      FROM         STATUS    STARTED         DURATION
        hexboard-1    Source    Git@master   Running   3 minutes ago   3m9s
        sketchpod-1   Source    Git          Running   3 minutes ago   3m8s

- Using the Web Console

  OpenShift Enterprise 3 ships with a web-based console that will allow users to perform various tasks via a browser. To get a feel for how the web console works, open your browser and go to the following URL:

        https://master00-GUID.oslab.opentlc.com:8443

  The first screen you will see is the master server authentication screen. Enter in the following credentials:

        Username: student
        Password: redhat

:information_source: The master server is the host or hosts that contain the master components, including the API server, controller manager server, and etcd.

  ![OpenShift Master Login]({{ site.url }}/images/ose-master-login.png)

  After you have authenticated to the web console, you will be presented with a list of projects that your user has permission to work with like so.

  ![OpenShift Master Console]({{ site.url }}/images/ose-master-console.png)

:cool: Each user's OpenShift Enterprise (OSE) 3.1 environment for this lab has the highest level of administrative privileges.

  Click on the **Hexboard** project to navigate to the the project overview page which lists all the routes, services, deployments, and pods running for the recently created project.

  ![OpenShift Hexboard Project]({{ site.url }}/images/ose-hexboard-project.png)

  Once you have digested the information on the overview page, mouseover **Browse** tab on the left hand :point_left: side of the screen, and explore the different menus.

  :thought_balloon: If you'd like to view the deployed application... First click the :arrow_up: next to the circular image with "1 pod" displayed under the **sketchpod** service, then navigate to link above the deployed Hexboard pod i.e. [http://hexboard-hexboard.cloudapps-GUID.oslab.opentlc.com/]().

  Do this a couple more times while tabbing back and forth see what happens! :smiley: But, please do **NOT** do this too many times in the lab environment (I'll explain later).
