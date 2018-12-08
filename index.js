const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const socketIO = require('socket.io');
const { Server } = require('http');

const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const PORT = process.env.PORT || 3000;

const app = express();
const server = Server(app);
const io = socketIO(server);
let sockets = [];

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.resolve(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

io.on('connection', socket => {
  sockets.push(socket);
  socket.on('coordinates', coordinates => {
    console.log(`Coordinates: ${JSON.stringify(coordinates)}`);
  });
  socket.on('disconnect', () => {
    sockets = sockets.filter(s => s !== socket);
  });
});

let nextId = 0;
setInterval(() => sockets.forEach(s => s.emit('data', { id: nextId++ })), 100);

server.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);
