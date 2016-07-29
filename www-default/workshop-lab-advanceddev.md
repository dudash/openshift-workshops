---
layout: lab
title: Advanced Development in OSE
subtitle: Here are some advanced tips
html_title: App Development
categories: [lab, developers]
---

# Advanced developer tips
Coming Soon...

oc port-forward
oc rysnc
oc exec

# Copy files to a container
Please take note that storage for a running container is ephemeral so any changes made to its file system that aren't mapped to a persistent volume will be lost when the container is restarted.  With that being said, sometimes in testing it's useful to move some files into the container.  Here's how:

TBD...

# Summary 
TBD

[1]: https://docs.openshift.com/enterprise/latest/dev_guide/port_forwarding.html
[2]: https://docs.openshift.com/enterprise/latest/dev_guide/copy_files_to_container.html