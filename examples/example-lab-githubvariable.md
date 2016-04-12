---
layout: lab
labNumber: 1005
title: An example of variables
subtitle: hope this helps
html_title: Example
category: lab

# here is the variable I set
repoPath: dudash/openshift-workshops.git

---

### Example Page Variables Github Path

Clone my awesome repo with:

> git clone https://github.com/{{ page.repoPath }}


### Example Site Variable

Workshop language is set to (via file in _data/code-config.yml):

> {{site.data.code-config.workshop-language}}


### Learn

[Read more about variables here][1]
[Read more about data files here][3]
[And see a complex use case here][2]

[1]: https://jekyllrb.com/docs/variables/
[2]: http://stackoverflow.com/questions/14487110/include-jekyll-liquid-template-data-in-a-yaml-variable
[3]: https://jekyllrb.com/docs/datafiles/