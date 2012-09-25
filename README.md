Node.js MQ Examples
==================

Running the examples
====================
you may find it convenient to run the two programs in different consoles.
````
cd ampq
[sudo] npm install
node pub.js
node sub.js
[manually kill process]
````
Queue Types
===========
Durable
-------
This type of queue is long lived and need explicit removal commands.
Transient
---------
This type of queue is short lived, when all connections to it are lost it will be deleted.