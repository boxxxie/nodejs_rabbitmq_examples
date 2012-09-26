var messagehub = require('messagehub'); 
var _ = require('underscore');

var channel="test";

var host ="54.243.197.131"; // default to EC2 host

var hub = messagehub(host,channel); // create the connection

_.times(9999,
        function(){
          hub.job('job.name'
                  ,{display: _.uniqueId() + ' Hello World!'})
        });
