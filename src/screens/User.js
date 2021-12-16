import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { setName } from "../redux/userSlice"
import { setIds } from "../redux/friendsSlice"
import { useHistory } from "react-router-dom";
import { getFriendsIds } from '../api/twitter'
import { useWindowDimensions } from '../hooks/useWindowDimensions'
import { useSelector, useDispatch } from "react-redux";

export default function User() {
  const userName = useSelector((state) => state.userName.value)
  const { width } = useWindowDimensions();
  const dispatch = useDispatch()
  const history = useHistory();

  async function handleSubmit(screenName) {
    const resp = await getFriendsIds(screenName)
    console.log(resp)
    if (resp['statusCode'] === 200) {
      dispatch(setIds(resp.data))
      history.push('question/1')
    }
    else {
      alert('Not working!')
    }
  }

  const handleKeyPress = (keyPress) => {
    if (keyPress.key === 'Enter') {
      handleSubmit(userName)
    }
  }

  return (
    <div className='userOuter'>
      <TextField
        onChange={e => dispatch(setName(e.target.value.replace('@', '')))}
        onKeyDown={handleKeyPress}
        placeholder="@twitterHandle"
        value={userName}
        variant="standard"
        inputProps={{style: {fontSize: '32px', width: Math.min(width, 500) - 200}}}
        />
      <Button 
        disabled={userName === ''}
        onClick={() => { handleSubmit(userName) }} 
        size="big"
        sx={{fontSize: '24px'}}
        variant="contained" >
        Play
      </Button>
    </div>
  );
}