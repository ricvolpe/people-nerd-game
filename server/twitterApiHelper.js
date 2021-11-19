const twit = require('twit')
const keys = require('./auth/twitterKeys.json');

async function getFriendsByScreenName(screenName, token, secret) {
    return new Promise ((resolve, reject) => {
        const T = new twit({
            consumer_key:         keys.consumer_key,
            consumer_secret:      keys.consumer_secret,
            access_token:         token,
            access_token_secret:  secret,
            timeout_ms:           1000,  // optional HTTP request timeout to apply to all requests.
        })
        T.get('friends/ids', { screen_name: screenName }, function(err, data, resp) {
            const statusCode = resp.statusCode
            if (statusCode === 429) {
                console.log('Rate Limited!!')
                console.log('Consumed requests:', resp.headers['x-rate-limit-limit'])
                console.log('Resets at:', new Date(parseInt(resp.headers['x-rate-limit-reset']) * 1000))
            }
            if (err) {
                resolve({statusCode, err})
            } else {
                resolve({statusCode, data})
            }
        })
    })
}

async function getUserTimeline(userId, token, secret) {
    return new Promise ((resolve, reject) => {
        const T = new twit({
            consumer_key:         keys.consumer_key,
            consumer_secret:      keys.consumer_secret,
            access_token:         token,
            access_token_secret:  secret,
            timeout_ms:           1000,  // optional HTTP request timeout to apply to all requests.
        })
        T.get('statuses/user_timeline', { user_id: userId, count: 200, include_rts: false }, function(err, data, resp) {
            const statusCode = resp.statusCode
            if (statusCode === 429) {
                console.log('Rate Limited!!')
                console.log('Consumed requests:', resp.headers['x-rate-limit-limit'])
                console.log('Resets at:', new Date(parseInt(resp.headers['x-rate-limit-reset']) * 1000))
            }
            if (err) {
                console.log(err)
                resolve({statusCode, err})
            } else {
                resolve({statusCode, data})
            }
        })
    })
}

async function userLookup(userID, token, secret) {
    return new Promise ((resolve, reject) => {
        const T = new twit({
            consumer_key:         keys.consumer_key,
            consumer_secret:      keys.consumer_secret,
            access_token:         token,
            access_token_secret:  secret,
            timeout_ms:           1000,  // optional HTTP request timeout to apply to all requests.
        })
        T.get('users/lookup', { user_id: userID, include_entities: false }, function(err, data, resp) {
            const statusCode = resp.statusCode
            if (statusCode === 429) {
                console.log('Rate Limited!!')
                console.log('Consumed requests:', resp.headers['x-rate-limit-limit'])
                console.log('Resets at:', new Date(parseInt(resp.headers['x-rate-limit-reset']) * 1000))
            }
            if (err) {
                resolve({statusCode, err})
            } else {
                resolve({statusCode, data})
            }
        })
    })
}

module.exports = {
    getFriendsByScreenName: getFriendsByScreenName,
    getUserTimeline: getUserTimeline,
    userLookup: userLookup
}