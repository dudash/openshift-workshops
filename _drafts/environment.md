#** Lab 0: Environment Overview **

You will be interacting with an OpenShift environment that is installed on top
of Amazon's EC2 infrastructure. The OpenShift environment for the road show
consists of the following:

* One OpenShift Master
* One OpenShift Node providing an "infra(structure)" region
* Five OpenShift Nodes providing the "demo" region

The OpenShift Master provides both the API endpoint for the CLI as well as the
OpenShift web console. It is essentially the only system you will directly
interact with.

The "infra(structure)" region is where OpenShift's internal Docker registry and
OpenShift's router are running. The "demo" region is where all of your builds
and application instances will run. 

This topology of "infra" and "demo" is completely configurable and very advanced
topologies can be crafted to suit the needs of your organization.
