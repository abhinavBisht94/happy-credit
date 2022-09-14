//~ importing
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//~ importing Chakra
import { Box, Text, Grid, Button, ButtonGroup } from '@chakra-ui/react';

export const CardsDisplay = ({ data }) => {
  //   console.log('data:', data);

  //! Total Page
  const perPage = 9;
  const pages = Math.ceil(data.length / perPage);
  console.log('pages:', pages);
  let arrPage = [];
  for (let i = 1; i <= pages; i++) arrPage.push(i);

  //! Current Page
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Box>
      {/* //* Pagination */}
      <Box w="100%" m={'5rem auto'}>
        <Button
          colorScheme="yellow"
          mr={'5px'}
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
        >
          {'<'}
        </Button>

        {arrPage.map((elem, index) => {
          return (
            <Button
              key={elem}
              colorScheme="teal"
              variant={currentPage === elem ? 'solid' : 'outline'}
              mr={'5px'}
              onClick={() => setCurrentPage(elem)}
            >
              {elem}
            </Button>
          );
        })}

        <Button
          colorScheme="yellow"
          onClick={() => {
            if (currentPage < pages) setCurrentPage(currentPage + 1);
          }}
        >
          {'>'}
        </Button>
      </Box>

      {/* //* Displaying Data  */}

      <Box
        display="grid"
        gridTemplateColumns={[
          'repeat(1,1fr)',
          'repeat(2,1fr)',
          'repeat(2,1fr)',
          'repeat(3,1fr)',
        ]}
        gap="1rem"
      >
        {data.map((elem, index) => {
          //* Data Mapping according to which page it is in
          if (
            index >= currentPage * perPage - perPage &&
            index < currentPage * perPage
          ) {
            return (
              <Box
                key={elem.id}
                display={'flex'}
                flexDirection={'column'}
                justifyContent="space-between"
                p="2rem 1rem"
                boxShadow="#0ce9dafb 0px 2px 4px, #0ce9dafb 0px 7px 13px -3px,
                #0ce9dafb 0px -3px 0px inset"
              >
                <Text as="b" mb={'1rem'}>
                  {elem.title}
                </Text>
                <Text>{elem.body}</Text>
                <Button
                  colorScheme="messenger"
                  w={'40%'}
                  m="1rem auto 0rem"
                  onClick={() => {
                    axios(
                      `https://jsonplaceholder.typicode.com/users/${elem.userId}`
                    )
                      .then(res => {
                        alert(JSON.stringify(res.data));
                      })
                      .catch(err => {
                        console.log('err:', err);
                      });
                  }}
                >
                  View User
                </Button>
              </Box>
            );
          }
        })}
      </Box>
    </Box>
  );
};
