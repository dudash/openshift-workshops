---
layout: post
title: "Introducing Kubernetes"
date: "2016-02-18 02:48"
---

# Introducing Kubernetes

Pretty early on, engineers working at companies with similar scaling problems started playing around with smaller units of deployment using [cgroups](https://en.wikipedia.org/wiki/Cgroups) and kernel [namespaces](https://en.wikipedia.org/wiki/Cgroups#NAMESPACE-ISOLATION) to create process separation. The net result of these efforts over time became what we commonly refer to as [containers](https://en.wikipedia.org/wiki/Operating-system-level_virtualization).

Google necessarily had to create a lot of orchestration and scheduling software to handle isolation, load balancing, and placement. That system is called [Borg](https://research.google.com/pubs/pub43438.html), and it schedules and launches approximately 7,000 containers a **second** on any given day.

With the initial release of Docker in March of 2013, Google decided it was finally time to take the most useful (and externalizable) bits of the Borg cluster management system, package them up and publish them via Open Source. [Kubernetes](http://kubernetes.io/) was born. (You can browse the source code [here](https://github.com/kubernetes/kubernetes).)

Kubernetes is an open source orchestration system for [Docker](https://www.docker.com/) and [Rocket](https://coreos.com/blog/rocket/) containers. Kubernetes provides mechanisms for managing containerized application deployment, scheduling, updating, maintenance, and scaling across clusters of hosts.

The project was started by Google in 2014 and the name Kubernetes originates from Greek, meaning "helmsman" or "pilot", and is the root of "governor" and "[cybernetic](http://www.etymonline.com/index.php?term=cybernetics)". K8s is an abbreviation derived by replacing the 8 letters "ubernete" with 8.

:information_source: Check out "[Kubernetes: Scheduling the Future at Cloud Scale]({{ site.url }}/downloads/k8s-ebook.zip)" by Dave Rensin, Director of Global Cloud Support and Services at Google for a deeper architectural understanding.

# What can Kubernetes do?

Kubernetes can schedule and run application containers on clusters of physical or virtual machines.

It can also do much more than that.

Kubernetes satisfies a number of common needs of applications running in production, such as:

- co-locating helper processes
- mounting storage systems
- distributing secrets
- application health checking
- replicating application instances
- horizontal auto-scaling
- load balancing & rolling updates
- resource monitoring

For more details, see the [user guide](http://kubernetes.io/v1.1/docs/user-guide/).

# Kubernetes is not:

Kubernetes is not a PaaS (Platform as a Service).

- Kubernetes does not limit the types of applications supported. It does not dictate application frameworks, restrict the set of supported language runtimes, nor cater to only 12-factor applications. Kubernetes aims to support an extremely diverse variety of workloads: if an application can run in a container, it should run great on Kubernetes.

- Kubernetes is unopinionated in the source-to-image space. It does not build your application. Continuous Integration (CI) workflow is an area where different users and projects have their own requirements and preferences, so we support layering CI workflows on Kubernetes but don't dictate how it should work.

- On the other hand, a number of PaaS systems run on Kubernetes, such as Openshift and Deis. You could also roll your own custom PaaS, integrate with a CI system of your choice, or get along just fine with just Kubernetes: bring your container images and deploy them on Kubernetes.

- Since Kubernetes operates at the application level rather than at just the hardware level, it provides some generally applicable features common to PaaS offerings, such as deployment, scaling, load balancing, logging, monitoring, etc. However, Kubernetes is not monolithic, and these default solutions are optional and pluggable.

Kubernetes is not a mere "orchestration system"; it eliminates the need for orchestration:

- The technical definition of "orchestration" is execution of a defined workflow: do A, then B, then C. In contrast, Kubernetes is comprised of a set of control processes that continuously drive current state towards the provided desired state. It shouldn't matter how you get from A to C: make it so. This results in a system that is easier to use and more powerful, robust, and resilient.
