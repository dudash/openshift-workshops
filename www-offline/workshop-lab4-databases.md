---
layout: lab
title: Databases
subtitle: Put your database in to openshift
html_title: Databases
categories: [lab, databases, developers]
---

## Databases
We can easily add a database pod into OpenShift wrapped in a service for other pods to access. Open Shift has supported templates to run containerized MySQL, MongoDB, and Postgres databases.  Let's try that now.

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
{% highlight csh %}
$ oc new-app --template=mongodb-ephemeral
{% endhighlight %}

You should see an output similar to:
{% highlight csh %}
--> Deploying template mongodb-ephemeral in project openshift for "mongodb-ephemeral"
     With parameters:
      DATABASE_SERVICE_NAME=mongodb
      MONGODB_USER=userIHJ # generated
      MONGODB_PASSWORD=fCYLwSE3slxCqe0o # generated
      MONGODB_DATABASE=sampledb
      MONGODB_ADMIN_PASSWORD=CnbOj21pLKrjqBWP # generated
--> Creating resources ...
    Service "mongodb" created
    DeploymentConfig "mongodb" created
--> Success
    Run 'oc status' to view your app.
{% endhighlight %}

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
Click "Add to Project"
</blockquote>
<p><img alt="OpenShift Add to Project" src="{{ site.baseurl }}/images/oseoffline-lab-s2i-addbutton.png" width="100"/></p>

<blockquote>
Click "Browse" and filter for database, then click the mongodb-ephemeral builder image
</blockquote>
<p><img alt="OpenShift Add MongoDB" src="{{ site.baseurl }}/images/oseoffline-lab-database-filterdatabase.png" width="600"/></p>

We will accept the default values here.  So just:
<blockquote>
Scroll to the bottom and click "Create"
</blockquote>

Open Shift will display a next steps page with details about what happened and what you can do next.  Read that, then:
<blockquote>
Click "Go to overview"
</blockquote>

      </div>
    </div>
  </div>
</div>

## Summary
Now you have a runnning database generated from a supported Open Shift template using generated passwords and other env variables.  We are using ephemeral databases in this lab, but you can also do persistent storage.  However, we will save that topic for your [homework][2] or the topic of an advanced lab.

[1]: https://docs.openshift.com/enterprise/3.1/using_images/db_images/index.html
[2]: https://docs.openshift.com/enterprise/3.1/dev_guide/persistent_volumes.html
