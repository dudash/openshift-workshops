# Developers README
## Info
This is a [jekyll][1] based website.  It lives along side the code base in a branch called gh-pages.  Don't merge this branch with the code.  You can access the released version of this website at: http://dudash.github.io/openshift-workshops/

[READ THIS BEFORE CONTRIBUTING][3].

## Getting Setup
Do this first:

> gem install jekyll

> git clone -b gh-pages https://github.com/dudash/openshift-workshops.git

### How to Test Local on a Mac
> jekyll serve --baseurl ''

> open http://127.0.0.1:4000/

### How to Test Local on Linux
> jekyll serve --baseurl ''

In your preferred webbrowser open http://127.0.0.1:4000/

## Releasing
### Choose your set of labs
First update the index.html to point to the correct directory for the labs you want
Second update the _config.yml to set the workshop-dir to that directory as well
In the future I'd like to set these as environment variables somehow that can be passed in on startup

### How to Release on the Internet
For now this is simply: commit your local changes to this branch and 'git push' to github.  In the future when we move away from GitHub pages, this will be slightly more complex.

### How to Release to a Bootable USB Based Workshop
The steps are:
* Buid the site with 'jekyll build'
* Copy the generated _site folder onto your USB media
* Make a desktop shortcut on the USB OS Desktop to the location where you copied the _site folder


## Development Caveats
### Plugin Support
GitHub Pages is powered by Jekyll. However, all Pages sites are generated using the --safe option to disable custom plugins for security reasons. Unfortunately, this means our plugins won’t work when deploying to GitHub Pages.

We can still use GitHub Pages to publish the site, but we need to convert the site locally and push the generated static files to your GitHub repository instead of the Jekyll source files.  Support for this is a planned future enhancement - once the core content of the site is stable.

When we publish to another host, this shouldn't be an issue.

### Configuring Example Code
The _data/code-config.yml file should be setup to select the proper github code and examples to populate the labs.  Please add variables there (and use in your lab.md files) as needed to ensure changing the "workshop-language" changes the lab code.


[1]: http://jekyllrb.com/
[2]: https://jekyllrb.com/docs/plugins/
[3]: https://jekyllrb.com/docs/structure/
