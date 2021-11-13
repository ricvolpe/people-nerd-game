import { getUser } from '../api/twitter'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setAnswerIDs } from "../redux/answerOptionsSlice"
import { increaseScore } from '../redux/scoreSlice';
import { Box, Flex } from 'reflexbox'
import { useHistory } from "react-router-dom";

export default function Answers(props) {
    const dispatch = useDispatch()
    const friendsIds = useSelector((state) => state.friendsIds.value)
    const [users, setUsers] = useState(null)
    const [answer, giveAnswer] = useState(null)
    const history = useHistory();

    useEffect(() => {
      async function getAnswers(friendsIds) {
        if (friendsIds.length === undefined) {
          return null
        }
        const shuffledFriendsIds = shuffle(friendsIds)
        var answerUserIDs = []
        var answerUsers = []
        var unfetchableUsers = []
        while (answerUserIDs.length < 4) {
          const possibleID = shuffledFriendsIds[Math.floor(Math.random() * friendsIds.length)]
          if (possibleID && !answerUserIDs.includes(possibleID) && !unfetchableUsers.includes(possibleID)) {
            const resp = await getUser(possibleID)
            if (resp['statusCode'] === 200) {
              answerUserIDs = [...answerUserIDs, possibleID]
              answerUsers = [...answerUsers, resp.data]
            } else {
              console.log('Could not fetch user for answer', possibleID, 'HTTP status code', resp.statusCode)
              unfetchableUsers = [...unfetchableUsers, possibleID]
            }
          }
        } 
        dispatch(setAnswerIDs(answerUserIDs))
        setUsers(answerUsers)
      }
      giveAnswer(null)
      getAnswers(getAnswers(friendsIds))
    }, [friendsIds, dispatch, history.location])
    
    const { tweetAuthor } = props;

    const answerQuestion = (selectedUserID) => {
      if (answer === null) {
        giveAnswer(selectedUserID)
        if (selectedUserID === tweetAuthor.id) {
          dispatch(increaseScore(1))
        } 
      }
    }

    if (users?.length > 0 && tweetAuthor) {
      const uniqueUsers = users.filter(u => u[0].id !== tweetAuthor.id).slice(0, 3)
      const positionDecider = (uniqueUsers[0][0].id + tweetAuthor.id) % 4
      const fullAnswers = [...uniqueUsers.slice(0, positionDecider), [tweetAuthor], ...uniqueUsers.slice(positionDecider)]
      return (
        <Flex className="grid" flexWrap='wrap' sx={{marginTop: '100px', justifyContent: 'center'}}>
          {fullAnswers.map(u => {
            return (
              <Box 
                key={u[0].id}
                width={'100px'} height={'100px'} 
                onClick={() => answerQuestion(u[0].id)}
                sx={{
                  backgroundColor: answer !== null? (u[0].id === tweetAuthor.id? 'green': 'red') : 'white',
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  marginLeft: '30px'}}
                >
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                {u[0].profile_image_url_https? <img alt={`Avatar of Twitter user ${u[0].screen_name}`} className='AnswerAvatar' src={u[0].profile_image_url_https.replace('_normal', '_bigger')} /> : null}
                </Box>
                <Box>
                  <p className='AnswerName'>{u[0].name}</p>  
                </Box>
              </Box>
            )
          })}
        </Flex>
      )
    } else {
      return null
    }
}


function shuffle(inputArray) {
  var array = [...inputArray]
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}