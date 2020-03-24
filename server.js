const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const app = express();
const port = 3333;

app.listen(port);

app.use(express.static(path.resolve(__dirname, 'public')));

app.all('/images/:id', (req, res) => {
    proxy.web(req, res, {target: 'http://localhost:3000'});
});

app.all('/api/getimageurls', (req, res) => {
    proxy.web(req, res, {target: 'http://localhost:3001'});
});

app.all('/reviews', (req, res) => {
    proxy.web(req, res, {target: 'http://localhost:8080'});
});
