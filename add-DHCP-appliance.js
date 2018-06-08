{
  "method":"POST",
  "url":"dhcpserver/add",
  "data":
   {"server":
    {
    "banner":"Test Banner",
    "dhcp_policy_template_name":"policy-template",
    "monitoringService": "yes",
    "domain_name":"tcpwave.com",
    "ntpConfig":"10.1.10.15",
    "option":"no",
    "organization_name":"EARTH",
    "resolverData":"\"ns1\":\"10.1.10.16\"",
    "server_type":"DHCP",
    "serverPreference":"Primary",
    "snmpConfig":"{\"trapSink1\":\"10.1.10.17\",\"trapSink2\":\"10.1.10.18\",\"communityString\":\"public\",\"systemName\":\"test-dhcp-server.qa.com\",\"processes\":\"ntpd-1/dns-1/sshd-1/monit-1/rsyslog-1/dhcpd-1\"}",
    "timeZone":"GMT (GMT)",
    "v4_ipaddress":"10.1.10.87"
    }
  }
}
