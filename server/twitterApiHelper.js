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
            const statusCode = resp.statusCode
            if (err) {
                resolve({statusCode, err})
            } else {
                resolve({statusCode, data})
            }
        })
    })
}

module.exports = {
    getFriendsByScreenName: getFriendsByScreenName
}