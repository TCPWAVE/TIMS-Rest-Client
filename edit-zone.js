{
  "method":"POST",
  "url":"zone/update",
  "data":
  {
    "addedRRs":
    [
      {"data":"1.2.3.4", "owner":"test.tcpwave.com.", "rrclass":"IN", "rrtype":"A", "status":1, "ttl":1200 },
      {"data":"10 test.tcpwave.com.", "owner":"mail.tcpwave.com.", "rrclass":"IN", "rrtype":"MX", "status":1, "ttl":1200 },
      {"data":"2.3.4.5", "owner":"nameserver.tcpwave.com.", "rrclass":"IN", "rrtype":"A", "status":1, "ttl":1200 },
      {"data":"nameserver.tcpwave.com.", "owner":"ns1.tcpwave.com.", "rrclass":"IN", "rrtype":"NS", "status":1, "ttl":1200 }
    ],
    "deletedRRS":[],
    "description":"Testing REST API Updates",
    "dmzVisible":0,
    "dnssec_enable":"no",
    "monitoringService":"yes",
    "name":"tcpwave1.com",
    "old_name":"tcpwave.com",
    "restrictedZone":"no",
    "serial_format":"DATE",
    "template_name":"TCPWave-template",
    "organization_name":"EARTH"
  }
}
