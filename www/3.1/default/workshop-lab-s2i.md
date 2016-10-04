---
layout: lab
title: Deploying an App with S2I
subtitle: Adding total consistency to your build process and environment
html_title: S2I
categories: [lab, s2i, developers]
---

## Source to Image (S2I)
One of the useful components of OpenShift is its source-to-image capability.  S2I is a framework that makes it easy to turn your source code into runnable images.  The main advantage of using S2I for building reproducible docker images is the ease of use for developers.  You'll see just how simple it can be in this lab.

### Let's build a node.js web server using S2I
We can do this either via the command line (CLI) or the web console.  You decide which you'd rather do and follow the steps below:

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
$ oc new-app --name=dc-metro-map https://github.com/dudash/openshift-workshops.git --context-dir=dc-metro-map
$ oc expose service dc-metro-map
{% endhighlight %}

<i class="fa fa-info-circle"></i> OpenShift auotmatically detected the source code type and selected the nodejs builder image

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
Click "Add to Project"
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-s2i-addbutton.png" width="100"/></p>

<blockquote>
Click "Browse" and filter for nodejs, then click the nodejs:0.10 builder image
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-s2i-filternode.png" width="600"/></p>

<blockquote>
Fill out the boxes to look as follows:
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-s2i-addtoproject.png" width="600"/></p>
<p>
Notes: You will need to click to expand the "advanced options"<br/>
The github repository URL is: https://github.com/dudash/openshift-workshops.git<br/>
The github context-dir is: dc-metro-map<br/>
</p>

<blockquote>
Scroll to the bottom and click "Create"
</blockquote>

      </div>
    </div>
  </div>
</div>

### Check out the build details
We can see the details of what the S2I builder did.  This can be helpful to diagnose issues if builds are failing.

<i class="fa fa-magic"></i> TIP: For a node.js app, running "npm shrinkwrap" is a good practice to perform on your branch before releasing changes that you plan to build/deploy as an image with S2I

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
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>

{% highlight csh %}
$ oc get builds
{% endhighlight %}

In the output, note the name of your build and use it to see the logs with:

{% highlight csh %}
$ oc logs builds/[BUILD_NAME]
{% endhighlight %}

The console will print out the full log for your build.  Note, you could pipe this to more or less for easier viewing in the CLI.

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
Click on "Browse" and then click on "Builds"
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-s2i-builds.png" width="300"/></p>

<blockquote>
Click on the "dc-metro-map" link
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-s2i-metromapbuild.png" width="300"/></p>

<blockquote>
Click on the "View Log" tab to see the details of your latest build
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-s2i-metromapbuilds.png" width="500"/></p>

You should see a log output similar to the one below:
<p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-s2i-metromapbuildlog.png" width="500"/></p>

      </div>
    </div>
  </div>
</div>

### See the app in action
Let's see this app in action!

<div class="panel-group" id="accordionC" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingCOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionC" href="#collapseCOne" aria-expanded="true" aria-controls="collapseCOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseCOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingCOne">
      <div class="panel-body">
<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>

{% highlight csh %}
$ oc get routes
{% endhighlight %}

<blockquote>
Copy the HOST/PORT and paste into your favorite web browser
</blockquote>

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
Click on Overview
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-s2i-overview.png" width="100"/></p>

<blockquote>
Click the URL that is listed in the dc-metro-map service
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-s2i-dcmetromapsvc.png" width="500"/></p>

      </div>
    </div>
  </div>
</div>

The app should look like this in your web browser:

<p><img src="{{ site.baseurl }}/www/3.1/default/screenshots/ose-lab-s2i-apprunning.png" width="500"/></p>

Clicking the checkboxes will toggle on/off the individual metro stations on each colored line.  A numbered icon indicates there is more than one metro station in that area and they have been consolidated - click the number or zoom in to see more.

## Summary
In this lab we deployed a sample application using source to image.  This process built our code and wrapped that in a docker image.  It then deployed the image into our OpenShift platform in a pod and exposed a route to allow outside web traffic to access our application.  In the next lab we will look at some details of this app's deployment and make some changes to see how OpenShift can help to automate our development processes.

[1]: https://docs.openshift.com/enterprise/latest/dev_guide/new_app.html
