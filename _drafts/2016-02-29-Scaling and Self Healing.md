---
layout: post
title: "Scaling and Self Healing"
date: "2016-02-29 13:18"
---

# Objectives
After completing this lab, you should:

- Understand deployment configurations and replication controllers.
- Scale an application via command line, as well as, in the web console.
- Attest to OpenShift's ability to "self-heal".

# Deployment Configs and Replication Controllers

While Services provide routing and load balancing for Pods, which may go in and out of existence, ReplicationControllers (RC) are used to specify and then ensure the desired number of Pods (replicas) are in existence. For example, if you always want your application server to be scaled to 3 Pods (instances), a ReplicationController is needed. Without an RC, any Pods that are killed or somehow die are not automatically restarted, either. ReplicationControllers are how OpenShift "self heals".

A DeploymentConfiguration (DC) defines how something in OpenShift should be deployed. From the [deployments documentation](https://docs.openshift.com/enterprise/3.1/architecture/core_concepts/deployments.html#deployments-and-deployment-configurations):

        Building on replication controllers, OpenShift adds expanded support for the
        software development and deployment lifecycle with the concept of deployments.
        In the simplest case, a deployment just creates a new replication controller and
        lets it start up pods. However, OpenShift deployments also provide the ability
        to transition from an existing deployment of an image to a new one and also
        define hooks to be run before or after creating the replication controller.

In almost all cases, you will end up using the Pod, Service, ReplicationController and DeploymentConfiguration resources together. And, in almost all of those cases, OpenShift will create all of them for you.

There are some edge cases where you might want some Pods and an RC without a DC or a Service, and others, so feel free to ask us about them after the labs.

# Scaling Up :arrow_up:

Now that we know what a ReplicatonController and DeploymentConfig are, we can start to explore scaling in OpenShift 3. Take a look at the ReplicationController (RC) that was created for you when you told OpenShift to stand up the `hexboard` image:

    $ oc get rc

![OC Get RC]({{ site.url }}/images/oc-get-rc.png)

Get more detail about the RCs, by issuing the following commands:

    # Hexboard RC
    $ oc get rc hexboard-1 -o json

![OC Get RC Hexboard]({{ site.url }}/images/oc-get-rc-json-hexboard.png)

    # Sketchpod RC
    $ oc get rc sketchpod-1 -o json

![OC Get RC Sketchpod]({{ site.url }}/images/oc-get-rc-json-sketchpod.png)

For example, if you just want to see how many replicas are defined for the `hexboard` image, you can enter in the following command:

    $ oc get rc hexboard-1 -o json | grep -B1 -E "replicas" | grep -v Docker

![OC RC Hexboard Grep Docker]({{ site.url }}/images/oc-get-rc-hexboard-grep-docker.png)

    $ oc get rc sketchpod-1 -o json | grep -B1 -E "replicas" | grep -v Docker

![OC RC Sketchpod Grep Docker]({{ site.url }}/images/oc-get-rc-sketchpod-grep-docker.png)

:information_source: The above command uses the `grep` utility which may not be available on your operating system.

This lets us know that, right now, we expect one Pod to be deployed (spec), and we have one Pod actually deployed (status). By changing the spec, we can tell OpenShift that we desire a different number of Pods.

Ultimately, OpenShift 3's autoscaling capability will involve monitoring the status of an "application" and then manipulating the RCs accordingly.

You can learn more about the tech-preview CPU-based Horizontal Pod Autoscaler by clicking [here](https://docs.openshift.com/enterprise/3.1/dev_guide/pod_autoscaling.html).

Let's scale our `sketchpod` application up to three instances. We can do this with the `scale` command.

$ oc scale --replicas=3 rc hexboard-1

![OC Scale Hexboard]({{ site.url }}/images/oc-scale-hexboard.png)

    $ oc scale --replicas=3 rc sketchpod-1

![OC Scale Sketchpod]({{ site.url }}/images/oc-scale-sketchpod.png)

:information_source: You could also do this by clicking the "up" arrow next to the Pod in the OpenShift web console.

To verify that we changed the number of replicas by modifying the RC object, issue the following command:

    $ oc get rc

![OC Get RC Post Scale]({{ site.url }}/images/oc-get-rc-post-scale.png)

You can see that we now have 3 replicas. Let's verify that with the oc get pods command:

    $ oc get pods

![OC Get Pods Post Scale]({{ site.url }}/images/oc-get-pods-post-scale.png)

And lastly, let's verify that the Service that we learned about in the previous lab accurately reflects three endpoints:

    $ oc describe service hexboard

![OC Describe Service Hexboard]({{ site.url }}/images/oc-describe-service-hexboard.png)

    $ oc describe service sketchpod

![OC Describe Service Sketchpod]({{ site.url }}/images/oc-describe-service-sketchpod.png)

That's how simple it is to scale up Pods in a Service. Application scaling can happen extremely quickly because OpenShift is just launching new instances of an existing Docker image that is already cached on the node.

Verify that all three pods are running as expected via the Web Console:

![Heboard Project Scaling]({{ site.url }}/images/ose-hexboard-project-scaling.png)

# Self Healing

Because OpenShift's RCs are constantly monitoring to see that the desired number of Pods actually is running, you might also expect that OpenShift will "fix" the situation if it is ever not right. You would be correct!

Since we have three Pods running right now, let's see what happens if we "accidentally" kill one. Run the `oc get pods` command again, and choose a pod to kill. :smirk_cat:

    $ oc delete pod hexboard-1-1439h

Then, as fast as you can, do the following:

    $ oc get pods

Did you notice anything different? The names of the Pods are slightly changed. That's because OpenShift almost immediately detected that the current state (2 Pods) didn't match the desired state (3 Pods), and it fixed it by scheduling another pod.

Additionally, OpenShift provides rudimentary capabilities around checking the liveness and/or readiness of application instances. If OpenShift decided that our guestbook application instance wasn't alive, it would kill or the instance and then start another one, always ensuring that the desired number of replicas was in place.

More information on liveness and readiness is available in the [Application Health](https://docs.openshift.com/enterprise/3.1/dev_guide/application_health.html) section of the documentation.
