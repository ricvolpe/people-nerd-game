import { useSpring, animated, config } from 'react-spring'

export default function ArrowNext() {
    const { x } = useSpring({
      from: { x: 0 },
      x: 2,
      delay: 200,
      config: config.molasses,
    })
  
    return (
      <animated.svg
        style={styles.svg}
        strokeWidth={x}
        fill="transparent"
        stroke="#00CECB"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewbox='0, 0, 100, 100'>
        <polygon points="0,0 100,50 0,100 20,50" />
      </animated.svg>
    )
  }

const styles = {
    svg: {
        margin: 20,
        height: '10rem',
        width: '10rem',
        position: 'absolute',
        bottom: '30px',
        right: '30px',
    }
}