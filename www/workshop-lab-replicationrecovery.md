---
layout: lab
title: Replication and Recovery
subtitle: the site's dow... oh nevermind, it's good
html_title: Replication and Recovery
categories: [lab, ops]
---

## Things will go wrong, and that's why we have replication and recovery
Things will go wrong with your software, or your hardware, or from something out of your control.  But we can plan for that failure, and planning for it let's us minimize the impact.  Open Shift supports this via what we call replication and recovery.

### Replication
Let's walk through a simple example of how the replication controller can keep your deployment at a desired state.

Coming soon...

### Recovery
Open Shift will pay attention to the health of your application's pods and the containers inside those pods.  Let's force inflict some issues and see how Open Shift reponds.  

Coming soon...

<i class="fa fa-info-circle"></i> You can read more about application health in Open Shift [here][1].

## Summary
Coming soon...
* how replication works and why
* how the load balancer routes traffic to avoid dying pods
* how containers restart and back off over time


[1]: https://docs.openshift.com/enterprise/3.1/dev_guide/application_health.html