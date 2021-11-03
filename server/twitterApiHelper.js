const twit = require('twit')
const keys = require('../keys.json');

const T = new twit({
    consumer_key:         keys.consumer_key,
    consumer_secret:      keys.consumer_secret,
    access_token:         keys.access_token,
    access_token_secret:  keys.access_token_secret,
    timeout_ms:           1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
async function getFriendsByScreenName(screenName) {
    return new Promise ((resolve, reject) => {
        T.get('friends/ids', { screen_name: screenName }, function(err, data, resp) {
            // console.log(res.headers['x-rate-limit-remaining'])
            if (err) {
                resolve({resp, err})
            } else {
                resolve({resp, data})
            }
        })
    })
}

module.exports = {
    getFriendsByScreenName: getFriendsByScreenName
}