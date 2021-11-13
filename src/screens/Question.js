import { useParams } from "react-router-dom";
import { useSpring, animated } from 'react-spring'
import { useSelector } from "react-redux";
import Tweet from "../components/Tweet";
import Answers from "../components/Answers";
import { useHistory } from "react-router-dom";

export default function Question() {
    const { number } = useParams();
    const tweetAuthor = useSelector((state) => state.tweetAuthor.value)
    const score = useSelector((state) => state.score.value)
    const history = useHistory();
    
    const titleStyle = useSpring({ 
        from: {marginTop: '-400px', opacity: 0}, 
        to: {marginTop: '-200px', opacity: 1}, 
        delay: 500 })

    return (
        <div>
            <animated.div style={titleStyle}>
                <h2>Here's your question number {number} buddy!</h2>
            </animated.div>
            <Tweet />
            <Answers tweetAuthor={tweetAuthor} />
            <button onClick={() => {history.push(`/question/${parseInt(number)+1}`)}}>
                Next
            </button>
            <div>
                Score: {score}
            </div>
        </div>
    )
}