---
layout: post
title: "Setup Workshop Content"
date: "2016-03-01 20:35"
---

# Objectives
After completing this lab, you should:

- Setup Jekyll a simple, blog-aware, static site generator using RHEL 7.2 (Maipo).
- Be able to create and host a static content website.
- Gain insight into how to manually create a Git webhook.
- Understand how to redirect http to https.

# Prerequisites

Installing Jekyll is easy and straight-forward, but there are a few requirements you’ll need to make sure your system has before you start.

- [Ruby](https://www.ruby-lang.org/en/downloads/) (including development headers, v1.9.3 or above for Jekyll 2 and v2 or above for Jekyll 3)

      $ sudo yum -y install ruby

- [RubyGems](https://rubygems.org/pages/download)

      $ sudo yum -y install gcc mysql-devel ruby-devel zlib-devel rubygems

- Linux, Unix, or Mac OS X
- [NodeJS](https://nodejs.org/en/), or another JavaScript runtime (Jekyll 2 and earlier, for CoffeeScript support).

      $ sudo yum -y install nodejs

  Install build tools to compile and install native addons from npm (optional):

      $ sudo yum -y groupinstall 'Development Tools'

- Python 2.7 (for Jekyll 2 and earlier)

      $ sudo yum -y install python

- Appache HTTP Server

      $ sudo yum -y install httpd

- Git Version Control System

      $ sudo yum -y install git

- Command-Line Copy&Paste

      $ sudo yum -y install xclip

# Installation

1. Update all of your RubyGems at once.

      $ sudo gem install rubygems-update
      $ sudo gem update --system
      $ sudo gem update `gem list | cut -d ' ' -f 1`

  :heavy_exclamation_mark: Keep running this command repeatedly until you see the following output:

        $ sudo gem update `gem list | cut -d ' ' -f 1`
        Updating installed gems
        Nothing to update

2. Install Jekyll with RubyGems

    The best way to install Jekyll is via RubyGems. At the terminal prompt, simply run the following command to install Jekyll:

        $ sudo gem install jekyll

    All of Jekyll’s gem dependencies are automatically installed by the above command, so you won’t have to worry about them at all. If you have problems installing Jekyll, check out the [troubleshooting](http://jekyllrb.com/docs/troubleshooting/) page or [report an issue](https://github.com/jekyll/jekyll/issues/new) so the Jekyll community can improve the experience for everyone.

3. Remove outdated versions of gems that are installed, leaving the new updated version installed.

        $ sudo gem clean

4. Verify Installation.

        $ jekyll -v
        jekyll 3.1.2

5. Install Bundler with RubyGems.

        $ sudo gem install bundler

# Git Post-receive Web Hook

To have a remote server handle the deploy for you every time you push changes using Git, you can create a user account which has all the public keys that are authorized to deploy in its `authorized_keys` file.

1. Install your public key in the remote machine's authorized_keys.

        $ cat ~/.ssh/id_rsa.pub | ssh user@host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

2. Set up the post-receive hook:

        # Login to the remote host
        $ ssh user@host

        # Create Git working directory
        $ mkdir myrepo.git
        $ cd myrepo.git

        # Initialize the a repository
        remote$ git --bare init

        # Create the post-receive hook
        $ touch hooks/post-receive

        # Create the target build directory
        $ mkdir /var/www/myrepo

3. Update the recently created post-receive webhook

        sudo vi ~/myrepo.git/hooks/post-receive

    And, add the following lines:

        GIT_REPO=$HOME/myrepo.git
        TMP_GIT_CLONE=$HOME/tmp/myrepo
        PUBLIC_WWW=/var/www/myrepo

        git clone $GIT_REPO $TMP_GIT_CLONE
        jekyll build -s $TMP_GIT_CLONE -d $PUBLIC_WWW
        rm -Rf $TMP_GIT_CLONE
        exit

:warning: Make sure Jekyll is installed on the remote system before proceeding any further.

# Setup Development Environment (local)

1. Download from the OpenShift Workshop from GitHub.

        # Clone the repo
        $ sudo git clone https://github.com/<forkid>/ose-workshop.git
        $ cd ose-workshop
        $ git remote add upstream https://github.com/ecwpz91/ose-workshop.git

        # Install all of the required gems (local deployment)
        $ bundle install

        # Test out the build
        $ jekyll s

2. Open a browser and navigate to http://127.0.0.1:4000/ to see the static website content locally.

        ![OpenShift Workshop Home Page]({{ site.url }}/images/ose-workshop-home.png)

3. If you configured the Git post-recieve webhook, then execute the following:

        $ git remote add deploy user@host:~/myrepo.git

    Deploying is now as easy as telling nginx or Apache to look at /var/www/myrepo and running the following:

        $ git push deploy master

# Redirect HTTP to HTTPS using Apache HTTP Server

If you haven't already done so already, install the Appache HTTP Server (see prerequisites above).

1. Update the Apache HTTP Server welcome configuration file.

        $ cd /etc/httpd/conf.d/

        # Backup the original configuration file.
        $ cp welcome.conf welcome.conf.bak

        # Comment out everything.
        $ sudo vi welcome.conf

    The result should be as follows:

        # This configuration file enables the default "Welcome" page if there
        # is no default index page present for the root URL.  To disable the
        # Welcome page, comment out all the lines below.
        #
        # NOTE: if this file is removed, it will be restored on upgrades.
        #
        #<LocationMatch "^/+$">
        #    Options -Indexes
        #    ErrorDocument 403 /.noindex.html
        #</LocationMatch>
        #
        #<Directory /usr/share/httpd/noindex>
        #   AllowOverride None
        #   Require all granted
        #</Directory>
        #
        #Alias /.noindex.html /usr/share/httpd/noindex/index.html

2.  For an SSL encrypted web server, install OpenSSL and mod_ssl (Apache's interface to OpenSSL).

        $ sudo yum -y install mod_ssl openssl

        # Generate private key
        $ pushd /tmp
        $ sudo openssl genrsa -out ca.key 2048

        # Generate CSR
        $ sudo openssl req -new -key ca.key -out ca.csr

        # Check CSR (http://symc.ly/1Orp4s8)
        $ sudo xclip -sel clip < ./ca.csr

        # Generate Self Signed Key
        $ sudo openssl x509 -req -days 365 -in ca.csr -signkey ca.key -out ca.crt

        # Copy the files to the correct locations
        $ sudo cp ca.crt /etc/pki/tls/certs
        $ sudo cp ca.key /etc/pki/tls/private/ca.key
        $ sudo cp ca.csr /etc/pki/tls/private/ca.csr
        $ popd

3. Modify Apache HTTP Server to redirect http to https.

        $ cd /etc/httpd/conf.d

        # Backup the original configuration file.
        $ sudo cp ssl.conf ssl.conf.bak

        # Add http redirect directive.
        $ sudo vi ssl.conf

    To redirect http URLs to https and update the SSL certificate file directives (optional), do the following:

        <VirtualHost \*:80>
          ServerName www.example.com
          Redirect "/" "https://example.com:443/"
        </VirtualHost>

        <VirtualHost \*:443>
          ServerName www.example.com:443
          # ... SSL configuration goes here
          SSLCertificateFile /etc/pki/tls/certs/ca.crt

          SSLCertificateKeyFile /etc/pki/tls/private/ca.key
        </VirtualHost>

4. Restart the Apache HTTP Server.

        $ sudo systemctl restart httpd
