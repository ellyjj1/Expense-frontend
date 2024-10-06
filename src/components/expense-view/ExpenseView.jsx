import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react'
import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../context/GlobalContext'


function ExpenseView() {

  const { baseURL, allTransactions, setallTransactions } = useContext(GlobalContext)
  const token = localStorage.getItem('authToken')


  useEffect(() => {
    let data = JSON.stringify({
      "description": "sep",
      "amount": 500,
      "type": "expense"
    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'api/transactions/',
      headers: {
        "Authorization": "Token " + token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setallTransactions(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [baseURL, setallTransactions,token])


  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Invalid date";  // Check if the date string exists

    const dateObj = new Date(dateTimeString);  // Create a Date object from the UTC string

    // Format the date and time using toLocaleString() to get the local time
    return dateObj.toLocaleString();  // Returns the date and time in the user's local time zone
  };

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/transactions/${id}/`, {
      headers: {
        "Authorization": "Token " + token,
      }
    })
    .then(() => {
      // Update the state to remove the deleted transaction
      setallTransactions(prevTransactions => prevTransactions.filter(item => item.id !== id));
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <Box
      flex={1}
      w="full"
      bg="white"
      mr="4"
      mt="10"
      p="5"
      pb="4"
      border="1px solid"
      borderColor="gray.100"
      borderRadius={"12"}
    >
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allTransactions.map(item => (
            <Tr key={item.id} bg={item.type === "expense" ? "red.50" : "blue.50"}>
               <Td wordBreak="break-word" maxW="200px">
               <Text fontWeight="bold">{item.description}</Text>
               </Td>
               <Td>
                <Text>{item.amount}</Text> 
              </Td>
              <Td>
                <Text>{formatDateTime(item.date)}</Text>
              </Td>
              <Td>
                <Button colorScheme="red" onClick={() => handleDelete(item.id)}>Delete</Button> 
              </Td>
            </Tr>
          ),
 
          )
          }
        </Tbody>
      </Table>
    </Box>
  )
}

export default ExpenseView
