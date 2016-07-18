---
layout: post
title: "SSH to Lab Environment"
date: "2016-03-03 14:40"
---

# Objectives
After completing this lab, you should:

- Be able to access the OpenShift lab environment you've been provisioned.

# Install a SSH and Telnet Client

Select your operating system:

- [Microsoft Windows]({{ site.url }}/downloads/putty.zip)

  After downloading the archive, unzip (extract) the `putty` SSH and telnet client from the compressed archive into a specified directory.

- Apple OS X

  The Apple Mac OS X operating system has SSH installed by default but the SSH daemon is not enabled. This means you can't login remotely or do remote copies until you enable it.

  To enable it, go to 'System Preferences'. Under 'Internet & Networking' there is a 'Sharing' icon. Run that. In the list that appears, check the 'Remote Login' option.

  This starts the SSH daemon immediately and you can remotely login using your username. The 'Sharing' window shows at the bottom the name and IP address to use. You can also find this out using 'whoami' and 'ifconfig' from the Terminal application.

- Linux (RHEL/Fedora)

  Type the following yum command to install ssh client and server:

      $ sudo yum -y install openssh-server openssh-clients

  Start and enable sshd server:

      $ sudo chkconfig sshd on
      $ sudo service sshd start

  Open port 22 for all IP address, enter:

      $ sudo /sbin/iptable -A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
      $ sudo service iptables save

# Download the Private SSH Key

- For Windows, click [here]({{ site.url }}/downloads/redhat_key_12_9_15.ppk) to download the lab environment private SSH key.

    :warning: Remove the file extension (if any).

  **[INSERT PICTURE HERE]**

- For Apple OS X / Linux, click [here]({{ site.url }}/downloads/generic_naps_private_key) to download the lab environment private SSH key.

    :warning: Remove the file extension (if any).

  ![SSH Private Key]({{ site.url }}/images/ssh-private-key-trim.png)

# Change the Private Key file permissions.

In order to SSH into the lab environment, it's important that the private key has (rw-------) file permissions. This means that the owner may read and write a file. All others have no rights. A common setting for data files that the owner wants to keep private.

To do this:

    $ chmod 600 generic_naps_private_key

  ![Change File Permissions]({{ site.url }}/images/change-file-permissions.png)

# Connecting to the OpenShift Master Lab Environment

- Microsoft

    Now that we have the private key, we can use PuTTY to connect to the lab environment. We will do this by setting up and saving a session. This way we will be able to quickly reconnect at a later time with all of our settings saved.

    Start by opening up the main PuTTY program. You can do this by double clicking on the PuTTY program, or by tapping the Windows key and typing "PuTTY".

    Inside, you'll be taken to the main session screen. The first step is to enter the `hostname` into the session page.

    **[INSERT PICTURE HERE]**

    By default, SSH happens on `port 22`, and the "SSH" connection type should be selected. These are the values we want.

    Next, we'll need to select the "Data" configuration inside the "Connection" heading in the left-hand navigation menu:

    **[INSERT PICTURE HERE]**

    Here, we will enter our server's username. For the initial setup, this should be the "root" user, which is the administrative user of your server. This is the account that has been configured with your SSH public key. Enter "root" into the "Auto-login username" prompt:

    **[INSERT PICTURE HERE]**

    Next, we'll need to click on the "SSH" category in the navigation menu:

    **[INSERT PICTURE HERE]**

    Within this category, click on the "Auth" sub-category.

    There is a field on this screen asking for the "Private key file for authentication". Click on the "Browse" button:

    **[INSERT PICTURE HERE]**

    Search for the private key file that you saved. This is the key that ends in ".ppk". Find it and select "Open" in the file window:

    **[INSERT PICTURE HERE]**

    Now, in the navigation menu, we need to return to the "Session" screen that we started at.

    This time, we need to create a name for the session that we will be saving. This can be anything, so select something that will help you remember what this is for. When you are finished, click on the "Save" button.

    **[INSERT PICTURE HERE]**

    You now have saved all of the configuration data needed to connect to your new server.

    Now that you have your session saved, you can recall these values at any time by returning to the "Session" screen, selecting the session you would like to use in the "Saved Sessions" section, and click "Load" to recall the settings.

    This will auto-fill all of the fields with the values you initially selected.

    When you are ready to actually connect to your server, on the "Sessions" screen, click the button at the bottom that says "Open" after you have loaded your session:

    **[INSERT PICTURE HERE]**

    The first time that you connect with the remote host, you will be asked to verify the identity of the remote server. This is expected the first time you connect to a new server, so you can select "Yes" to continue.

    **[INSERT PICTURE HERE]**

    Afterwards, you should immediately be logged into your new server without ever having to type in a password:

    **[INSERT PICTURE HERE]**

    If you've gotten this far, you've successfully configured SSH keys with the OpenShift lab environment! :sunglasses:

- Apple OS X

        $ cd ~/Downloads
        $ ssh -t -i generic_naps_private_key -oStrictHostKeyChecking=no generic_naps@oselab-"$guid".oslab.opentlc.com
        $ sudo ssh -t root@192.168.0.100

- Linux (RHEL/Fedora)

        $ cd ~/Downloads
        $ ssh -t -i generic_naps_private_key -oStrictHostKeyChecking=no generic_naps@oselab-"$guid".oslab.opentlc.com
        $ sudo ssh -t root@192.168.0.100
