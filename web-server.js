const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');

class WebServer {
    constructor(port) {
        this.port = port;
        this.app = new Koa();

        this.app.use(koaBody());
    }

    registerRoutes(routes) {
        this.app.use(routes);
    }


    async start() {
        console.log('Starting web server on port:', this.port);

        const server = http.createServer(this.app.callback());

        await new Promise((resolve, reject) => {
            server.listen(this.port, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }
}

module.exports = WebServer;