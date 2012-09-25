var messagehub = require('messagehub'); 
var _ = require('underscore');

var channel="test";

var host ="54.243.197.131"; // default to EC2 host

var hub = messagehub(host,channel); // create the connection
hub.worker('job.name'
           ,function(job,done){
             console.log(job);
             done();
           });
