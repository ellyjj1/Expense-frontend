import React, { useContext, useEffect, useState } from 'react'
import { Button, Flex, Heading, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, Text } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import Summary from '../summary/Summary'
import ExpenseView from '../expense-view/ExpenseView'
import { GlobalContext } from '../../context/GlobalContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function Main() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { totalIncome, settotalIncome, totalExpense, settotalExpense, baseURL } = useContext(GlobalContext)
  const token = localStorage.getItem("authToken")
  const navigate = useNavigate()

  // 添加预算状态
  const [budget, setBudget] = useState(10000);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + 'api/transactions/totals/',
      headers: {
        Authorization: "Token " + token
      }
    };

    axios.request(config)
      .then((response) => {
        settotalIncome(response.data.total_income)
        settotalExpense(response.data.total_expense)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [baseURL, settotalIncome, settotalExpense, token])

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/")
  }

  // 打开预算设置模态框
  const openBudgetModal = () => {
    setIsBudgetOpen(true);
  };

  // 关闭预算设置模态框
  const closeBudgetModal = () => {
    setIsBudgetOpen(false);
  };

  // 处理预算值的修改
  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  return (
    <Flex textAlign='center' flexDirection={'column '} pr={'5'} pl={'5'}>
      <Flex alignItems={'center'} justifyContent={'space-between'} mt={'12'} mb={'5'}>
        <Heading
          color={'blue.400'}
          display={["none", "block", "block", "block", "block"]}>
          Expense Tracker
        </Heading>
        <Flex alignItems={'center'}>
          <Button
            onClick={onOpen}
            colorScheme='blue'
            ml={'4'}
          >
            Add New Transaction
          </Button>
          <Button
            onClick={openBudgetModal} // 打开预算设置模态框
            colorScheme='green'
            ml={'4'}
          >
            Set Budget
          </Button>
          <Button
            onClick={handleLogout}
            colorScheme='gray' variant='outline'
            ml={'4'}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
      <Summary totalExpense={totalExpense} totalIncome={totalIncome} isOpen={isOpen} onClose={onClose} />
      {/* 显示预算和感叹号 */}
      <Flex ml="14rem" >
        <Flex>
          <Heading size={"md"} mb={"4"} color={"gray.600"} mt="2rem">
            Budget: {budget}</Heading>
          {totalExpense > budget && <WarningIcon mt="2rem" ml="1rem" w={5} h={5} color="red.500" />} {/* 超过预算时显示感叹号 */}
        </Flex>

      </Flex>
      <Flex w="full" alignItems={"flex-start"} justifyContent={"space-evenly"} flexDirection={["column", "column", "column", "row", "row"]}>
        <ExpenseView />
      </Flex>

      {/* 预算设置模态框 */}
      <Modal isOpen={isBudgetOpen} onClose={closeBudgetModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Budget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="number"
              value={budget}
              onChange={handleBudgetChange}
              placeholder="Enter your budget"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeBudgetModal}>Save</Button>
            <Button onClick={closeBudgetModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
