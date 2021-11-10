import { getUser } from '../api/twitter'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setAnswerIDs } from "../redux/answerOptionsSlice"

export default function Answers() {
    const dispatch = useDispatch()
    const friendsIds = useSelector((state) => state.friendsIds.value)
    const [users, setUsers] = useState(null)

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
          const possibleID = shuffledFriendsIds[Math.floor(Math.random() * 10)]
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
      getAnswers(getAnswers(friendsIds))
    }, [friendsIds, dispatch])

    if (users?.length > 0) {
      return (
        <div>
          {users.map(u => {
            return (
              <p key={u[0].id}>
                {u[0].screen_name}
              </p>
            )
          })}
        </div>
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