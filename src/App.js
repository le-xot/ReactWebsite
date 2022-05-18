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
  const [sources, setSources] = useState([])
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
    return str.match(/([A-Za-z0-9])/gm).join("").toLowerCase();
  }

  const checkGame = (event, game) => {
    const value = event.target.value

    if (formatStr(value) === formatStr(game)) {
      setGuessed([...guessed, game])
      event.target.value = game
    }
  }

  const playSound = (game, key) => {
    for (let i = 0; i < sounds.length; i++) {
      if (sources[i]) {
        sources[i].currentTime = 0
        sources[i].stop(0)
      }
    }

    const sound = sounds.find(v => v.game === game)
    const source = audioCtx.createBufferSource()
    const volume = audioCtx.createGain()

    if (process.env.NODE_ENV === 'development') {
      console.log(sound)
    }

    sources[key] = source
    source.buffer = sound.buffer
    volume.gain.value = 0.5
    source.connect(audioCtx.destination)
    source.start(0)
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
                  onClick={() => playSound(game,key)}
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
