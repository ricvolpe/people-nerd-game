import Friend from "../components/Friend"
import { getFriendTimeline } from '../api/twitter'
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { Flex, Box } from 'reflexbox'
import { Tweet } from 'react-twitter-widgets'

export default function Friendsboard() {
  const [tweetId, setTweetId] = useState('1446566666335313920')
  const [friendTimeline, setFriendTimeline] = useState(null)
  const [friendId, setFriendId] = useState(null)
  const friendsIds = useSelector((state) => state.friendsIds.value)

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

  const renderTweet = (tweetId) => {
    setTweetId(tweetId)
  }

  return (
    <div>
        <Flex m={10} flexWrap='wrap' sx={{ justifyContent: 'center' }}>
        <Box width={'300px'} sx={{ minHeight: "200px", backgroundRepeat: 'no-repeat', backgroundPosition: 'center top' }}>
          <Tweet tweetId={tweetId} />
        </Box>
        <Box width={[10 / 10, 3 / 10, 4 / 10, 6 / 10, 8 / 10]} p={12}>
          <Flex className="grid" flexWrap='wrap'>
          {shuffle(friendsIds).slice(1, 50).map(id => {
            return (
                <Friend key={id} friendId={id} />
              )
            })}
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}

function shuffle(inputArray) {
  var array = [...inputArray]
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}