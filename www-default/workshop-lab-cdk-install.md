---
layout: lab
title: CDK (Container Development Kit) Install
subtitle: Want to run all of this locally?
html_title: CDK install
categories: [developers, developers]
---

## What is the CDK?
Red Hat Container Development Kit provides a pre-built Container Development Environment based on Red Hat Enterprise Linux to help you get started developing container-based applications quickly. Everything you need to run a local OpenShift instance is self contained within a VM instance that you can use on your own machine and take with you after you leave the workshop. 

## How does the CDK work?
The CDK is simply a pre-configured VM containing an all-in-one OpenShift environment. The CDK VM does require a Hypervisor to run, so you will have to install one of the supported hypervisor, but the VM's intallation and lifecycle is managed via Vagrant. If you don't know a lot about Vagrant, don't worry: You only use it to initiate/shut down the environment on your laptop. No previous experience is required.

## Things that you will have to do (we'll tell you how)
  * Register for a [Red Hat Developers][1] account (you can link it to any of your social sites).
  * Install a Virtualization platform (Hypervisor)
  * Install Vagrant
  * Download Container Development Environment
  * Install the Container Development Kit

## Specific Operating System Install/Setup Steps
  
### For Windows
[Windows Installation Steps][2]

NOTE:The Windows CDK installer will handle the installation of all the compontents you need. You will just need to register for a [Red Hat Developers][1] account to download the installer.

### For Mac/Linux
[Mac/Linux Installation Steps][3]

## Start the CDK
Follow the directions under [here][4] to start the Virtual instance with Vagrant.
	By default, you should be able to then browse to [console][5] in the browser and see the OpenShift console login page. You can use the credentials provided in the Vagrant output.

[1]: https://developers.redhat.com
[2]: http://developers.redhat.com/products/cdk/get-started/#tab-windowsTab
[3]: http://developers.redhat.com/products/cdk/get-started/#tab-macLinux
[4]: http://developers.redhat.com/products/cdk/get-started-cdk2-nodejs/#Step1
[5]: https://10.1.2.2:8443/console