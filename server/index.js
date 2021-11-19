const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');
const twitterApi = require('./twitterApiHelper')

const PORT = process.env.PORT || 62049;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  app.use(cors({
    origin: '*'
  }));

  // Priority serve any static files.
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('/api/friends/:screen_name', async function (req, res) {
    res.set('Content-Type', 'application/json');
    const screenName = req.params.screen_name
    try {
      const { statusCode, data } = await twitterApi.getFriendsByScreenName(screenName)
      res.json({'statusCode': statusCode, 'data': data})
    } catch(error) {
      res.send(error)
    }
  });

  app.get('/api/timeline/:user_id', async function (req, res) {
    res.set('Content-Type', 'application/json');
    const userId = req.params.user_id
    try {
      const { statusCode, data } = await twitterApi.getUserTimeline(userId)
      res.json({'statusCode': statusCode, 'data': data})
    } catch(error) {
      res.send(error)
    }
  });

  app.get('/api/user/:user_id', async function (req, res) {
    res.set('Content-Type', 'application/json');
    const userId = req.params.user_id
    try {
      const { statusCode, data } = await twitterApi.userLookup(userId)
      res.json({'statusCode': statusCode, 'data': data})
    } catch(error) {
      res.send(error)
    }
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}