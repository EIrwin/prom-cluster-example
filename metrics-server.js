const Router = require('koa-router');

class MetricsServer {
    constructor(registry) {
        this.registry = registry;
    }

    get router() {
        const router = new Router();
        router.get('/metrics', async ctx => {
            ctx.status = 200;
            ctx.body = await this.registry.clusterMetrics();
        });
        return router;
    }
}

module.exports = MetricsServer;