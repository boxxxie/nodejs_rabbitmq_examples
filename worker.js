var amqp = require('amqp'); 
var _ = require('underscore');

var queue_name="test";
var temp_queue_name="temp";

var url =  "amqp://54.243.197.131:5672"; // default to EC2 host
//var url="amqp://72.51.30.10:5672";

// dispatching on message elements
function action(queue){
  return function(message,headers,delivery_info){
    if(message.display){
      console.log('display',message);
    }
    else if(message.action){
      _.chain(9999999)
        .range()
        .map(_.identity)
        .value()
      console.log('action',message);
    }
    else{
      console.log(message);  
    }
    queue.shift();
  }
}


function sub(conn,queue_name) {
  return function(){
    // requires match on queue options
    conn.queue(queue_name
               ,{autoDelete:false}
               ,function(q) { // create a queue
                 q.subscribe(
                   {ack:true}
                   ,action(q));
               });
  }
}

//dispatching on queue name. using same action, but on different queues.
function sub_temp(conn,queue_name) {
  return function(){
    // requires match on queue options
    conn.queue(queue_name
               ,function(q) { // create a queue
                 q.subscribe(
                   {ack:true}
                   ,action(q));
               });
  }
}

_.chain(20).range().each(function(){
  var conn = amqp.createConnection({url: url}); // create the connection
  conn.on('ready',sub(conn,queue_name));
  conn.on('ready',sub_temp(conn,temp_queue_name));
})
