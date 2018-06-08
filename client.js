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
  port: 7443,
  path: path,
  method: cfg.method,
  key: fs.readFileSync('certs/10.1.10.36.key'),
  cert: fs.readFileSync('certs/10.1.10.36.crt')
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
