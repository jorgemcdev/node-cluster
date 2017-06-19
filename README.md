# Node cluster
A single instance of Node.js runs in a single thread. To take advantage of multi-core systems the user will sometimes want to launch a cluster of Node.js processes to handle the load.

The cluster module allows you to easily create child processes that all share server ports.

Node cluster is simple to implement and configure, things are kept inside Node’s without depending on other software.
```
$ node dist/cluster <number>
```
number = number of cores to use, by default cluster will use all the cores available

## Configuration
The only need one simple configuration to run your server in cluster mode, is a simple change to the name of file to import, line 5 of cluster.js.
```javascript
import server from './<your-server-name>';
```

## Run in Development
```
$ npm run dev
```

## Build
Build and Run
```
$ npm start
```

## Run
```
$ node dist/cluster.js 2
```
(use 2 cores, by default cluster will use all the cores available)

## How to Simulate
Loadtest allows you to configure and tweak requests to simulate real world loads.

### Install
```
npm install -g loadtest
```

### Run Simulation
Now you can test the diference running your server using only on core vs cluster mode.
```
loadtest -c 10 --rps 100 http://localhost:8000
```
rps = stands for rate of request per second

c = number of connections

## Links
https://nodejs.org/api/cluster.html

https://github.com/alexfernandez/loadtest

https://medium.com/@fermads/node-js-process-load-balancing-comparing-cluster-iptables-and-nginx-6746aaf38272
