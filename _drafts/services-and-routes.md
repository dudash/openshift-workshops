---
layout: post
title: "Expose a Service Outwardly"
date: "2016-02-29 13:17"
---

# Objectives
After completing this lab, you should be able to:

- Understand Services and Routes.
- Expose a Service to be externally-reachable.

# Services

A Kubernetes **service** serves as an internal load balancer. It identifies a set of replicated pods in order to proxy the connections it receives to them. Backing pods can be added to or removed from a service arbitrarily while the service remains consistently available, enabling anything that depends on the service to refer to it at a consistent internal address.

Services are assigned an IP address and port pair that, when accessed, proxy to an appropriate backing pod. A service uses a label selector to find all the containers running that provide a certain network service on a certain port.

A service is a process that:

1. Is designed to do a small number of things (often just one).
2. Has no user interface and is invoked solely via some kind of API.

:information_source: A Kubernetes cluster does not manage a fleet of applications. It manages a cluster of services. You might run an application (often your web browser) that communicates with these services, but the two concepts should not be confused.

#### Inspecting Services

You may be wondering how you can access the application you created when you deployed your first Docker Image/Container to OpenShift.

There was a *service* that was created, but services are only used inside OpenShift. As in, they are not exposed to the outside world by default.

This is viewable after running the `new-app` command, where OpenShift creates several resources behind the scenes in order to handle deploying this Docker Image/Container.

The `new-app` command creates a Service, which maps to a set of Pods (via Labels and Selectors). Services are assigned an IP address and port pair that, when accessed, balance across the appropriate back end (Pods).

Services provide a convenient abstraction layer inside OpenShift to find a group of like Pods. They also act as an internal proxy/load balancer between those Pods and anything else that needs to access them from inside the OpenShift environment.

For example, if you needed more Guestbook servers to handle the load, you could spin up more Pods. OpenShift automatically maps them as endpoints to the Service, and the incoming requests would not notice anything different except that the Service was now doing a better job handling the requests.

There is a lot more information about [Services](https://docs.openshift.com/enterprise/3.1/architecture/core_concepts/pods_and_services.html#services), including the YAML format to make one by hand, in the official documentation.

Now that we understand the basics of what a Service is, let's take a look at the Service that was created for the kubernetes/guestbook image that we just deployed. In order to view the Services defined in your Project, enter in the following command:

    $ oc get services

![OC Get Services Command]({{ site.url }}/images/2016/02/oc-get-services.png)

In the above output, we can see that we have a Service named `guestbook` with an IP/Port combination of 172.30.208.199/3000. Your IP address may be different, as each Service receives a unique IP address upon creation. Service IPs never change for the life of the Service.

You can also get more detailed information about a Service by using the following command to display the data in JSON:

    $ oc get service guestbook -o json

![OC Get Service JSON Command]({{ site.url }}/images/2016/02/oc-get-service-json.png)

:eyes: Take note of the selector stanza...

![OC Get Service JSON Selector Stanza]({{ site.url }}/images/2016/02/selector-stanza.png)

It is also of interest to view the JSON of the Pod to understand how OpenShift wires components together. For example, run the following command to get the name of your `guestbook` Pod:

    $ oc get pods

![OC Get Pods Command]({{ site.url }}/images/2016/02/oc-get-pods-guestbook.png)

Now you can view the detailed data for your Pod with the following command:

    $ oc get pod guestbook-1-dtv0m -o json

Under the `metadata` section you should see the following:

![OC Get Pod JSON Command]({{ site.url }}/images/2016/02/oc-get-pod-json-guestbook.png)

The service selector stanza refers to `app=guestbook` and `deploymentconfig=guestbook` and the pod has multiple labels with the same key/value pairs.

Meaning, labels are just key/value pairs. Any Pod in this Project that has a label that matches the selector will be associated with the service. To see this in action, try it out.

    $ oc describe service guestbook

![OC Describe Service Command]({{ site.url }}/images/2016/02/oc-describe-service-guestbook.png)

You may be wondering why only one end point is listed. That is because there is only one `guestbook` pod running. Soon, we will learn how to scale an application, at which point you will be able to see multiple endpoints associated with the `guestbook` service.

# Routes

An OpenShift **route** is a way to expose a service by giving it an externally-reachable hostname like [www.example.com](http://example.com/).

A defined route and the endpoints identified by its service can be consumed by a router to provide named connectivity that allows external clients to reach your applications. Each route consists of a route name, service selector, and (optionally) security configuration.

By default, the `new-app` command does not expose the *service* it creates to the outside world. If you want to expose a service as an HTTP endpoint you can easily do this with a *route*.

The OpenShift *router* uses the HTTP header of the incoming request to determine where to proxy the incoming request. You can optionally define security, such as TLS, for the route. If you want your services (and, by extension, your pods) to be accessible to the outside world, you need to create a route.

The following is an example of this architectural flow using an HAProxy router:

![OpenShift HAProxy Router]({{ site.url }}/images/2016/02/ose-haproxy-router.png)

#### Creating a Route

Fortunately, creating a Route is a pretty straight-forward process. You simply expose the Service. First we want to verify that we don't already have any existing routes:

Now we need to get the Service name to expose:

    $ oc get routes
      <no output>

![OC Get Routes Command]({{ site.url }}/images/2016/02/oc-get-routes.png)

Now we need to get the Service name to expose:

    $ oc get services

![OC Get Services Guestbook Command]({{ site.url }}/images/2016/02/oc-get-services-guestbook.png)

Once we know the Service name, creating a Route is a simple one-command task:

    $ oc expose service guestbook

![OC Expose Service Guestbook Command]({{ site.url }}/images/2016/02/oc-expose-service-guestbook.png)

Verify the Route was created with the following command:

    $ oc get routes

![OC Get Routes Command]({{ site.url }}/images/2016/02/oc-get-routes-guestbook.png)

You can also verify the Route by looking at the project in the OpenShift web console:

![OpenShift Guestbook Route]({{ site.url }}/images/2016/02/ose-guestbook-project-route.png)

:snowboarder: Pretty nifty, huh? This `guestbook` application is now available at the above URL:

![OpenShift Guestbook Application]({{ site.url }}/images/2016/02/ose-guestbook-project-app.png)
