import { getFriendTimeline } from '../api/twitter'
import loading from '../style/load.gif'
import { setTweetAuthor } from "../redux/tweetAuthorSlice"
import { useHistory } from "react-router-dom";
import { Tweet } from 'react-twitter-widgets'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";

export default function TweetQuestion() {
  const history = useHistory();
  const dispatch = useDispatch()
  const friendsIds = useSelector((state) => state.friendsIds.value)
  const answer = useSelector((state) => state.answer.value)
  const [tweet, setTweet] = useState(null)
  const [previousQuestions, setPreviousQuestions] = useState([])

  useEffect(() => {
    async function getTimeline(friendsIds) {
      if (friendsIds.length === undefined) {
        return null
      }
      const possibleId = getPossibleTweetAuthorID(friendsIds)
      const resp = await getFriendTimeline(possibleId)
      if (resp['statusCode'] === 200) {
        const tweet = getPotentialTweet(resp.data, previousQuestions)
        if (tweet === null) {
          getTimeline(friendsIds)
        } else {
          setTweet(tweet)
          setPreviousQuestions(p => [...p, tweet.id])
          dispatch(setTweetAuthor(resp.data[0]?.user))
        }
      }
      else {
        console.log('Could not fetch user for tweet', possibleId, 'HTTP status code', resp.statusCode)
        getTimeline(friendsIds)
      }
    }
    setTweet(null)
    getTimeline(friendsIds)
  }, [friendsIds, dispatch, history.location])

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString)
    return dateObject.toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})
  }

  if (tweet) {
    if (answer) {
      return (<div className='embeddedTweet'><Tweet tweetId={tweet.id_str} /></div>)
    }
    return (
      <div className="Tweet">
        <div dangerouslySetInnerHTML={{__html: tweet.text}}></div>
        <div className="TweetDate">{formatDate(tweet.created_at)}</div>  
      </div>
    )
  } else {
    return <div className='loadingTweet'><img className='loading' src={loading} /></div>
  }
}

const SECONDS_IN_A_DAY = 86400000
const LAST_60_DAYS = new Date(Date.now() - 60 * SECONDS_IN_A_DAY)

function getPossibleTweetAuthorID(friendsIds) {
  return friendsIds[Math.floor(Math.random() * friendsIds.length)]
}

function getPotentialTweet(timeline, previousTweets) {
  if (timeline[0].created_at > LAST_60_DAYS) { return null }

  const noRepliesTL = timeline.filter(t => t.in_reply_to_screen_name === null)
  if (noRepliesTL.length === 0) { return null }

  const textOnlyTL = noRepliesTL.filter(t => (t.entities.urls?.length === 0 && 
    (t.entities.media?.length === 0  || t.entities.media === undefined)))
  if (textOnlyTL.length === 0) { return null }
  
  const noDuplicatesTL = textOnlyTL.filter(t => !previousTweets.includes(t.id))
  if (noDuplicatesTL.length === 0) { return null }

  return noDuplicatesTL[Math.floor(Math.random() * noDuplicatesTL.length)]
}