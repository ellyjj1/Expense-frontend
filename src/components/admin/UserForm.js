import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';

function UserForm({ baseURL, onSuccess, onError }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState('');

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
            setRegisterStatus('Passwords do not match!');
            return;
        }

        const data = JSON.stringify({
            username: username,
            password: password
        });

        const config = {
            method: 'post',
            url: baseURL + 'register/', // Adjust this URL as needed
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setRegisterStatus("User registered successfully!");
                onSuccess(); // Call the success callback
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.data && error.response.data.error) {
                    setRegisterStatus(error.response.data.error);
                } else {
                    setRegisterStatus('An error occurred');
                }
                onError(); // Call the error callback
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl id="username" mb={4} isRequired>
                <Flex align="center" justify="center" mt='1rem'>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter Username"
                        focusBorderColor="blue.500"
                        ml="3rem"
                        w='25rem'
                    />
                </Flex>
            </FormControl>

            <FormControl id="password" mb={4} isRequired>
                <Flex align="center" justify="center">
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter Password"
                        focusBorderColor="blue.500"
                        ml="3rem"
                        w='25rem'

                    />
                </Flex>
            </FormControl>

            <FormControl id="confirmPassword" mb={6} isRequired>
                <Flex align="center" justify="center">
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm Password"
                        focusBorderColor="blue.500"
                        ml="3rem"
                        w='25rem'

                    />
                </Flex>
            </FormControl>

            <Flex align="center" justify="center" mt={4}>
                <Button type="submit" colorScheme="blue">Register</Button>
            </Flex>
            {registerStatus && <Text color="red.500" textAlign="center" mt={2}>{registerStatus}</Text>}
        </form>
    );
}

export default UserForm;