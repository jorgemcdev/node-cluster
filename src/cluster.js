/* eslint global-require: 0*/
import cluster from 'cluster';
import os from 'os';
import logger from 'winston';
import server from './server';

let numCPUs = process.argv['2'] || os.cpus().length;
if (numCPUs > os.cpus().length) {
  numCPUs = os.cpus().length;
}

if (cluster.isMaster) {
  logger.info(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    logger.info(`Worker ${worker.process.pid} is listening`);
  });

  cluster.on('exit', (worker, code, signal) => {
    if (signal) {
      logger.warning(`Worker ${worker.process.pid} killed by signal: ${signal}`);
    } else if (code !== 0) {
      logger.warning(`Worker exited with error code: ${code}`);
    } else {
      logger.info(`Worker ${worker.process.pid} Success`);
    }
    cluster.fork();
  });
} else {
  server();
}
