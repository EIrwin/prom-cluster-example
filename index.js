const cluster = require('cluster');
const pc = require('prom-client');
const AggregatorRegistry = pc.AggregatorRegistry;
const aggregatorRegistry = new AggregatorRegistry();

if (cluster.isMaster) {
    const { run } = require('./master');
    run(aggregatorRegistry);
} else {
    const { run } = require('./worker');
    run();
}