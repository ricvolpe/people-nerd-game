import queryString from 'query-string'
import React from 'react';
import { getAppToken, setUserToken } from './api/twitter'

export default function TwitterLogin() {

    React.useEffect(() => {
        async function doAuth() {
            if (window.location.search) {
                const tokens = queryString.parse(window.location.search)
                const tmpOauthToken = tokens.oauth_token
                const oauthVerifier = tokens.oauth_verifier
                const loggedIn = await setUserToken(tmpOauthToken, oauthVerifier)
                console.log(loggedIn, 'done!')
            } else {
                const result = await getAppToken()
                const redirectUrl = `https://api.twitter.com/oauth/authorize?oauth_token=${result}`
                console.log(redirectUrl)
                window.location.replace(redirectUrl)
            }
          }
          doAuth()
    })

    return null
}