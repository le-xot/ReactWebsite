import { Grid, useBreakpointValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

export function Container({ children }) {
  const column = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
    lg: 'repeat(5, 1fr)'
  })

  return (
    <GridContainer
      templateColumns={column}
      gap={4}
      pl={4}
      pr={4}
      pb={4}
    >
      {children}
    </GridContainer>
  )
}

const GridContainer = styled(Grid)`
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`