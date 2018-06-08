{
  "method":"POST",
  "url":"dnsserver/add",
  "data":
  {
    "banner":"Test Banner",
    "dns_options_template_name":"BIND AUTH Default Template",
    "dns_server_template_name":"BIND AUTH Default Server Template",
    "monitoringService": "yes",
    "ntpConfig":"10.1.10.15",
    "organization_name":"EARTH",
    "resolverData":"{\"ns1\":\"10.1.10.16\"}",
    "server_type":"BIND AUTH",
    "snmpConfig":"{\"trapSink1\":\"10.1.10.17\",\"trapSink2\":\"10.1.10.18\",\"communityString\":\"public\",\"systemName\":\"test-dns-server\",\"processes\":\"ntpd-1/dns-1/sshd-1/monit-1/rsyslog-1/dhcpd-1\"}",
    "stealthServer":0,
    "timeZone":"GMT (GMT)",
    "v4_ipaddress":"10.1.10.87"
  }
}
