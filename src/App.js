/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Grid,
  Input,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { Loading } from './components/Loading'
import { Container } from './components/Container'
import { ProgressBar } from './components/ProgressBar'
import { GithubCorner } from './components/GitHubCorner'
import { Fire as Fireworks } from './components/Fire'
import initialGames from './games.json'
import styled from '@emotion/styled'

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

function App() {
  const [guessed, setGuessed] = useState([])
  const [sounds, setSounds] = useState()
  const [games, setGames] = useState(initialGames)

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => fetchSfx(), [])

  const fetchSfx = async () => {
    const buffers = []

    for (const { game, sfx } of games) {
      const response = await (
        await fetch('/sounds/' + sfx)
      ).arrayBuffer()

      audioCtx.decodeAudioData(response, (buffer) => {
        buffers.push({ game, buffer })
      })
    }

    setSounds(buffers)
  }

  const formatStr = (str) => {
    return str
      .split(' ')
      .join('')
      .toLowerCase()
      .replaceAll('’', '')
      .replaceAll('\'', '')
      .replaceAll('-', '')
      .replaceAll('.', '')
      .replaceAll(',', '')
      .replaceAll(':', '')
  }

  const checkGame = (event, game) => {
    const value = event.target.value

    if (formatStr(value) === formatStr(game)) {
      setGuessed([...guessed, game])
      event.target.value = game
    }
  }

  const playSound = (game) => {
    const source = audioCtx.createBufferSource()
    const sound = sounds.find(v => v.game === game)
    const volume = audioCtx.createGain()

    if (process.env.NODE_ENV === 'development') {
      console.log(sound)
    }

    source.buffer = sound.buffer
    volume.gain.value = 1
    volume.connect(audioCtx.destination)
    source.connect(volume)
    source.start(6)
    console.log(source.buffer);
  }

  if (!sounds) {
    return (
      <Flex h="full" align="center" justify="center">
        <Loading />
      </Flex>
    )
  }

    return (
    <Main textAlign="center" fontSize="xl">
      <GithubCorner />
      <Grid p={3}>
        <Heading p={4}
          style={{ userSelect: "none" }}
        >
          SFX Game Quiz
        </Heading>
      </Grid>
      <Container>
        {games.map(({ game }, key) => (
          <InputGroup key={key} size="md">
            <Input
              style={{ userSelect: "none"}}
              variant="outline"
              placeholder={`Sound №${key + 1}`}
              disabled={guessed.includes(game)}
              onChange={(event) => checkGame(event, game)}
              _disabled={{background: 'green.400'}}
            />
            {!guessed.includes(game) &&
              <InputRightElement width="4rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => playSound(game)}
                >
                  Play
                </Button>
              </InputRightElement>
            }
          </InputGroup>
        ))}
      </Container>
      <ProgressBar games={games} guessed={guessed} />
      {guessed.length === games.length && <Fireworks />}
    </Main>
  )
}

const Main = styled(Box)`
  height: inherit;
  flex: auto;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
`

export default App