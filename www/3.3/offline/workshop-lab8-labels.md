---
layout: lab
title: Labels
subtitle: Without all the stickiness
html_title: Labels
categories: [lab, labels, selectors, annotations, ops]
---

## Labels
This is a pretty simple lab, we are going to explore labels.  You can use labels to organize, group, or select API objects. 

For example, pods are "tagged" with labels, and then services use label selectors to identify the pods they proxy to. This makes it possible for services to reference groups of pods, even treating pods with potentially different Docker containers as related entities.

### Labels a on pod
In a previous lab we added our web app using a S2I template.  When we did that, Open Shift labeled our objects for us.  Let's look at the labels on our running pod.

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and try the following:
</blockquote>
{% highlight csh %}
$ oc get pods
$ oc describe pod/PODNAME | more
{% endhighlight %}

You can see the Labels automatically added contain the app, deployment, and deploymentconfig.  Let's add a new label to this pod.

<blockquote>
<i class="fa fa-terminal"></i> Add a label
</blockquote>
{% highlight csh %}
$ oc label pod/PODNAME testdate=4.30.2016 testedby=mylastname
{% endhighlight %}

<blockquote>
<i class="fa fa-terminal"></i> Look at the labels
</blockquote>
{% highlight csh %}
$ oc describe pod/PODNAME | more
{% endhighlight %}


<i class="fa fa-info-circle"></i> Here's a handy way to search through all objects and look at all the labels:<br/>
<i class="fa fa-terminal"></i> oc describe all | grep -i "labels:"

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
Hover over "Browse" and then click on "Pods"
</blockquote>
This is going to show basic details for all pods in this project (including the builders).
<p><img src="{{ site.baseurl }}/www/3.1/offline/screenshots/oseoffline-lab-labels-allpods.png" width="500"/></p>
Next let's look at the log for the pod running our application.

<blockquote>
Click the pod for the webapp (it shoud have a status of Running)
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.1/offline/screenshots/oseoffline-lab-labels-poddetails.png" width="500"/></p>
Here, at the top, you can see the labels on this pod

<blockquote>
Click vertically stacked "..." button, then click "Edit" the pod
</blockquote>
<p><img src="{{ site.baseurl }}/www/3.1/offline/screenshots/oseoffline-lab-labels-podedit.png" width="500"/></p>
You will see all the labels under the metadata->labels section.

<blockquote>
Add a new label into the labels section
</blockquote>
Your updated label will show up in the pod's list.

      </div>
    </div>
  </div>
</div>

## Summary
That's it for this lab, now you know that all the objects in Open Shift can be labeled.  This is important because those labels can be used as part of your CI/CD process.  Advanced labs will cover using labels for Blue/Green deployments and running yours apps on specific nodes (e.g. just on SSD nodes or just on east coast nodes).  You can read more about labels [here][1] and [here][2].

[1]: https://docs.openshift.com/enterprise/latest/architecture/core_concepts/pods_and_services.html#labels
[2]: http://kubernetes.io/docs/user-guide/labels/