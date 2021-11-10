import { getFriendTimeline } from '../api/twitter'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setTweetAuthorID } from "../redux/tweetAuthorSlice"

function getPossibleTweetAuthorID(friendsIds) {
  return friendsIds[Math.floor(Math.random() * 10)]
}

export default function Tweet(props) {
    const dispatch = useDispatch()
    const friendsIds = useSelector((state) => state.friendsIds.value)
    const [friendTimeline, setFriendTimeline] = useState(null)

    useEffect(() => {
      async function getTimeline(possibleId) {
        const resp = await getFriendTimeline(possibleId)
        if (resp['statusCode'] === 200) {
          setFriendTimeline(resp.data)
          dispatch(setTweetAuthorID(possibleId))
        }
        else {
          console.log('Could not fetch user for tweet', possibleId, 'HTTP status code', resp.statusCode)
          getTimeline(getPossibleTweetAuthorID(friendsIds))
        }
      }
      getTimeline(getPossibleTweetAuthorID(friendsIds))
    }, [friendsIds, dispatch])

    if (friendTimeline) {
      return (
        <div>{friendTimeline[0].text}</div>
      )
    } else {
      return null
    }

}