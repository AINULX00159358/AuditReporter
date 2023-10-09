kn trigger create audit-reporter-trigger --broker invoicemgr-event-broker --filter type=Audit --sink http://auditreportersvc.misc.svc.cluster.local:3000/audit
