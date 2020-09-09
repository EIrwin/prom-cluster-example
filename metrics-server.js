const Router = require('koa-router');
const { AggregatorRegistry } = require('prom-client');
const register = require('prom-client').register;

class MetricsServer {
    constructor(registry) {
        this.registry = registry;
    }

    get router() {
        const router = new Router();
        router.get('/metrics', async ctx => {
            ctx.status = 200;
            const masterMetrics = register.metrics();
            const workerMetrics = await this.registry.clusterMetrics();
            ctx.body = masterMetrics + workerMetrics;
        });
        return router;
    }
}

module.exports = MetricsServer;