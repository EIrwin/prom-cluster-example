const pc = require('prom-client');
const cluster = require('cluster');

async function run() {
    const c = new pc.Counter({
        name: 'test_counter_worker',
        help: 'Example of a worker counter',
        labelNames: ['worker_id'],
    })

    setInterval(() => {
        c.inc({ worker_id: cluster.worker.id });
    }, 5000);
}

module.exports = {
    run,
}