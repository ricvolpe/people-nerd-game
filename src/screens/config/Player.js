
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../../redux/playerSlice"
import { useHistory } from "react-router-dom";
import { ApiCall } from '../../api/twitter'

export default function Player() {
    return <NameForm />;
  }

function NameForm() {
  const playerName = useSelector((state) => state.playerName.value)
  const dispatch = useDispatch()
  const history = useHistory();
  
  const handleSubmit = () => {
    ApiCall()
    history.push("/group"); 
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Play as
        <input
          placeholder="@twitter handle"
          type="text"
          value={playerName}
          onChange={e => dispatch(setName(e.target.value))}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}