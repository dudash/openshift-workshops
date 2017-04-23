---
layout: lab
title: Working with Persistent Storage
subtitle:
html_title: Persistent Storage
categories: [lab, persistent, storage, developers, ops]
---

## Coming Soon...

TBD add mongodb

TBD setup authentication to the DB

> <i class="fa fa-terminal"></i> Add DB env vars to the webapp

{% highlight csh %}
$ oc env dc/mongodb --list | grep MONGODB | oc env dc/webapp -e -
{% endhighlight %}

TBD check out the webapp with DB access and interact with it
