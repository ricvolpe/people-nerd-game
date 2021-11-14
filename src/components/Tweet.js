import { getFriendTimeline } from '../api/twitter'
import { setTweetAuthor } from "../redux/tweetAuthorSlice"
import { useHistory } from "react-router-dom";
import { Tweet } from 'react-twitter-widgets'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";

const SECONDS_IN_A_DAY = 86400000
const LAST_30_DAYS = new Date(Date.now() - 30 * SECONDS_IN_A_DAY)

function getPossibleTweetAuthorID(friendsIds) {
  return friendsIds[Math.floor(Math.random() * friendsIds.length)]
}

function getPotentialTweet(timeline) {
  if (timeline.filter(t => Date.parse(t.created_at) > LAST_30_DAYS).length === 0) {
    return null
  }
  const repliesFilteredTL = timeline.filter(t => t.in_reply_to_screen_name === null)
  if (repliesFilteredTL.length === 0) {
    return null
  }
  const entitiesFilteredTL = repliesFilteredTL.filter(t => (t.entities.urls?.length === 0 && 
    (t.entities.media?.length === 0  || t.entities.media === undefined)))
  if (entitiesFilteredTL.length === 0) {
    return null
  }
  return entitiesFilteredTL[Math.floor(Math.random() * entitiesFilteredTL.length)]
}

export default function TweetQuestion() {
  const history = useHistory();
  const dispatch = useDispatch()
  const friendsIds = useSelector((state) => state.friendsIds.value)
  const answer = useSelector((state) => state.answer.value)
  const [tweet, setTweet] = useState(null)

  useEffect(() => {
    async function getTimeline(friendsIds) {
      if (friendsIds.length === undefined) {
        return null
      }
      const possibleId = getPossibleTweetAuthorID(friendsIds)
      const resp = await getFriendTimeline(possibleId)
      if (resp['statusCode'] === 200) {
        const tweet = getPotentialTweet(resp.data)
        if (tweet === null) {
          getTimeline(friendsIds)
        } else {
          setTweet(tweet)
          dispatch(setTweetAuthor(resp.data[0]?.user))
        }
      }
      else {
        console.log('Could not fetch user for tweet', possibleId, 'HTTP status code', resp.statusCode)
        getTimeline(friendsIds)
      }
    }
    getTimeline(friendsIds)
  }, [friendsIds, dispatch, history.location])

  if (tweet) {
    if (answer) {
      return <Tweet tweetId={tweet.id_str} />
    }
    return (
      <div>{tweet.text}</div>
    )
  } else {
    return null
  }
}