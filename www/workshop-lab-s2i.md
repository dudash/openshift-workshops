---
layout: lab
title: Deploying an App with S2I
subtitle: Adding total consistency to your build process and environment
html_title: S2I
categories: [lab, s2i, developers]
---

## Source to Image (S2I)
One of the useful components of Open Shift is its source-to-image capability.  S2I is a framework that makes it easy to turn your source code into runnable images.  The main advantage of using S2I for building reproducible Docker images is the ease of use for developers.  You'll see just how simple it can be in this lab.

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
    <div id="collapseAOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingAOne">
      <div class="panel-body">

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
$ oc new-app --name=dc-metro-map https://github.com/dudash/openshift-workshops.git --context-dir=dc-metro-map
$ oc expose service dc-metro-map
{% endhighlight %}

<i class="fa fa-info-circle"></i> Open Shift auotmatically detected the source code type and selected the nodejs builder image

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
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-s2i-addbutton.png" width="100"/></p>

<blockquote>
Click "Browse" and filter for nodejs, then click the nodejs:0.10 builder image
</blockquote>
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-s2i-filternode.png" width="600"/></p>

<blockquote>
Fill out the boxes to look as follows:
</blockquote>
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-s2i-addtoproject.png" width="600"/></p>
<p>
Notes: You will need to click to expand the "advanced options"<br/>
The github repository URL is: https://github.com/dudash/openshift-workshops.git<br/>
The github context-dir is: /dc-metro-map<br/>
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
    <div id="collapseBOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingBOne">
      <div class="panel-body">

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>

{% highlight csh %}
$ oc get builds
{% endhighlight %}

In the output, note the name of your build and use it to see the logs with:

{% highlight csh %}
$ oc log builds/[BUILD_NAME]
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

TBD

      </div>
    </div>
  </div>
</div>

### See the app in action
TBD

## Summary
TBD

[1]: https://docs.openshift.com/enterprise/latest/dev_guide/new_app.html
