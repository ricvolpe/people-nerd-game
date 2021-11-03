export async function getFriendsIds(screenName) {
    const response = await fetch(`api/friends/${screenName}`)
    const data = response.ok? await response.json() : {'statusCode': response.status}
    return data
}