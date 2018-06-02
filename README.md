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

## 2.1 Session Token Authentication:
The token generation interface can be invoked by any Admin to generate a new token that is valid for the period as defined by the system  (default 60 days) from a given client machine (IP/Host). The generated token can be used from the same system and the Admin's   credentials are applied to the API calls invoked with that token.

## 2.2 Certificate Authentication:
To enable a SSL connection, the TCPWave IPAM management appliance needs to have a Digital Certificate which will allow the remote TCPWave DNS/DHCP appliances or the web browser or a third-party automation system to trust the authenticity of the management.
The DNS and DHCP transactions for configuration management, statistics, patches, RESTAPI calls from a home-grown automation system or a third party automated system, or a browser session that wants to send an encrypted message apply for a Digital Certificate from the Certificate Authority (CA).

The CA validates the application owner details and other identification details and issues a digital certificate.
In Public Key Infrastructure (PKI) scheme a digital certificate is issued by a CA and it contains Distinguished Name(DN) /owner’s name/ subject, a serial number to uniquely identify the certificate, owner’s public key, issuing date, expiry date, Distinguished name of the CA, digital signature of the issuing authority (CA), signature algorithm which is used to create the signature. Digital certificates issued by the CA can be kept in registries so that the authenticating users can use the owner’s public key. The TCPWave IPAM ensures that secure communication takes place seamlessly and it also ensures that the SSL certificates do not expire. The TCPWave IPAM monitoring engine checks the expiration time of the SSL certificates and initiates the alerting mechanism if any SSL certificate is about to expire.



