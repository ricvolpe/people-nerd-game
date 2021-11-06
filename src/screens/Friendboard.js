
import { useSelector } from "react-redux";
import { getFriendTimeline } from '../api/twitter'
import { useEffect, useState } from "react"

const SECONDS_IN_A_DAY = 86400000

export default function Friendboard() {
  const [friendTimeline, setFriendTimeline] = useState(null)
  const friendsIds = useSelector((state) => state.friendsIds.value)

  useEffect(() => {
    async function getTimeline(friendId) {
      const resp = await getFriendTimeline(friendId)
      if (resp['statusCode'] === 200) {
        setFriendTimeline(resp.data)
      }
      else {
        alert('Not working!')
      }
    }
    getTimeline(friendsIds[1])
  }, [friendsIds])

  function extractTweetByTopKey(timeline, key, operator) {
    let extractedTweet = timeline[0]
    let condition = false
    for (let i = 1; i < timeline.length; i++) {

      if (operator === 'max') {
        condition = timeline[i][key] > extractedTweet[key]
      } else if (operator === 'min') {
        condition = timeline[i][key] < extractedTweet[key]
      } else if (operator === 'maxLenght') {
        condition = timeline[i][key].length > extractedTweet[key].length
      } else if (operator === 'minLenght') {
        condition = timeline[i][key].length < extractedTweet[key].length
      }

      if (condition) {
        extractedTweet = timeline[i]
      }
    }
    return extractedTweet
  }

  let friendName, friendImage, lastWeekCount, yesterdayCount, mostLikedTweet, leastLikedTweet, longestTweet, shortestTweet
  if (friendTimeline) {
    const yesterday = new Date(Date.now() - SECONDS_IN_A_DAY)
    const lastWeek = new Date(Date.now() - 7 * SECONDS_IN_A_DAY)
    friendName = friendTimeline[0]?.user.name
    friendImage = friendTimeline[0]?.user.profile_image_url_https
    yesterdayCount = friendTimeline.filter(t => Date.parse(t.created_at) > yesterday).length
    lastWeekCount = friendTimeline.filter(t => Date.parse(t.created_at) > lastWeek).length

    mostLikedTweet = extractTweetByTopKey(friendTimeline, 'favorite_count', 'max')
    leastLikedTweet = extractTweetByTopKey(friendTimeline, 'favorite_count', 'min')
    
    longestTweet =  extractTweetByTopKey(friendTimeline, 'text', 'maxLenght')
    shortestTweet =  extractTweetByTopKey(friendTimeline, 'text', 'minLenght')
    
  }

  const formatTweetCount = (count) => (count <= 200? count : "200+")

  return (
    <div>
      <img src={friendImage} style={styles.userAvatar} alt="userAvatar" />
      <div>user: {friendName}</div>
      <div>tweets yesterday: {formatTweetCount(yesterdayCount)}</div>
      <div>tweets last week: {formatTweetCount(lastWeekCount)}</div>
      <div>most liked tweet: {mostLikedTweet?.text}</div>
      <div>least liked tweet: {leastLikedTweet?.text}</div>
      <div>longest tweet: {longestTweet?.text}</div>
      <div>shortest tweet: {shortestTweet?.text}</div>
    </div>
  );
}

const styles = {
  userAvatar: {
    widht: '48px',
    height: '48px',
    borderRadius: '24px',
    border: '1px solid black'
  }
}