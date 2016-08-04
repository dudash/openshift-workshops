#** Lab 11: Quota**

Resource quota enables setting usage limits per project. It allows the admin to
limit the total number of pods and other type of objects created in a project as
well as the amount of resources (cpu, memory, etc) consumed by those objects.

After reaching the limit on an object type (e.g. pod), the server refuses to create
new pods within that project by displaying an appropriate error message to the
end-user.

Resource limits is another way to control consumption of resources within the
project by setting hard limits on how much compute resources a single Pod or
Container can consume.


####**Exercise: Set Quota**

In order to set resource quotas, you need to create a *ResourceQuota* object in
your project. Run the following to create a JSON file containing the *ResourceQuota*
definition:

		$ cat > /tmp/resource-quota.json <<EOF
		{
		  "apiVersion": "v1",
		  "kind": "ResourceQuota",
		  "metadata": {
		    "name": "quota"
		  },
		  "spec": {
		    "hard": {
		      "memory": "1Gi",
		      "cpu": "2",
		      "pods": "5",
		      "services": "5",
		      "replicationcontrollers":"5",
		      "resourcequotas":"1"
		    }
		  }
		}
		EOF

The user needs to have admin privileges to create *ResourceQuota* in the project
which is already given to your user. Run the following to create a *ResourceQuota*:

    $ oc project userXX-mlbparks
		$ oc process -f /tmp/resource-quota.json

**Note:** Make sure to replace your user number with *userXX* in the first command.

####**Exercise: Set Limits**

To limit the amount of resources a Pod or Container consumes, you need to create
a *LimitRange* object in your project. Run the following to create a JSON file
containing the *LimitRange* definition:

		$ cat > /tmp/resource-limits.json <<EOF
		{
			"kind": "LimitRange",
			"apiVersion": "v1",
			"metadata": {
					"name": "limits",
					"creationTimestamp": null
			},
			"spec": {
					"limits": [
							{
									"type": "Pod",
									"max": {
											"cpu": "500m",
											"memory": "750Mi"
									},
									"min": {
											"cpu": "10m",
											"memory": "5Mi"
									}
							},
							{
									"type": "Container",
									"max": {
											"cpu": "500m",
											"memory": "750Mi"
									},
									"min": {
											"cpu": "10m",
											"memory": "5Mi"
									},
									"default": {
											"cpu": "100m",
											"memory": "100Mi"
									}
							}
					]
			}
		}
		EOF

Run the following to create a *LimitRange*:

		$ oc process -f /tmp/resource-limits.json

Go the OpenShift web console and click on the *Settings* tab on the left
sidebar. You should be able to see the limits in the project and also the
current usage for each resource type.

![ResourceQuota](http://training.runcloudrun.com/images/roadshow/quota-1.png)

Notice the orange warning icon near *resourcequotas*. The warning means you have
reached the limit of number of allowed *ResourceQuota* in this project. You are
allowed to create on and you one already created.

####**Exercise: Hit the Limits!**

Let's scale our application up and see what happens. Run the following to create
more pods for the JBoss EAP application:

	$ oc scale dc mlbparks --replicas=5

OpenShift starts creating new pods and after a short while 4 pods will be created
however the number of pods never reaches to 5.

![ResourceQuota](http://training.runcloudrun.com/images/roadshow/quota-2.png)

Go to project *Settings* and check out the resource limits. You should see a warning
triangle near Pods stating you have reached the max limit of 5 Pods in your project.

![ResourceQuota](http://training.runcloudrun.com/images/roadshow/quota-3.png)

Check out *Browse* > *Events* in your project. You will see an event stating that
platform has failed to create new pods due to reaching a limit of 5 Pods.

![ResourceQuota](http://training.runcloudrun.com/images/roadshow/quota-4.png)


**End of Lab 11**
