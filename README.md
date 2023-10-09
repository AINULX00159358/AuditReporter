## AuditReporter ##
This Application is Notified using HTTP Channel from Knative Event Broker for EventType of 'Audit'
The Application calculates the Latency between time when Invoice Is Generated and When It was Closed

using URI of /metrics Prometheus metrics is scaped out
the custom Metrics name is **e2e_latency_milliseconds** and is of type Guage
