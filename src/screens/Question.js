import { useParams } from "react-router-dom";
import { useSpring, animated } from 'react-spring'
import { useSelector } from "react-redux";
import Tweet from "../components/Tweet";
import Answers from "../components/Answers";

export default function Question() {
    const { number } = useParams();
    const tweetAuthorID = useSelector((state) => state.tweetAuthorID.value)
    
    const titleStyle = useSpring({ 
        from: {marginTop: '-400px', opacity: 0}, 
        to: {marginTop: '-200px', opacity: 1}, 
        delay: 500 })

    return (
        <div>
            <animated.div style={titleStyle}>
                <h2>Here's your question number {number} buddy!</h2>
            </animated.div>
            {tweetAuthorID}
            <Tweet />
            <Answers />
        </div>
    )
}