import { Grid, useBreakpointValue } from "@chakra-ui/react"

export function Container({ children }) {
  const column = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(5, 1fr)'
  })
  
  return (
    <Grid
      templateColumns={column}
      gap={4}
      pl={4}
      pr={4}
      pb={4}
    >
      {children}
    </Grid>
  )
}