const ClusterManager =require('./cluster-manager');
const WebServer = require('./web-server');
const MetricsServer = require('./metrics-server');
const pc = require('prom-client');

const DEFAULT_WORKER_COUNT = 4;
async function run(registry) {


    // create metrics server/routes
    const metricsServer = new MetricsServer(registry);
    const metricsRouter = metricsServer.router;

    // create web server and register /metrics route
    const webServer = new WebServer(8181);
    webServer.registerRoutes(metricsRouter.routes());

    // fork worker processes
    const clusterManager = new ClusterManager(DEFAULT_WORKER_COUNT);
    clusterManager.start();

    const c = new pc.Counter({
        name: 'test_counter_master',
        help: 'Example of a master counter',
    })

    setInterval(() => {
        c.inc();
    }, 5000);

    console.log('Starting web server');
    webServer.start();
}

module.exports = {
    run,
}