import { useParams } from "react-router-dom";
import { useSpring, animated } from 'react-spring'

export default function Question() {
    const { number } = useParams();
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
        </animated.div>
    )
}