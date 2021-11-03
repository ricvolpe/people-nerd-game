
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../../redux/playerSlice"
import { setIds } from "../../redux/friendsSlice"
import { useHistory } from "react-router-dom";
import { getFriendsIds } from '../../api/twitter'

export default function Player() {
    return <NameForm />;
  }

function NameForm() {
  const playerName = useSelector((state) => state.playerName.value)
  const dispatch = useDispatch()
  const history = useHistory();
  
  async function handleSubmit(screenName) {
    const resp = await getFriendsIds(screenName)
    if (resp['statusCode'] === 200) {
      dispatch(setIds(resp.data.ids))
    }
    else {
      alert('Not working!')
    }
  }

  return (
    <div>
      <label>
        Play as
        <input
          placeholder="@twitter handle"
          type="text"
          value={playerName}
          onChange={e => dispatch(setName(e.target.value))}
        />
      </label>
      <button onClick={() => {handleSubmit(playerName)}} >Submit</button>
      </div>
  );
}