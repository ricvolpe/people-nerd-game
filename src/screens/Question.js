import { useParams } from "react-router-dom";
import { useSpring, animated } from 'react-spring'
import { useSelector } from "react-redux";
import Tweet from "../components/Tweet";

export default function Question() {
    const { number } = useParams();
    const tweetAuthorID = useSelector((state) => state.tweetAuthorID.value)
    
    const props = useSpring({ 
        to: {
            marginTop: '-200px',
            opacity: 1
        }, 
        from: {
            marginTop: '-400px', 
            opacity: 0 
        }, delay: 500 })

    return (
        <animated.div style={props}>
            <h2>Here's your question number {number} buddy!</h2>
            {tweetAuthorID}
            <Tweet />
        </animated.div>
    )
}