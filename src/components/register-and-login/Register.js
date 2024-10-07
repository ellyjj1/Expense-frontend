import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext'
import { Button, Heading, Text, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [register_status, setRegister_status] = useState('');
    const { baseURL } = useContext(GlobalContext)
    const navigate = useNavigate(); // 创建 navigate 函数



    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent default form submission behavior

        if (password !== confirmPassword) {
            setRegister_status('Passwords do not match!');
            return;
        }

        const data = JSON.stringify({
            username: username,
            password: password
        });

        const config = {
            method: 'post',
            url: baseURL + 'register/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log("url:" + config.url)


        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));              
                setRegister_status("User registered successfully!");
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.data && error.response.data.error) {
                    setRegister_status(error.response.data.error);
                } else {
                    setRegister_status('An error occurred');
                }
            });
    };

    return (
        <div className="container mt-5">
            <Text
                bgGradient="linear(to-l, #7928CA, #0077ff)"
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
                textAlign='center'
                mt='3rem'
            >
                Welcome to Expense Tracker
            </Text>
            <Heading as='h2' textAlign='center' size='xl' mt={2}>Register Page</Heading>

            <Flex align="center"  mt={5}>
                <form onSubmit={handleSubmit}>

                    <FormControl id="username" mb={4} isRequired >
                        <Flex align="center" justify="space">
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder="Enter Username"
                                focusBorderColor="blue.500"
                                ml="3rem"
                            />
                        </Flex>
                    </FormControl>


                    <FormControl id="password" mb={4} isRequired>
                        <Flex align="center" justify="space">

                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter Password"
                                focusBorderColor="blue.500"
                                ml="3rem"
                            />
                        </Flex>

                    </FormControl>

                    <FormControl id="confirmPassword" mb={6} isRequired>
                        <Flex align="center" justify="space">

                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="Confirm Password"
                                focusBorderColor="blue.500"
                                ml="3rem"
                            />
                        </Flex>

                    </FormControl>

                    <Flex align="center" justify="center" mt={4}>
                        <Button type="submit" colorScheme="teal">Register</Button>
                    </Flex>
                </form>
            </Flex>
            <Flex align="flex" justify="center" mt={4}>
                {register_status && <p>{register_status}</p>}
            </Flex>

        </div>
    );
}

export default Register;
