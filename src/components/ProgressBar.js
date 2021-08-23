import { Progress, ProgressLabel, useBreakpointValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

export function ProgressBar({ games, guessed }) {
  const height = useBreakpointValue({
    base: '10rem',
    sm: '5rem',
    md: '2.5rem',
    lg: '2rem'
  })

  return (
    <CustomProgress
      max={games.length}
      value={guessed.length}
      borderRadius={4}
      height={height}
      m={3}
      style={{ userSelect: "none" }}
    >
      <ProgressLabel fontSize={18}>{guessed.length}/{games.length}</ProgressLabel>
    </CustomProgress>
  )
}

const CustomProgress = styled(Progress)`
  & > div:first-of-type {
    background: var(--chakra-colors-blue-500);
  }
`