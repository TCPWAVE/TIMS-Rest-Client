# TIMS Rest Client

## 1. Introduction
TCPWave provides an extremely powerful Rest API to simplify any and every trivial task in IP Address management.
An authorization token is generated for each user and can be only used from the source IP from which the API is invoked.
Another way is to use appliance and client certificates to invoke REST calls and establish communication with IPAM.
  
In order for the update to take place via the API, the appropriate user should also have permissions to perform the desired action.
This API call allows the user with the appropriate privileges to add a resource to the TCPWave IPAM.
Execution of this REST call is audited by the TCPWave IPAM. Customers are advised to execute this REST API call in a
non-production environment before attempting to execute it in a production environment.

## 2. Authentication
User can invoke the REST call using Session Token or Certificate based authentication. 

##  Session Token Authentication
The token generation interface can be invoked by any Admin to generate a new token that is valid for the period as defined by the system  (default 60 days) from a given client machine (IP/Host). The generated token can be used from the same system and the Admin's   credentials are applied to the API calls invoked with that token.

##  Certificate Authentication
To enable a SSL connection, the TCPWave IPAM management appliance needs to have a Digital Certificate which will allow the remote TCPWave DNS/DHCP appliances or the web browser or a third-party automation system to trust the authenticity of the management.
The DNS and DHCP transactions for configuration management, statistics, patches, RESTAPI calls from a home-grown automation system or a third party automated system, or a browser session that wants to send an encrypted message apply for a Digital Certificate from the Certificate Authority (CA).

The CA validates the application owner details and other identification details and issues a digital certificate.
In Public Key Infrastructure (PKI) scheme a digital certificate is issued by a CA and it contains Distinguished Name(DN) /owner’s name/ subject, a serial number to uniquely identify the certificate, owner’s public key, issuing date, expiry date, Distinguished name of the CA, digital signature of the issuing authority (CA), signature algorithm which is used to create the signature. Digital certificates issued by the CA can be kept in registries so that the authenticating users can use the owner’s public key. The TCPWave IPAM ensures that secure communication takes place seamlessly and it also ensures that the SSL certificates do not expire. The TCPWave IPAM monitoring engine checks the expiration time of the SSL certificates and initiates the alerting mechanism if any SSL certificate is about to expire.

## 3. Steps to setup TCPWave IPAM node.js rest client to invoke Rest API

### SSH to the system and install node.js using the following commands

        sudo yum install epel-release
        sudo yum install nodejs npm
        
Node.js rest client uses a client.js file that takes the cmd file as an argument and executes the REST API defined in it. The "options" structure in the client.js contains the host and port information. "key" and "cert" fields in that structure point to the SSL key and cert files of the client. For a Token based execution, these two fields are not necessary and instead the TIMS-Session-Token is added into the header structure. 

For certificate-based REST API invocation, appliance and user certificates have to be created and imported to IPAM. 

###  Create Appliance Certificate

    1. Create a key using the following command:
        openssl genrsa -des3 -out rootCA.key 4096
    2. Create a certificate and sign with the key generated in step 1 using the following command:
        openssl req -x509 -new -nodes -key rootCA.key –sha 256 -days 1024 -out rootCA.crt
        
### Create User Certificate

    1. Create a key using the following command:
        openssl genrsa -out client.key 2048
    2. Create the user certificate using the following commands:
        openssl req -new -key client.key -out 1 client.csr
        openssl x509 -req -in client.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out client.crt -days 500 -sha256

### Import Certificates to IPAM

Import the CA certificate to the IPAM trust store: Use the Appliance certificates GUI (Administration -> Security Management->  Appliance Certificates) and set the Trust CA checkbox. Select rootCA.crt file that was generated earlier and the rootCA.key file.

Enter the password used for the private key generation in Private Key Password field. Certificate storage password is the TIMS keystore password. TCPWave provides a default keystore password which can be changed from “Change Store Password” option in the Appliance Certificates page.

Import the client certificate in the User Certificates (Administration -> Security Management-> User Certificates) screen. Here, select client.crt file and the associated admin from the dropdown. Click on OK.

Below example illustrates the sample node.js needed to make a Certificate based REST API invocation. 

        #  certClient.js
        var https = require('https');
        const tls = require('tls');
        var fs = require('fs');
        var cmdFile = process.argv[2];
        if ( !cmdFile )
        {
          console.log("Please specify the command file");
          process.exit(-1);
        }
        var cmd = fs.readFileSync(cmdFile);
        var cfg = JSON.parse(cmd);
        var path = '/tims/rest/'+cfg.url;
        var options = {
          host: IP Address',
          port: Port number,
          path: path,
          method: cfg.method,
          key: fs.readFileSync('certs/client.key'),
          cert: fs.readFileSync('certs/client.crt')
        };
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        console.log(cfg.method);
        console.log(options.path);
        if ( cfg.method == 'GET' )
        {
          var reqGet = https.request(options, function(res){
            console.log("Status Code: ", res.statusCode);

            res.on('data', function(d){
              process.stdout.write(d);
            });
          });
          reqGet.end();

          reqGet.on('error', function(e){
            console.error(e);
          });
        }
        else if ( cfg.method == 'POST' )
        {
          var postHeaders = {'Content-Type':'application/json'};
          var jsonObject;
          if ( cfg.data )
          {
            jsonObject = JSON.stringify(cfg.data);
          }
          if ( jsonObject )
          {
            console.log(' ');
            console.log(jsonObject);
            postHeaders["Content-Length"] = Buffer.byteLength(jsonObject, 'utf8');
          }
          options.headers = postHeaders;
          var reqPost = https.request(options, function(res){
          console.log("Status Code: ", res.statusCode);
            res.on('data', function(d){
              process.stdout.write(d);
            });
          });
        if ( jsonObject )
          reqPost.write(jsonObject);
        else
          reqPost.write("{}");

          reqPost.on('error', function(e){
            console.error('Error: '+e);
          });
        }
        
### Accessing REST API using Tokens

For token-based REST API invocation, user has to create the session token and give this token value in client.js file. User can create a session token from the Session Token Management page (Administration -> Security Management-> Session Token Management). Click on plus button, enter the application name, IP address and click on OK. Use this session token in client.js file to invoke REST API using session token. Below example illustrates the sample node.js needed to make a Token based REST API invocation.

    # cat tokenClient.js
    var https = require('https');
    const tls = require('tls');
    var fs = require('fs');
    var cmdFile = process.argv[2];
    if ( !cmdFile )
    {
      console.log("Please specify the command file");
      process.exit(-1);
    }
    var cmd = fs.readFileSync(cmdFile);
    var cfg = JSON.parse(cmd);
    var path = '/tims/rest/'+cfg.url;
    var options = {
      host: 'IP Address',
      port: Port number,
      path: path,
      method: cfg.method,
      headers:{
        'TIMS-Session-Token':'83227efb-f58e-4763-b234-d86ccdab543d'}
    };
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    console.log(cfg.method);
    console.log(options.path);
    if ( cfg.method == 'GET' )
    {
      var reqGet = https.request(options, function(res){
        console.log("Status Code: ", res.statusCode);

        res.on('data', function(d){
          process.stdout.write(d);
        });
      });
      reqGet.end();

      reqGet.on('error', function(e){
        console.error(e);
      });
    }
    else if ( cfg.method == 'POST' )
    {
      var postHeaders = {'Content-Type':'application/json'};
      var jsonObject;
      if ( cfg.data )
      {
        jsonObject = JSON.stringify(cfg.data);
      }
      if ( jsonObject )
      {
        console.log(' ');
        console.log(jsonObject);
        postHeaders["Content-Length"] = Buffer.byteLength(jsonObject, 'utf8');
      }
      options.headers = postHeaders;
      var reqPost = https.request(options, function(res){
      console.log("Status Code: ", res.statusCode);
        res.on('data', function(d){
          process.stdout.write(d);
        });
      });
    if ( jsonObject )
      reqPost.write(jsonObject);
    else
      reqPost.write("{}");

      reqPost.on('error', function(e){
        console.error('Error: '+e);
      });
    }
### Invoking REST API using node.js
node.js can be invoked using the command “node client.js addnetwork.cmd”. cd to the directory where the client.js and cmd files are present. Each of the cmd extension files has the information related to invoking a REST API call. For example, addNetwork.cmd file has the information related to creation of a network in IPAM and getorganization.cmd is the GET call used to get the details of the organization. 

    # cat addNetwork.cmd
    {
  	"method":"POST",
 	  "url":"/network/add",
 	  "data":
     {
        "address":"10.1.10.0",
        "mask_length":"24",
       	"name":"test",
       	"description":"",
       	"dmzVisible":"no",
        "dnssec_enable":"no",
        "nsec_option":"NSEC3",
        "percentageFull":100,
      	"email_check":1,
        "snmp_check":0,
       	"log_check":0,
       	"rrs":[],
       	"zoneTemplateId":"",
        "zoneTemplateName":null,
        "addr1":"10",
       	"addr2":"1",
       	"addr3":"10",
        "addr4":"0",
        "organization_name":"EARTH"
      }
    }

    # cat getorganization.cmd
    {
     "method":"GET",
     "url":"organization/get?name=QAOrg"
    }
Similar structure is followed for all the cmd files. "method" can take HTTP methods corresponding to CRUD operations, "url" is the path of REST API, and "data" contains the request payload.
