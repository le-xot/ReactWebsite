import { Fireworks } from 'fireworks-js/dist/react'

export function Fire() {
  const options = {
    delay: {
      min: 10,
      max: 15
    },
    speed: 10,
    explosion: 8
  }

  const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed'
  }

  return (
    <Fireworks options={options} style={style} />
  )
}