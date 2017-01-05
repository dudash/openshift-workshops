# How to contribute

We'd love for you to help support writing workshops and labs using openshift.  Here are a few guidelines on what's expected of you in order to get your contributions accepted.

## Documentation - Getting Started

### On RHEL/Fedora install the following packages to install the developer dependencies.
> sudo dnf group install "C Development Tools and Libraries"
> sudo dnf install redhat-rpm-config

Get the dependencies:

> gem instal jekyll

> git clone -b gh-pages https://github.com/dudash/openshift-workshops.git

### How to run on a Mac
> jekyll serve --baseurl ''

> open http://127.0.0.1:4000/

### How to run on Linux
> jekyll serve --baseurl ''

In your preferred webbrowser open http://127.0.0.1:4000/


## Documentation - Workshop and Lab Structure
All workshop content resides in the gh-pages branch nested in subfolders under 'www'.  The workshops and screenshots are different for different versions of Open Shift so we have organized the subfolder according to Open Shift release versions (e.g. 3.1, 3.3, ...).

### Plugin Support
GitHub Pages is powered by Jekyll. However, all Pages sites are generated using the --safe option to disable custom plugins for security reasons. Unfortunately, this means our plugins won’t work when deploying to GitHub Pages.

We can still use GitHub Pages to publish the site, but we need to convert the site locally and push the generated static files to your GitHub repository instead of the Jekyll source files.  Support for this is a planned future enhancement - once the core content of the site is stable.

When we publish to another host, this shouldn't be an issue.

### Configuring Examples
The _data/code-config.yml file should be setup to select the proper github code and examples to populate the labs.  Please add variables there (and use in your lab.md files) as needed to ensure changing the "workshop-language" changes the lab code.  This will come in most handy if you need to change a git URL for the workshop depending on where you are running it (local laptop git vs github).


## Code
The code lives in the master branch and is used for workshop examples.  If you are creating a new workshop example or demo please put your code in it's own folder (aka context directory) within the master branch.  No code should live in the gh-pages branch.

### Releases
Releases of code (master branch) will be done anytime a major feature is added to any of the examples/demos.  As such, please document in your release notes what changes have been made AND in which sub project(s).  FYI, you can use double asterisk to highlight to **project name** in bold.

Please use [Semantic Versioning][4].

Releases [can be found here][5].


## Making Changes

* Major changes require a feature branch from where you want to base your work.
  * This is usually the master branch for code or the gh-pages branch for labs documentation.
  * Only target release branches if you are certain your fix must be on that branch.
  * Make commits of logical units.
  * Please be specific in your commit messages
  

## Making Trivial Changes

* Trivial may be done directly on master or gh-pages
 

## Submitting Changes

* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to this repository and reference any github issues that are related
* The core team will try to address Pull Requests on a weekly basis - if your's is sitting for more than a week, please email jdudash@redhat.com
* You might get feedback on your pull request that you need to address before it is accepted.  Please try to address it within two weeks. After two
  weeks we may close the pull request if it isn't showing any activity.


# Additional Info

* [Jekyll Structure][3].

[1]: http://jekyllrb.com/
[2]: https://jekyllrb.com/docs/plugins/
[3]: https://jekyllrb.com/docs/structure/
[4]: http://semver.org/
[5]: https://github.com/dudash/openshift-workshops/releases
