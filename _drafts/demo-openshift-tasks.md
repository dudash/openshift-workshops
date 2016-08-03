---
layout: post
title: "OpenShift Tasks Demo"
date: "2016-08-03 14:25"
---

# Problem

You want to re-created pods on a node after disruptive maintenance such as a kernel upgrade.

# Solution

A replication controller ensures that a specified number of pod “replicas” are running at any one time. In other words, a replication controller makes sure that a pod or homogeneous set of pods are always up and available. If there are too many pods, it will kill some. If there are too few, the replication controller will start more.

Additionally, the pods maintained by a replication controller are automatically replaced if they fail, get deleted, or are terminated.

Let’s walk through a simple example of how the replication controller can keep your deployment at a desired state.

I will start off by creating a simple Java EE application under my `sample-project`.

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Web Console Steps
        </a>
      </div>
    </div>
    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
        <blockquote>
          Click "Add to project"
        </blockquote>

        <blockquote>
          Browse "xpaas"
        </blockquote>

        <blockquote>
          Browse "xpaas"
        </blockquote>
      </div>
    </div>
  </div>
</div>

# Summary

In almost all cases, you will end up using the Pod, Service, ReplicationController and DeploymentConfiguration resources together. And, in almost all of those cases, OpenShift will create all of them for you.

You can think of a replication controller as something similar to a process supervisor, but rather than individual processes on a single node, the replication controller supervises multiple pods across multiple nodes.
