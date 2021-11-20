import Answers from "../components/Answers";
import { Box } from 'reflexbox'
import Button from '@mui/material/Button';
import TweetQuestion from "../components/Tweet";
import { useParams } from "react-router-dom";
import { Typography } from '@mui/material';
import { useHistory } from "react-router-dom";
import { useEffect } from "react"
import { useWindowDimensions } from '../hooks/useWindowDimensions'
import { useSpring, animated } from 'react-spring'
import { useSelector } from "react-redux";

export default function Question() {
    const { number } = useParams();
    const { width } = useWindowDimensions();
    const answer = useSelector((state) => state.answer.value)
    const score = useSelector((state) => state.score.value)
    const tweetAuthor = useSelector((state) => state.tweetAuthor.value)
    const userName = useSelector((state) => state.userName.value)
    const history = useHistory();
    
    useEffect(() => {
        if (userName === '') { history.push('/') } // question page not from User
    });

    const titleStyle = useSpring({ 
        from: {marginTop: '-200px', opacity: 0}, 
        to: {marginTop: '0px', opacity: 1}, 
        delay: 500 })

    const navigate = () => {
        const pageNumberAsInt = parseInt(number)
        if (pageNumberAsInt >= 20) {
            history.push('/scoreboard')
        } else {
            history.push(`/question/${pageNumberAsInt+1}`)
        }
    }

    return (
        <animated.div style={titleStyle}>
            <Box className="questionOuterBox" sx={{width: Math.min(width - 32, 548)}} >
                <Typography sx={{fontSize: '24px'}}>Question {number} / 20</Typography>
                <div className="TweetWrapper">          
                    <TweetQuestion />
                </div>
                <Answers tweetAuthor={tweetAuthor} />
                <div className="questionFooter" >
                    <Typography sx={{fontSize: '24px'}}>Score: {score} / 20</Typography>
                    <Button 
                        disabled={answer === null}
                        onClick={navigate}
                        size="big"
                        sx={{fontSize: '18px'}}
                        variant="contained" >
                        Next
                    </Button>
                </div>
            </Box>
        </animated.div>
    )
}