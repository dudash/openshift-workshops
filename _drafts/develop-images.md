# Overview
This guide provides best practices on writing and testing Docker images that can be used on OpenShift Enterprise.
Once you have created an image, you can push it to the internal Docker registry.

# Getting Started

There are two ways to create a docker image:

* Create a container and alter its state by running commands in it; create an image with `docker commit`.
* Create a `Dockerfile` and create an image with `docker build`.

Most image authors will find that using a `Dockerfile` is a much easier way to repeatably create an image.
A `Dockerfile` is made up of *instructions*, several of which will be discussed in this guide.

You can find the complete Dockerfile instruction reference [here](http://bit.ly/2acGHin).

# Key Docker Terminology

### Dockerfile

A `Dockerfile` is a text document that contains all the commands a user could call on the command-line to assemble
an image. Using `docker build`, users can create an automated build that executes several command-line instructions
in succession.

### FROM

The `FROM` instruction sets the [Base Image](http://bit.ly/2auNX8N) for subsequent instructions. As such, a valid
`Dockerfile` must have `FROM` as its first instruction. The image can be any valid image - it is especially easy
to start by **pulling an image** from the Red Hat Customer Portal (using `docker pull`) by searching the
[Red Hat Container Images Search Page](http://red.ht/29V9NAy).

    `FROM` <image>

Or

    `FROM <image>:<tag>`

Or

    `FROM <image>@<digest>`

* `FROM` must be the first non-comment instruction in the `Dockerfile`.
* `FROM` can appear multiple times within a single `Dockerfile` in order to create multiple images. Simply make a
note of the last image ID output by the commit before each new `FROM` command.
* The `tag` or `digest` values are optional. If you omit either of them, the builder assumes a `latest` by default. The builder returns an error if it cannot match the `tag` value.

### MAINTAINER

The `MAINTAINER` instruction sets the *Author* field of the image. This is useful for providing an email contact
for your users if they have questions for you.

### EXPOSE

### ADD

### RUN

### ENV

# Guidelines
When creating Docker images to run on OpenShift Enterprise there are a number of best practices to consider as an
image author to ensure a good experience for consumers of those images. Because images are intended to be
immutable and used as-is, the following guidelines help ensure that your images are highly consumable and easy to
use on OpenShift Enterprise.

### General Docker Guidelines
* Reuse Images
  * Wherever possible, we recommend that you base your image on an appropriate upstream image using the `FROM`
  statement with tags (for example, `rhel:rhel7`) to make it clear to users exactly which version of an image
  your image is based on.
* Maintain Compatibility Within Tags
  * When tagging your own images, we recommend that you try to maintain backwards compatibility within a tag.
* Avoid Multiple Processes
  * We recommend that you do not start multiple services, such as a database and SSHD, inside one container.
* Use `exec` in Wrapper Scripts
  * Many images use wrapper scripts to do some setup before starting a process for the software being run. It is
  important that if your image uses such a script, that script should use `exec` so that the script’s process
  is replaced by your software. If you do not use `exec`, then signals sent by docker will go to your wrapper
  script instead of your software’s process.
* Clean Temporary Files
  * All temporary files you create during the build process should be removed. This also includes any files
  added with the `ADD` command. For example, we strongly recommended that you run the `yum clean` command after
  performing `yum install` operations.
  * You can prevent the yum cache from ending up in an image layer by creating your RUN statement as follows:

        RUN yum -y install mypackage \
        && yum -y install myotherpackage \
        && yum clean all -y

    **[NOTE]** that if you instead write:

        RUN yum -y install mypackage
        RUN yum -y install myotherpackage && yum clean all -y

    Then the first yum invocation leaves extra files in that layer, and these files cannot be removed when the
    yum clean operation is run later. The extra files are not visible in the final image, but they are present in
    the underlying layers.

    In addition, performing multiple commands in a single RUN statement reduces the number of layers in your image,
    which improves download and extraction time.
* Place Instructions in the Proper Order
  * Docker reads the `Dockerfile` and runs the instructions from top to bottom. Every instruction that is
  successfully executed creates a layer which can be reused the next time this or another image is built. It is
  very important to place instructions that will rarely change at the top of your `Dockerfile`. Doing so ensures
  the next builds of the same image are very fast because the cache is not invalidated by upper layer changes.

    For example, if you are working on a `Dockerfile` that contains an `ADD` command to install a file you are
    iterating on, and a `RUN` command to `yum install` a package, it is best to put the `ADD` command last:

        FROM foo
        RUN yum -y install mypackage && yum clean all -y
        ADD myfile /test/myfile

    This way each time you edit **myfile** and rerun `docker build`, the system reuses the cached layer for the
    `yum` command and only generates the new layer for the `ADD` operation.

    If instead you wrote the `Dockerfile` as:

        FROM foo
        ADD myfile /test/myfile
        RUN yum -y install mypackage && yum clean all -y

    Then each time you changed **myfile** and reran `docker build`, the `ADD` operation would invalidate the `RUN`
    layer cache, so the `yum` operation would need to be rerun as well.
* Always `EXPOSE` Important Ports
* Set Environment Variables
  * It is good practice to set environment variables with the `ENV` instruction.
* Avoid Default Passwords
  * See the [Using Environment Variables for Configuration](http://red.ht/29P20V3) topic for more information.
* Avoid SSHD
  * It is best to avoid running **SSHD** in your image. For accessing running containers, You can use the `docker
  exec` command locally to access containers that are running. Alternatively, you can use the OpenShift Enterprise
  tooling since it allows you to execute arbitrary commands in images that are running. Installing and running
  **SSHD** in your image opens up additional vectors for attack and requirements for security patching.
* Use Volumes for Persistent Data
  * By using a [Docker volume](http://bit.ly/29W5aqC) for all persistent storage needs, the content is preserved
  even if the container is restarted or moved. If your image writes data to arbitrary locations within the
  container, that content might not be preserved.

    **[NOTE]** With Docker 1.5, there will be a readonly flag for containers which can be used to strictly
    enforce good practices about not writing data to ephemeral storage in a container.

    See the [Kubernetes documentation](http://bit.ly/2acIzHS) for more information on how volumes are used in
    OpenShift Enterprise.
* External Guidelines
  * Docker documentation - [Best pratices for writing Dockerfiles](http://bit.ly/2auQtf9)
  * Project Atomic documentation - [Guidance for Docker Image Authors](http://bit.ly/2abwd65)
