const cors = require('cors');
const cluster = require('cluster');
const encodeUrl = require('encodeurl')
const express = require('express');
const keys = require('./auth/twitterKeys.json');
const numCPUs = require('os').cpus().length;
const path = require('path');
const queryString = require('query-string')
const request = require('request-promise-native')
const twitterApi = require('./twitterApiHelper')
const twitterApiV2 = require('./twitterApiHelperV2')

const PORT = process.env.PORT || 62049;
let TMP_AUTH_TOKEN_SECRET
let USER_OAUTH_TOKEN = keys.access_token
let USER_OAUTH_TOKEN_SECRET = keys.access_token_secret

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

  app.get('/api/auth/app', async function (req, res) {
    res.set('Content-Type', 'application/json');
    const authOptions = {
      headers: { Accept: '*/*', Connection: 'close', 'User-Agent': 'node-twitter/1' },
      oauth: {
        consumer_key: keys.consumer_key,
        consumer_secret: keys.consumer_secret,
        callback: encodeUrl('http://localhost:3000'),
      },
      url: `https://api.twitter.com/oauth/request_token`,
    }
    const result = await request.post(authOptions)
    const responseData = queryString.parse(result)
    const tmpOauthToken = responseData.oauth_token
    TMP_AUTH_TOKEN_SECRET = responseData.oauth_token_secret
    res.send(tmpOauthToken)
  });

  app.get('/api/auth/user/:token/:verifier', async function (req, res) {
    res.set('Content-Type', 'application/json');
    const authOptions = {
      headers: { Accept: '*/*', Connection: 'close', 'User-Agent': 'node-twitter/1' },
      oauth: {
        consumer_key: keys.consumer_key,
        consumer_secret: keys.consumer_secret,
        token: req.params.token,
        token_secret: TMP_AUTH_TOKEN_SECRET,
        verifier: req.params.verifier,
      },
      url: `https://api.twitter.com/oauth/access_token`,
    }
    const result = await request.post(authOptions)
    const responseData = queryString.parse(result)
    const userOauthToken = responseData.oauth_token
    const userOauthTokenSecret = responseData.oauth_token_secret
    USER_OAUTH_TOKEN = userOauthToken;
    USER_OAUTH_TOKEN_SECRET = userOauthTokenSecret;
    res.send('OK')
  });

  app.get('/api/friends/:screen_name', async function (req, res) {
    res.set('Content-Type', 'application/json');
    const screenName = req.params.screen_name
    try {
      const { statusCode, data } = await twitterApiV2.getFriendsByScreenName(
        screenName,
        USER_OAUTH_TOKEN,
        USER_OAUTH_TOKEN_SECRET)
      res.json({'statusCode': statusCode, 'data': data})
    } catch(error) {
      console.log(error)
      res.send(error)
    }
  });

  app.get('/api/timeline/:user_id', async function (req, res) {
    res.set('Content-Type', 'application/json');
    const userId = req.params.user_id
    try {
      const { statusCode, data } = await twitterApi.getUserTimeline(
        userId,
        USER_OAUTH_TOKEN,
        USER_OAUTH_TOKEN_SECRET)
      res.json({'statusCode': statusCode, 'data': data})
    } catch(error) {
      res.send(error)
    }
  });

  app.get('/api/user/:user_id', async function (req, res) {
    res.set('Content-Type', 'application/json');
    const userId = req.params.user_id
    try {
      const { statusCode, data } = await twitterApi.userLookup(
        userId,
        USER_OAUTH_TOKEN,
        USER_OAUTH_TOKEN_SECRET)
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