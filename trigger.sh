kn trigger create audit-reporter-trigger --broker invoicemgr-event-broker --filter type=Audit --sink http://auditreportersvc.default.svc.cluster.local:3000/audit
