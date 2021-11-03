export async function getFriendsIds(screenName) {
    const response = await fetch(`api/friends/${screenName}`)
    if (response.ok) {
        return await response.json() 
    } else {
        return ({'statusCode': response.status})
    }
}