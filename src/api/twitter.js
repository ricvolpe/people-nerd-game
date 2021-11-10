const API_SERVER = 'http://localhost:5000/api'

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