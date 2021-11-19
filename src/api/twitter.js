import process from "process";

const API_SERVER = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')? 'http://localhost:62049/api' : 'https://people.volpato.io/api'

export async function getFriendsIds(screenName) {
    const response = await fetch(`${API_SERVER}/friends/${screenName}`)
    if (response.ok) {
        return await response.json() 
    } else {
        return ({'statusCode': response.status})
    }
}

export async function getFriendTimeline(userId) {
    const response = await fetch(`${API_SERVER}/timeline/${userId}`)
    if (response.ok) {
        return await response.json()
    } else {
        return ({'statusCode': response.status})
    }
}

export async function getUser(userId) {
    const response = await fetch(`${API_SERVER}/user/${userId}`)
    if (response.ok) {
        return await response.json()
    } else {
        return ({'statusCode': response.status})
    }
}

export async function getAppToken() {
    const response = await fetch(`${API_SERVER}/auth/app`)
    if (response.ok) {
        return await response.text() 
    } else {
        return null
    }
}

export async function setUserToken(token, verifier) {
    const response = await fetch(`${API_SERVER}/auth/user/${token}/${verifier}`)
    if (response.ok) {
        return await response.text() 
    } else {
        return null
    }
}