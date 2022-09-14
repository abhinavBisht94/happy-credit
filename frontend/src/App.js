//~ importing
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//~ importing Chakra
import { ChakraProvider, Box, Text, Input, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { CardsDisplay } from './components/CardsDisplay';

function App() {
  //! Fetching data
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        console.log('res:', res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log('err:', err);
      });
  }

  //! Search input
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search.length >= 3) {
      axios(`https://jsonplaceholder.typicode.com/posts?title_like=^${search}`)
        .then(res => {
          console.log('res:', res.data);
          setData(res.data);
        })
        .catch(err => {
          console.log('err:', err);
        });
    } else {
      fetchData();
    }
  }, [search]);

  return (
    <ChakraProvider theme={theme}>
      <Box m="auto" w="10%">
        <ColorModeSwitcher />
      </Box>

      <Box textAlign="center" w={'80%'} m="auto">
        <Box m={'1rem auto 3rem'} w={['90%', '80%', '60%', '40%']}>
          <Input
            variant="filled"
            placeholder="Search Here . . . ."
            onChange={e => {
              console.log('e:', e.target.value);
              setSearch(e.target.value);
            }}
          />
        </Box>

        {data && <CardsDisplay data={data} />}
      </Box>
    </ChakraProvider>
  );
}

export default App;
