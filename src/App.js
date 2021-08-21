import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Input,
  Center,
  Button,
  Heading,
  Progress,
  InputGroup,
  IconButton,
  extendTheme,
  ChakraProvider,
  InputRightElement,
} from '@chakra-ui/react'
import {
  QuestionOutlineIcon
} from '@chakra-ui/icons'

import { Container } from './Container'
import { GithubCorner } from './GitHubCorner'

const audio = new (window.AudioContext || window.webkitAudioContext)()

function App() {
  const [success, setSuccess] = useState([])
  const [sounds, setSounds] = useState([])
  const [games, setGames] = useState([
    {
      game: 'Dota 2',
      sfx: 'sounds/id1.mp3'
    },
    {
      game: 'Minecraft',
      sfx: 'sounds/id2.mp3'
    },
    {
      game: 'Counter Strike',
      sfx: 'sounds/id3.mp3'
    },
    {
      game: 'Crash Bandicoot',
      sfx: '/sounds/id4.mp3'
    },
    {
      game: 'Dark Souls',
      sfx: 'sounds/id5.mp3'
    },
    {
      game: 'Overwatch',
      sfx: 'sounds/id6.mp3'
    },
    {
      game: 'Among Us',
      sfx: 'sounds/id7.mp3'
    },
    {
      game: 'World of Warcraft',
      sfx: 'sounds/id8.mp3'
    },
    {
      game: 'Undertale',
      sfx: 'sounds/id9.mp3'
    },
    {
      game: 'World of Tanks',
      sfx: 'sounds/id10.mp3'
    },
    {
      game: 'Half-Life',
      sfx: 'sounds/id11.mp3'
    },
    {
      game: 'Grand Theft Auto: San Andreas',
      sfx: 'sounds/id12.mp3'
    },
    {
      game: 'Rocket League',
      sfx: 'sounds/id13.mp3'
    },
    {
      game: 'Call of Duty: Warzone',
      sfx: 'sounds/id14.mp3'
    },
    {
      game: 'Papers, Please',
      sfx: 'sounds/id15.wav'
    },
    {
      game: 'Fortnite',
      sfx: 'sounds/id16.mp3'
    },
    {
      game: 'Cyberpunk 2077',
      sfx: 'sounds/id17.mp3'
    },
    {
      game: 'The Witcher 3: Wild Hunt',
      sfx: 'sounds/id18.mp3'
    },
    {
      game: 'ROBLOX',
      sfx: 'sounds/id19.mp3'
    },
    {
      game: 'Apex Legends',
      sfx: 'sounds/id20.mp3'
    },
    {
      game: 'Rust',
      sfx: 'sounds/id21.mp3'
    },
    {
      game: 'Portal 2',
      sfx: 'sounds/id22.mp3'
    },
    {
      game: 'Pay Day 2',
      sfx: 'sounds/id23.mp3'
    },
    {
      game: 'Red Dead Redemption 2',
      sfx: 'sounds/id24.mp3'
    },
    {
      game: 'L.A. Noire',
      sfx: 'sounds/id25.mp3'
    },
    {
      game: 'Duke Nukem',
      sfx: 'sounds/id26.mp3'
    },
    {
      game: 'Path of Exile',
      sfx: 'sounds/id27.mp3'
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

  const customTheme = extendTheme({
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false
    }
  })

  console.log(games);


  return (
    <ChakraProvider theme={customTheme} resetCSS>
      <Box textAlign="center" fontSize="xl">
        <GithubCorner />
        <Grid p={3}>
          <Heading p={4}>
            SFX Game Quiz
          </Heading>
        </Grid>
        <Container>
          {games.map((_, key) => (
            <InputGroup key={key} size="md">
              <Input
                p={4}
                onChange={(event) => checkGame(event, key)}
                variant="outline"
                placeholder={`Sound №${key + 1}`}
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
        </Container>
      </Box >
      <Center>
        <IconButton
          aria-label="Search database"
          icon={<QuestionOutlineIcon />}
          _active={{


          }}
        />
      </Center>
      <Progress
        max={games.length}
        value={success.length}
        height="30px"
        m={4}
      >
      </Progress>
      <Center>
        {success.length}/{games.length}
      </Center>
    </ChakraProvider >
  );
}

export default App