Node.js MQ Examples
==================

MessageHub Module
===========

PUB
---
Publishes messages via ````hub.emit```` function to a transient queue (needs subscribers listening on it or the messages get dropped). Messages are on the 'test' channel and delivered to a randomly-named queue.

SUB
---
Subscribers registars on channel 'test' and listen for messages on 'message.name' which is a routing key for a randomly-named queue. Use the ````hub.on```` function to listen for messages. Subscribers create transient queues.

JOB
---
Job creates a durable queue of the name 'job.name'. It is otherwise the same as pub, except that it uses ````hub.job```` to post messages.

WORKER
------
Worker creates a durable queue of the name 'job.name'. It is otherwise the same as sub, except that it uses ````hub.worker```` to subscribe to messages, and it requires a ````done()```` callback to deliver an acknowledgement.