import React, { useState, useEffect } from 'react'
import {
  Box,
  ChakraProvider,
  InputRightElement,
  Button,
  Input,
  Grid,
  Stack,
  InputGroup,
  theme,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'

function App() {
  const [audio, setAudio] = useState(new (window.AudioContext || window.webkitAudioContext)())
  const [success, setSuccess] = useState([])
  const [sounds, setSounds] = useState([])
  const [games, setGames] = useState([
    {
      game: 'Dota 2',
      sfx: '/65243303.wav'
    },
    {
      game: 'Borderlands 2',
      sfx: '/65243303.wav'
    },
    {
      game: 'Half-Life 2',
      sfx: '/65243303.wav'
    },
    {
      game: 'Fuc\'k',
      sfx: '/65243303.wav'
    }
  ])

  useEffect(() => {
    fetchSfx()
  }, [])

  const fetchSfx = async () => {
    for (const game of games) {
      const response = await (
        await fetch(game.sfx)
      ).arrayBuffer()

      audio.decodeAudioData(response, (buffer) => {
        sounds.push(buffer)
      })
    }
  }

  const formatStr = (str) => {
    return str
      .split(' ')
      .join('')
      .toLowerCase()
      .replaceAll('’', '')
      .replaceAll('\'', '')
      .replaceAll('-', '')
  }

  const checkGame = (event, key) => {
    const value = event.target.value
    const question = games[key].game

    if ((formatStr(value) === formatStr(question)) || value === question) {
      setSuccess([...success, key])
      event.target.value = question
    }
  }

  const playSound = (key) => {
    const source = audio.createBufferSource()
    const buffer = sounds[key]
    const volume = audio.createGain()

    source.buffer = buffer
    volume.gain.value = 0.5
    volume.connect(audio.destination)
    source.connect(volume)
    source.start(0)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
        <Stack s={4} pl={4} pr={4}>
          {games.map(({ game }, key) => (
              <InputGroup key={key} size="md">
                <Input
                  p={4}
                  onChange={(event) => checkGame(event, key)}
                  variant="outline"
                  placeholder={key + 1}
                  isDisabled={success.includes(key)}
                  _disabled={{ background: '#48BB78' }}
                />
                {!success.includes(key) &&
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => playSound(key)}
                    >
                      Play
                    </Button>
                  </InputRightElement>
                }
              </InputGroup>
          ))}
        </Stack>
      </Box>
    </ChakraProvider>
  );
}

export default App