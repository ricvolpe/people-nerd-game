import { getFriendTimeline } from '../api/twitter'
import { useEffect, useState } from "react"
import { Box } from 'reflexbox'

const SECONDS_IN_A_DAY = 86400000
const formatTweetCount = (count) => (count <= 200 ? count : "200+")

export default function Friend(props) {
    const { friendId } = props;
    const [friendTimeline, setFriendTimeline] = useState(null)

    useEffect(() => {
        async function getTimeline(id) {
          const resp = await getFriendTimeline(id)
          if (resp['statusCode'] === 200) {
            setFriendTimeline(resp.data)
          }
          else {
            console.log('Could not fetch user', id, 'HTTP status code', resp.statusCode)
          }
        }
        getTimeline(friendId)
      }, [friendId])

    let friendName, friendImage, lastWeekCount, yesterdayCount
    // let mostLikedTweet, leastLikedTweet, longestTweet, shortestTweet
    if (friendTimeline) {
      const yesterday = new Date(Date.now() - SECONDS_IN_A_DAY)
      const lastWeek = new Date(Date.now() - 7 * SECONDS_IN_A_DAY)
      friendName = friendTimeline[0]?.user.name
      friendImage = friendTimeline[0]?.user.profile_image_url_https
      yesterdayCount = friendTimeline.filter(t => Date.parse(t.created_at) > yesterday).length
      lastWeekCount = friendTimeline.filter(t => Date.parse(t.created_at) > lastWeek).length
  
    //   mostLikedTweet = extractTweetByTopKey(friendTimeline, 'favorite_count', 'max')
    //   leastLikedTweet = extractTweetByTopKey(friendTimeline, 'favorite_count', 'min')
    //   longestTweet = extractTweetByTopKey(friendTimeline, 'text', 'maxLenght')
    //   shortestTweet = extractTweetByTopKey(friendTimeline, 'text', 'minLenght')
  
    }
    if (friendTimeline) {
        return (
            <Box width={'150px'} height={'150px'} fontSize={1} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', cursor: 'pointer',
                backgroundColor: (false) ? '#1DA1F2' : 'white',
                color: (false) ? 'white' : 'black',
                alignItems: 'center', border: 1, borderColor: '#cfd9de', borderStyle: 'solid'
              }}>
                <img src={friendImage} style={styles.userAvatar} alt="userAvatar" />
                <div>{friendName}</div>
                <div>{formatTweetCount(yesterdayCount)} tweets yesterday</div>
                <div>{formatTweetCount(lastWeekCount)} tweets last week </div>
            </Box>
        )
    } else {
        return null
    }
}

// function extractTweetByTopKey(timeline, key, operator) {
//     let extractedTweet = timeline[0]
//     let condition = false
//     for (let i = 1; i < timeline.length; i++) {

//       if (operator === 'max') {
//         condition = timeline[i][key] > extractedTweet[key]
//       } else if (operator === 'min') {
//         condition = timeline[i][key] < extractedTweet[key]
//       } else if (operator === 'maxLenght') {
//         condition = timeline[i][key].length > extractedTweet[key].length
//       } else if (operator === 'minLenght') {
//         condition = timeline[i][key].length < extractedTweet[key].length
//       }

//       if (condition) {
//         extractedTweet = timeline[i]
//       }
//     }
//     return extractedTweet
// }

const styles = {
    userAvatar: {
        widht: '48px',
        height: '48px',
        borderRadius: '24px',
        border: '1px solid black'
    }
}