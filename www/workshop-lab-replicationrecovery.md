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
Let's walk through a simple example of how the replication controller can keep your deployment at a desired state.  Assuming you still have the dc-metro-map project running we can manually scale up our replicas to handle increased user load.

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
<i class="fa fa-terminal"></i> Goto the terminal and try the following:
</blockquote>
{% highlight csh %}
$ oc scale --replicas=4 dc/dc-metro-map
{% endhighlight %}

You can see the Labels automatically added contain the app, deployment, and deploymentconfig.  Let's add a new label to this pod.

<blockquote>
<i class="fa fa-terminal"></i> Check out the new pods:
</blockquote>
{% highlight csh %}
$ oc get pods
{% endhighlight %}

Notice that you now have 4 unique pods availble to inspect.  If you want go ahead and inspect them you can see that each have their own IP address and logs (oc describe).

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
Click "Overview"
</blockquote>
<blockquote>
In the deployment, click the up arrow 3 times.
</blockquote>
The deployment should now indicate that you have 4 running pods.  Keep in mind that each pod has it's own container which is an identical deployment of the webapp.  Open Shift is (by default) round robin load-balancing traffic to each pod.
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-replicationrecovery-4pods.png" width="500"/></p>

<blockquote>
Hover over "Browse" and click "Pods"
</blockquote>
Notice that you now have 4 unique pods availble to inspect.  If you want go ahead and inspect them you can see that each have their own IP address and logs.
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-replicationrecovery-4podslist.png" width="500"/></p>

      </div>
    </div>
  </div>
</div>

So you've told Open Shift that you'd like to maintain 4 running, load-balanced, instances of our web app.

### Recovery
OK, now that we have a slightly more interesting desired replication state, we can test a service outages scenario. In this scenario, the dc-metro-map replication controller will ensure that other pods are created to replace those that become unhealthy.  Let's force inflict an issue and see how Open Shift reponds.

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
<i class="fa fa-terminal"></i> Choose a random pod and delete it:
</blockquote>
{% highlight csh %}
$ oc get pods
$ oc delete pod/PODNAME
$ oc get pods -w
{% endhighlight %}

If you're fast enough you'll see the pod you deleted go "Terminating" and you'll also see a new pod immediately get created and from "Pending" to "Running".  If you weren't fast enough you can see that your old pod is gone and a new pod is in the list with an age of only a few seconds.

<br/><br/><i class="fa fa-info-circle"></i>  You can see the more details about your replication controller with: $ oc describe rc

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

Assuming you are in the browse pods list.

<blockquote>
Click one of the running pods (not a build pod)
</blockquote>
<blockquote>
Click the vertically stacked "..." button in the top right and then delete
</blockquote>
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-replicationrecovery-deletepod.png" width="400"/></p>

<blockquote>
Quick switch back to the Overview
</blockquote>

If you're fast enough you'll see the pod you deleted unfill a portion of the deployment circle, and then a new pod fill it back up.  You can browse the pods list again to see the old pod was deleted and a new pod with an age of "a few seconds" has been created to replace it.

<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-replicationrecovery-podrecovery.png" width="600"/></p>

      </div>
    </div>
  </div>
</div>


### Application Health
In addition to the health of your application's pods, Open Shift will watch the containers inside those pods.  Let's force inflict some issues and see how Open Shift reponds.  

<div class="panel-group" id="accordionC" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingCOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordionC" href="#collapseCOne" aria-expanded="true" aria-controls="collapseCOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseCOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingCOne">
      <div class="panel-body">

<blockquote>
<i class="fa fa-terminal"></i> Choose a running pod and shell into it:
</blockquote>
{% highlight csh %}
$ oc get pods
$ oc exec PODNAME -it /bin/bash
{% endhighlight %}

You are now executing a bash shell running in the container of the pod.  Let's kill our webapp and see what happens.
<br/><i class="fa fa-info-circle"></i> If we had multiple containers in the pod we could use "-c CONTAINER_NAME" to select the right one
<br/><br/>
<blockquote>
<i class="fa fa-terminal"></i> Choose a running pod and shell into its container:
</blockquote>
{% highlight csh %}
$ pkill -9 node
{% endhighlight %}

This will kick you out off the container.
<br/><br/>
<blockquote>
<i class="fa fa-terminal"></i> Do it again - shell in and execute the same command to kill node
</blockquote>

<blockquote>
<i class="fa fa-terminal"></i> Watch for the container restart
</blockquote>
{% highlight csh %}
$ oc get pods -w
{% endhighlight %}

The container died multiple times so quickly that Open Shift is going to put the pod in a CrashBackOff state.  This ensures the system doesn't waste resources trying to restart containers that are continuously crashing.

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
Navigate to browse the pods list, and click on a running pod
</blockquote>
<blockquote>
In the tab bar for this pod, click on "Terminal"
</blockquote>
<blockquote>
Click inside the terminal view and type $ pkill -9 node
</blockquote>
<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-replicationrecovery-terminal.png" width="400"/></p>

This is going to kill the node.js web server and kick you off the container.

<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-replicationrecovery-terminalkick.png" width="400"/></p>

<blockquote>
Click the refresh button (on the terminal) and do that a couple more times
</blockquote>

<blockquote>
Go back to the pods list
</blockquote>

<p><img src="{{ site.baseurl }}/www/screenshots/ose-lab-replicationrecovery-backoff.png" width="500"/></p>

The container died multiple times so quickly that Open Shift is going to put the pod in a CrashBackOff state.  This ensures the system doesn't waste resources trying to restart containers that are continuously crashing.

      </div>
    </div>
  </div>
</div>


### Clean up
Let's scale back down to 1 replica.  If you are using the web console just click the down arrow from the Overview page.  If you are using the command line use the "oc scale" command.

## Summary
In this lab we learned about replication controllers and how they can be used to scale your applications and services.  We also tried to break a few things and saw how Open Shift responded to heal the system and keep it running.  This topic can get deeper than we've experimented with here, but getting deeper into application health and recovery is an advanced topic.  If you're interested you can read more about it in the documentation [here][1], [here][2], and [here][3].


[1]: https://docs.openshift.com/enterprise/3.1/dev_guide/application_health.html
[2]: https://docs.openshift.com/enterprise/latest/dev_guide/deployments.html#scaling
[3]: http://kubernetes.io/docs/user-guide/walkthrough/k8s201/#health-checking