# Developers README
## Info
This is a [jekyll][1] based website.  It lives along side the code base in a branch called gh-pages.  Don't merge this branch with the code.  You can access the released version of this website at: http://dudash.github.io/openshift-workshops/

[READ THIS BEFORE CONTRIBUTING][1].

## Running Locally
Do this first:

> gem instal jekyll

> git clone -b gh-pages https://github.com/dudash/openshift-workshops.git

### How to Run on a Mac
> jekyll serve --baseurl ''

> open http://127.0.0.1:4000/

### How to Run on Linux
> jekyll serve --baseurl ''

In your preferred webbrowser open http://127.0.0.1:4000/

## Releasing
### Choose your set of labs
First update the index.html to point to the correct directory for the labs you want
Second update the _config.yml to set dynamic variables <- (workshop-dir is OBE due to side-by-side labs and will be cleaned up / removed soon).

### How to Release on the Internet
For now this is simply: commit your local changes to this branch and 'git push' to github.  In the future when we move away from GitHub pages, this will be slightly more complex.

### How to Release to a Bootable USB Based Workshop
The steps are: 
* Buid the site with 'jekyll build'
* Copy the generated _site folder onto your USB media
* Make a desktop shortcut on the USB OS Desktop to the location where you copied the _site folder
* FYI - Running as a static only (generated) site will break dynamic variables - NEEDS TESTING

[1]: https://github.com/dudash/openshift-workshops/blob/master/CONTRIBUTING.md