import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react'
import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../context/GlobalContext'
import AddTransaction from '../add-transaction/AddTransaction'


function ExpenseView() {

  const { baseURL, allTransactions, setallTransactions } = useContext(GlobalContext)
  const token = localStorage.getItem('authToken')
  
  // 添加状态来控制模态框和当前编辑的交易
  const [isOpen, setIsOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'api/transactions/',
      headers: {
        "Authorization": "Token " + token,
        'Content-Type': 'application/json'
      }
    };

    axios.request(config)
      .then((response) => {
        setallTransactions(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [baseURL, setallTransactions, token])


  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Invalid date";  // Check if the date string exists

    const dateObj = new Date(dateTimeString);  // Create a Date object from the UTC string

    // Format the date and time using toLocaleString() to get the local time
    return dateObj.toLocaleString();  // Returns the date and time in the user's local time zone
  };

  const handleEdit = (transaction) => {
    setCurrentTransaction(transaction); // 设置当前编辑的交易
    setIsOpen(true); // 打开模态框
  };

  const handleClose = () => {
    setIsOpen(false); // 关闭模态框
    setCurrentTransaction(null); // 清空当前交易
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
            <Th>Action</Th> {/* 添加 Action 列 */}
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
                <Button colorScheme="blue" onClick={() => handleEdit(item)}>Edit</Button> {/* 添加 Edit 按钮 */}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* 添加 AddTransaction 组件 */}
      <AddTransaction 
        isOpen={isOpen} 
        onClose={handleClose} 
        transaction={currentTransaction} // 传递当前交易数据
      />
    </Box>
  )
}

export default ExpenseView
