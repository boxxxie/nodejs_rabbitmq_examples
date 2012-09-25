var amqp = require('amqp'); 

var queue_name="test";
var temp_queue_name="temp";

var url =  "amqp://54.243.197.131:5672"; // default to EC2 host

function pub(conn,queue_name) {
  return function(){
    // publish a message on the default exchange
    // does not require to match options with queue
    conn.publish(queue_name,{display: 'Hello World!'});
    conn.publish(queue_name,{action: 'Hello World again!'});
    //the above will build up in the queue and all get executed in the
    //subcriber program
  }; 
}

var conn = amqp.createConnection(
  {url: url},
  {defaultExchange:''}); // create the connection
conn.on('ready',pub(conn,queue_name))

//the below line forces the opening of a temp queue without a subscriber attached
conn.on('ready',function(){
  conn.queue(temp_queue_name
             ,function(q) { // create a queue if it doesn't exist
               pub(conn,temp_queue_name)()
             });
});


//the above temp queue needs to have a subscriber before it will be
//created. this publisher will send messages to nowhere as it does not
//create the temp queue.
