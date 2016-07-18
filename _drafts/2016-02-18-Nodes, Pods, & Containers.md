---
layout: post
title: "Nodes, Pods, & Containers"
date: "2016-02-18 03:48"
---

# Nodes

A **node** is a worker machine in Kubernetes, previously known as Minion. A node may be a VM or physical machine, depending on the cluster.

Other machines run special coordinating software that schedule containers on the nodes. These machines are called masters. Collections of masters and nodes are known as clusters.

![Kubernetes Pod]({{ site.url }}/images/kube1-arch.png)

Each node has the services necessary to run pods and is managed by the master components. The services on a node include docker, kubelet and network proxy.

That’s the simple view. Now let me get a little more specific. Masters and nodes are defined by which software components they run.

The Master runs three main items:

- **API Server** - nearly all the components on the master and nodes accomplish their respective tasks by making API calls. These are handled by the API Server running on the master.
- **Etcd** - is a service whose job is to keep and replicate the current configuration and run state of the cluster. It is implemented as a lightweight distributed key-value store and was developed inside the CoreOS project.
- **Scheduler and Controller Manager** - These processes schedule containers (actually, pods—but more on them later) onto target nodes. They also make sure that the correct numbers of these things are running at all times.

A node usually runs three important processes:

- **Kubelet** - A special background process (daemon that runs on each node whose job is to respond to commands from the master to create, destroy, and monitor the containers on that host.
- **Proxy** - This is a simple network proxy that’s used to separate the IP address of a target container from the name of the service it provides.
- **cAdvisor** (optional) - [Container Advisor (cAdvisor)](http://bit.ly/1izYGLi) is a special daemon that collects, aggregates, processes, and exports information about running containers. This information includes information about resource isolation, historical usage, and key network statistics.

![Kubernetes Pod]({{ site.url }}/images/kube2-arch.png)

These various parts can be distributed across different machines for scale or all run on the same host for simplicity. The key difference between a master and a node comes down to who’s running which set of processes.

# Pods

A **pod** is a collection of containers and volumes that are bundled and scheduled together because they share a common resource—usually a filesystem or IP address.

![Kubernetes Pod]({{ site.url }}/images/kube-pod.png)

In the standard Docker configuration, each container gets its own IP address. Kubernetes simplifies this scheme by assigning a shared IP address to the pod. The containers in the pod all share the same address and communicate with one another via localhost.

In this way, you can think of a pod a little like a VM because it basically emulates a logical host to the containers in it.

# Linux Containers

A **container** is a software packaging approach that typically includes an application and all of its runtime dependencies.

- Isolates applications on a
shared host operating system.
- Easy to deploy and portable
across host systems
- In RHEL, this is done through:
  - Control Groups (cgroups)
  - Kernel namespaces
  - SELinux


  ![Linux Containers Architecture]({{ site.url }}/images/lxc1-arch.png)

# Docker

[Docker](https://www.docker.com/) is a utility to pack, ship and run any application as a lightweight container.

Docker provides an easy CLI and API to create and mange containers. Instead of manually issuing dozens of complicated  system and service manager commands for Linux to configure namespaces, cgroups, SELinux, and capabilities, Docker does this with a single easy-to-use command.

Besides creating and managing containers, Docker also provides a standard container image format, which is actually a tar file containing the entire container file system with all libraries, commands, and working directories used by the application plus the metadata describing describing the image itself.
