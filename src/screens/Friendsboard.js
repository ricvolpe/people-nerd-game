import Friend from "../components/Friend"
import { useSelector } from "react-redux";
import { Flex, Box } from 'reflexbox'
import { Tweet } from 'react-twitter-widgets'

export default function Friendsboard() {
  const friendsIds = useSelector((state) => state.friendsIds.value)

  return (
    <div>
        <Flex m={10} flexWrap='wrap' sx={{ justifyContent: 'center' }}>
        <Box width={'300px'} sx={{ minHeight: "200px", backgroundRepeat: 'no-repeat', backgroundPosition: 'center top' }}>
          <Tweet tweetId='1446566666335313920' />
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