---
layout: lab
title: Basic Ops
subtitle:
html_title: Basic Ops
categories: [lab, ops]
---

## Operations on OpenShift
This lab walks you through some basic functionality that you might perform when working with your deployed apps and services.  We will cover how OpenShift can  auto recover from failures and how you can investigate the inner workings of the platform along with its configuration.  This is an advanced lab with the goal of getting you comfortable with the internal working components of OpenShift.

<i class="fa fa-warning"></i> Please note: many of the steps in this lab require additional privledges via an administrative of service account.  If only have access to via developer account with limited project access you might not be able to continue.


### Metrics
As an administrator, you can view a cluster’s metrics from all containers and components in one user interface.  Let's take a look at that:

Coming soon...


### Checking on your cluster nodes and the master
As an administrator you can view the health of the nodes in your cluster and look into events that occured within OpenShift.  Let's take a look at that:

Coming soon...

<blockquote>
<i class="fa fa-terminal"></i> Try the following:
</blockquote>
{% highlight csh %}
$ oc get nodes
$ oc describe nodes
$ oc get cs
$ oc get events
{% endhighlight %}


### Compute Resources
Each container running on a node consumes compute resources.  When authoring your pod, you can optionally specify how much CPU and memory (RAM) each container needs in order to better schedule pods in the cluster and ensure satisfactory performance.  We do that via a deployment configuration.  Let's see an example of that in action:

Coming soon... more on requests and limits


### Quotas and Resources Limits
In addition to specifying the resource requirements and limits for a specific pod's deployment you can scope resource consumption across an entire project.  You do this via Quotas and Resource Limits.


Quotas let you specify hard limits per project on the creation of various objects (cpu total, memory total, services, pods, secrets, and more).

<blockquote>
<i class="fa fa-terminal"></i> Try the following:
</blockquote>
{% highlight csh %}
$ oc describe quota
{% endhighlight %}

<i class="fa fa-info-circle"></i> You can read more about quotas [here][4]

Resource Limits (aka LimitRanges) let you specify the amount of CPU or memory resources that can be consumed by an individual build, container, or pod within the project.  That's different from a quota which gets measured across the entire project (e.g. all pods).  Let's look at the limits that have been preconfigured for this workshop project.

<blockquote>
<i class="fa fa-terminal"></i> Try the following:
</blockquote>
{% highlight csh %}
$ oc describe limits
{% endhighlight %}

<i class="fa fa-info-circle"></i> You can read more about resource limits [here][5]


### Inspect your configuration
Coming soon...

* /etc/origin/node/master.yaml
* /etc/origin/node/node-config.yaml


## Summary
Coming soon...

[1]: https://docs.openshift.com/enterprise/latest/dev_guide/application_health.html
[2]: https://docs.openshift.com/enterprise/latest/dev_guide/deployments.html
[3]: https://docs.openshift.com/enterprise/3.4/architecture/core_concepts/projects_and_users.html
[4]: https://docs.openshift.com/enterprise/3.4/dev_guide/quota.html
[5]: https://docs.openshift.com/enterprise/3.4/dev_guide/limits.html
