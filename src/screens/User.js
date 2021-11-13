
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../redux/userSlice"
import { setIds } from "../redux/friendsSlice"
import { useHistory } from "react-router-dom";
import { getFriendsIds } from '../api/twitter'

export default function User() {
  const userName = useSelector((state) => state.userName.value)
  const dispatch = useDispatch()
  const history = useHistory();

  async function handleSubmit(screenName) {
    const resp = await getFriendsIds(screenName)
    if (resp['statusCode'] === 200) {
      dispatch(setIds(resp.data.ids))
      history.push('question/1')
    }
    else {
      alert('Not working!')
    }
  }

  return (
    <div className='OpenAs'>
      <label>
        <div className='MainText'>Play as</div>
        <input
          className='HandleInput'
          placeholder="@twitterHandle"
          type="text"
          value={userName}
          onChange={e => dispatch(setName(e.target.value.replace('@', '')))}
        />
      </label>
      <button onClick={() => { handleSubmit(userName) }}>
        Submit
      </button>
    </div>
  );
}