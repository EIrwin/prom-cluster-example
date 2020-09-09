const cluster = require('cluster');

class ClusterManager {

    constructor(workerCount) {
        this.workerCount = workerCount;
    }

    start() {
        this._startWorkers();
    }

    _startWorkers() {
        console.log('Forking worker processes');

        for (let i = 0; i < this.workerCount; i++) {
            console.log('Forking worker process', i);
            cluster.fork();
        }

        console.log('Done forking worker processes');
    }
}

module.exports = ClusterManager;