import { useParams } from "react-router-dom";
import { useSpring, animated } from 'react-spring'
import { useSelector, useDispatch } from "react-redux";
import TweetQuestion from "../components/Tweet";
import Answers from "../components/Answers";
import { useHistory } from "react-router-dom";
import { resetScore } from '../redux/scoreSlice';
import { useEffect } from "react"

export default function Question() {
    const { number } = useParams();
    const tweetAuthor = useSelector((state) => state.tweetAuthor.value)
    const userName = useSelector((state) => state.userName.value)
    const score = useSelector((state) => state.score.value)
    const history = useHistory();
    const dispatch = useDispatch()
    
    // trigger on component mount
    useEffect(() => {
        // push back to home when got to question page from incorrect flow
        if (userName === '') { history.push('/') }
        // reset score if is first question (re-plays)
        if ( number === '1' ) { dispatch(resetScore()) }
    });

    const titleStyle = useSpring({ 
        from: {marginTop: '-400px', opacity: 0}, 
        to: {marginTop: '-200px', opacity: 1}, 
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
        <div>
            <animated.div style={titleStyle}>
                <h2>Here's your question number {number} / 20 buddy!</h2>
            </animated.div>
            <TweetQuestion />
            <Answers tweetAuthor={tweetAuthor} />
            <button onClick={navigate}>
                Next
            </button>
            <div>
                Score: {score}
            </div>
        </div>
    )
}