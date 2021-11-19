const keys = require('./auth/twitterKeys.json');
const request = require('request-promise-native')
const encodeUrl = require('encodeurl')
const queryString = require('query-string')

const options = {
  headers: { Accept: '*/*', Connection: 'close', 'User-Agent': 'node-twitter/1' },
  oauth: {
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    callback: encodeUrl('http://localhost:3000'),
  },
  url: `https://api.twitter.com/oauth/request_token`,
}

async function getUserToken() {
  const result = await request.post(options)
  const responseData = queryString.parse(result)
  const tmpOauthToken = responseData.oauth_token
  const tmpOauthTokenSecret = responseData.oauth_token_secret
  const redirectUrl =`https://api.twitter.com/oauth/authorize?oauth_token=${tmpOauthToken}`
  console.log(redirectUrl)
}

getUserToken()

