Node.js MQ Examples
==================

AMQP Module
===========

PUB
---
Publishes 4 messages total. 2 messages are sent to 'test' (durable queue that is manually created via rabbitMQ web UI). 2 messages are sent to 'temp' (transient queue created by the PUB or SUB program, depending on which connects to rabbitMQ first). The defaultExchange is set to '' so that we can publish messages directly to the connection without asking for an exchange. On the connection ready event we create the temp queue via the ````conn.queue```` command, default queue options are used which makes a transient queue that will be killed once all connections are closed to it.

SUB
---
Subscribes to 2 queues on the same connection, one being durable and one being transient. Since the queues have different settings we have to use matching paramaters to ask for the durable one ````{autoDelete:false}```` which is the reason for the mostly duplicate code for the 2 subscriber functions. This subscriber program shows 2 methods of dispatching, queue dispatching, and message dispatching. The queue dispatching is realised via having attaching different functions to the different queues ````sub```` ````sub_temp````. The if statement (possibly replaced with a multimethod) dispatches on message properties. The sub.js program will create the queues if they do not already exist. The subscriber will get all of the messages (4) stored on the queue.