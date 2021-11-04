
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../redux/playerSlice"
import { setIds } from "../redux/friendsSlice"
import { useHistory } from "react-router-dom";
import { getFriendsIds } from '../api/twitter'
import ArrowNext from '../components/ArrowNetx'

export default function Player() {
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
    <div className='PlayAs'>
      <label>
        <div className='MainText'>Play as</div>
        <input
          className='HandleInput'
          placeholder="@twitterHandle"
          type="text"
          value={playerName}
          onChange={e => dispatch(setName(e.target.value.replace('@','')))}
        />
      </label>
      {playerName? (
      <div onClick={() => {handleSubmit(playerName)}}>
        <ArrowNext />
      </div>)
      : null}
      </div>
  );
}