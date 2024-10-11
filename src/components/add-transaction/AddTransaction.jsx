import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup } from '@chakra-ui/react'
import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import axios from 'axios'


function AddTransaction({ onClose, isOpen, transaction }) {

    const { baseURL } = useContext(GlobalContext);
    const token = localStorage.getItem('authToken');


    const [formData, setformData] = useState({
        description: '',
        amount: 0,
        type: 'expense'
    });

    // 使用 useEffect 来更新表单数据
    useEffect(() => {
        if (transaction) {
            setformData({
                description: transaction.description,
                amount: transaction.amount,
                type: transaction.type
            });
        } else {
            setformData({
                description: '',
                amount: 0,
                type: 'expense'
            });
        }
    }, [transaction]); // 依赖于 transaction

    function handleFormChange(event) {
        setformData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent form from reloading the page

        let data = JSON.stringify({
            "description": formData.description,
            "amount": formData.amount,
            "type": formData.type,
        });

        let config = {
            method: transaction ? 'put' : 'post',
            maxBodyLength: Infinity,
            url: transaction ? `${baseURL}api/transactions/${transaction.id}/` : `${baseURL}api/transactions/`,
            headers: { 
                "Authorization": "Token " + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setformData({ description: '', amount: 0, type: 'expense' });
                onClose();
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{transaction ? 'Edit Transaction' : 'Add New Transaction'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Enter Description</FormLabel>
                            <Input
                                placeholder='Enter Description'
                                name='description'
                                type='text'
                                value={formData.description}  // Bind to state
                                onChange={handleFormChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Enter Amount</FormLabel>
                            <Input
                                placeholder='Enter Amount'
                                name='amount'
                                type='number'
                                value={formData.amount}
                                onChange={handleFormChange}
                            />
                        </FormControl>
                        <RadioGroup mt="5" value={formData.type} onChange={setformData}>
                            <Radio
                                
                                value='income' colorScheme='blue' name='type'
                                onChange={handleFormChange}
                            >
                                Income
                            </Radio>
                            <Radio
                                
                                value="expense" colorScheme='red' name='type'
                                onChange={handleFormChange}
                                ml="4"
                            >
                                Expense
                            </Radio>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose}  mr={"3"} type='submit'>Add</Button>
                        <Button onClick={onClose}>Cancel</Button>

                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default AddTransaction
