import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup } from '@chakra-ui/react'
import React, { useContext, useState} from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import axios from 'axios'


function AddTransaction({ onClose, isOpen }) {

    const { baseURL } = useContext(GlobalContext);
    const token = localStorage.getItem('authToken');


    const [formData, setformData] = useState({
        description: '',
        amount: 0,
        type: 'expense'
    });

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
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'api/transactions/',
            headers: { 
                "Authorization": "Token " + token,
                'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            setformData({ description: '', amount: '', type: 'expense' });
            onClose();
            window.location.reload()
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
                    <ModalHeader>Add New Transaction</ModalHeader>
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
