const fetch = require("node-fetch");
const keys = require('./auth/twitterKeys.json');

var myHeaders = new fetch.Headers();
myHeaders.append("Authorization", `Bearer ${keys.bearer}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};




async function getFriendsByScreenName(screenName, token, secret) {
    return new Promise ((resolve, reject) => {
        fetch(`https://api.twitter.com/2/users/by/username/${screenName}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                fetch(`https://api.twitter.com/2/users/${result.data.id}/following?max_results=1000`, requestOptions)
                .then(response => response.json())
                .then(result => resolve({statusCode: 200, data: result.data.map(v => v.id)}))
                .catch(error => resolve({statusCode: 404, data: error}));
            })
            .catch(error => resolve({statusCode: 404, data: error}));
            

    })
}

module.exports = {
    getFriendsByScreenName: getFriendsByScreenName,
}