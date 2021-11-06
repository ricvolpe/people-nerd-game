export async function getFriendsIds(screenName) {
    const response = await fetch(`api/friends/${screenName}`)
    if (response.ok) {
        return await response.json() 
    } else {
        return ({'statusCode': response.status})
    }
}

export async function getFriendTimeline(userId) {
    const response = await fetch(`api/timeline/${userId}`)
    if (response.ok) {
        return await response.json() 
    } else {
        return ({'statusCode': response.status})
    }
}