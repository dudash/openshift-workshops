---
layout: post
title: "Install the OpenShift CLI"
date: '2016-02-17 16:41'
---

# Objectives
After completing this lab, you should:

- Have a general understanding of the tooling used by OpenShift for managing applications.
- Know how to install the OpenShift CLI across multiple platforms.
- Be able to login to the OpenShift Enterprise (OSE) 3.1 environment for this lab.

# Overview
With the OpenShift command line interface (CLI), you can create applications and manage OpenShift projects from a terminal. The CLI is ideal in situations where you are:

- Working directly with project source code.
- Scripting OpenShift operations.
- Restricted by bandwidth resources and cannot use the web console.

:information_source: The `oc` command line tool is used to interact with the [OpenShift](http://openshift.github.io) and [Kubernetes](http://kubernetes.io/) HTTP API(s). `oc` is an alias for `openshift cli`.

# Install the OpenShift CLI
You can download and unpack the CLI from the [Releases page](https://github.com/openshift/origin/releases) of the OpenShift Origin source repository on GitHub.

Or, select your operating system:

- [Microsoft Windows]({{ site.url }}/downloads/oc-3.1.1.6-windows.zip)

  After downloading the archive, unzip (extract) the `oc` command line tool from the compressed archive into a specified directory.

    ![Windows Unzip]({{ site.url }}/images/oc-windows.png)

  Open the Command Prompt window by clicking the Start button Picture of the **Start** button ![Windows Start]({{ site.url }}/images/windows-start.png), clicking **All Programs**, clicking **Accessories**, and then clicking **Command Prompt**.

  :page_facing_up: Here's another way to open a Command Prompt window: Click the Start button Picture of the **Start** button ![Windows Start]({{ site.url }}/images/windows-start.png). In the **Search** box, type **Command Prompt**, and then, in the list of results, double-click **Command Prompt**.

  Then update your PATH (environment variable).

      > set PATH=%PATH%;C:\your\path\here

  :information_source: This creates a temporary environment variable that expires after closing the Command Prompt.

  Or, create a file called *oc.bat* in a directory that's included in the PATH system environment variable (eg. C:\WINDOWS).

      > echo @echo off > C:\WINDOWS\oc.bat & echo "C:\your\path\here\oc.exe"  %* >> C:\WINDOWS\oc.bat

  :warning: This creates a permanent environment variable, but requires administrative privileges.

- [Apple OS X]({{ site.url }}/downloads/oc-3.1.1.6-macosx.tar.gz)

  After downloading the archive, unzip (extract) the `oc` command line tool from the compressed archive into a specified directory.

      $ cd ~/Downloads
      $ tar -zxvf oc-3.1.1.6-macosx.tar.gz -C /your/path/here

  Then update your PATH (environment variable).

      $ export PATH=/your/path/here:$PATH

  Or, use [Homebrew](http://brew.sh/):

  :warning: This is **NOT** an official package and please take full responsibility for your actions.

  Update the formulae and Homebrew itself.

      $ brew update

  Install the OpenShift CLI packages.

      $ brew install openshift-cli

  Upgrade everything (optional)

      $ brew upgrade

- [Linux (RHEL/Fedora)]({{ site.url }}/downloads/oc-3.1.1.6-linux.tar.gz)

  After downloading the archive, unzip (extract) the `oc` command line tool from the compressed archive into a specified directory.

      $ cd ~/Downloads
      $ tar -zxvf oc-3.1.1.6-linux.tar.gz -C /your/path/here

  Then update your PATH (environment variable).

      $ export PATH=/your/path/here:$PATH

# Verify the Installation

At this point, we should have the OpenShift CLI available for use. Let's test this out by printing the version of the `oc` command:

    $ oc version

You should see something similar to the following:

    oc v3.1.0.4-16-g112fcc4
    kubernetes v1.1.0-origin-1107-g4c8e6f4

:raising_hand: If you get an error message, you have not updated your path correctly. If you need help, raise your hand and the instructor will assist.

# Investigate the Client Commands

Take a look at the list of available commands by asking `oc` for help in order to find out more information about a particular option/directive.

    $ oc help

Also, a good reference document for the OpenShift CLI options and their descriptive behavior(s) can be found by clicking [here](https://github.com/openshift/origin/blob/master/docs/cli.md#openshift-command-line-interface).

# Validate OpenShift Credentials

In order to login, we will use the `oc` command and then specify the server that we want to authenticate to by issuing the following command:

    $ oc login master00-GUID.oslab.opentlc.com:8443  --insecure-skip-tls-verify=true

:information_source: Ensure that you replace GUID with the correct guid for your instance. This information was provided to you by the instructor of this workshop.

After entering in the above command, you may be prompted to accept the security certificate that's similar to the following output:

    The server uses a certificate signed by an unknown authority.
    You can bypass the certificate check, but any data you send to the server could be intercepted by others.
    Use insecure connections? (y/n):

Enter 'y' to use a potentially insecure connection.

:information_source: The reason you received this message is because we are using a self-signed certificate for this workshop, but we did not provide you with the CA certificate that was generated by OpenShift. In a real-world scenario, either OpenShift's certificate would be signed by a standard CA (eg: Thawte, Verisign, StartSSL, etc.) or signed by a corporate-standard CA that you already have installed on your system.

Once you issue the oc login command, you will be prompted for the username and password combination for your user account.

    Username: student
    Password: redhat

After logging in, you should see something similar to the following confirmation message:

    Login successful.
    You have access to the following projects and can switch between them with 'oc project <projectname>':

    * default
    * hello-openshift
    * hello-openshift-demo
      etc...

Congratulations, you are now authenticated to the OpenShift server for this lab! :beers:

The OpenShift master includes a built-in OAuth server. Developers and administrators obtain OAuth access tokens to authenticate themselves to the API. By default your authorization token will last for 24 hours.

For more information about the login command and its configuration click [here](https://docs.openshift.com/enterprise/3.1/cli_reference/get_started_cli.html#basic-setup-and-login).
