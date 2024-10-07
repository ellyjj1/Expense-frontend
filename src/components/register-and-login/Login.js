import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { GlobalContext } from '../../context/GlobalContext'
import { Button, Input, Heading, Text, InputGroup, InputRightElement, Flex } from '@chakra-ui/react'

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [login_status, setLogin_status] = useState("")
    const { baseURL } = useContext(GlobalContext)
    const [show, setShow] = React.useState(false)//show password
    const handleClick = () => setShow(!show)
    const navigate = useNavigate(); // 创建 navigate 函数

    function usernameHandler(e) {
        setUsername(e.target.value)
    }

    function passwordHandler(e) {
        setPassword(e.target.value)
    }

    function login() {
        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'auth/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data,
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem('authToken', response.data.token); // Store token in local storage
                localStorage.setItem('username', username); // Store token in local storage

                setLogin_status("Login Success!");
                navigate('/main'); 
            })
            .catch((error) => {
                console.log(error);
                setLogin_status("Username or Password is wrong!")
            });
    }

    // New function for admin login
    function adminLogin() {
        let data = JSON.stringify({
            "username": username, 
            "password": password 
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'auth/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data,
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem('authToken', response.data.token); // Store token in local storage
                localStorage.setItem('username', username); // Store admin username in local storage

                setLogin_status("Admin Login Success!");
                navigate('/user-list'); // Redirect to user list page
            })
            .catch((error) => {
                console.log(error);
                setLogin_status("Admin Username or Password is wrong!");
            });
    }

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

            <Heading as='h2' textAlign='center' size='xl' mt={2}>Login Page</Heading>

            {/* Username Field */}
            <Flex align="center" justify="center" mt={4}>
                <Flex align="center" justify="center" w='25rem'>
                    <Text mr={2}>Username</Text>
                    <Input
                        type="text"
                        placeholder='Enter Username'
                        onChange={usernameHandler}
                        id={"username"}
                    />
                </Flex>
            </Flex>

            {/* Password Field */}
            <Flex align="center" justify="center" mt={4}>
                <Flex align="center" justify="center" w='25rem'>
                    <Text mr={2}>Password</Text>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            onChange={passwordHandler}
                            id={"password"}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            </Flex>

            {/* Login Button */}
            <Flex align="center" justify="center">
                <Flex align="center" justify="center" mt='2rem'>
                    <Button colorScheme='blue' id={"loginbtn"} onClick={login}>Login</Button>
                </Flex>
                <Link to="/register"> {/* 添加注册链接 */}
                    <Button colorScheme='blue' ml={'4'} mt='2rem'>
                        Register
                    </Button>
                </Link>
            </Flex>

            {/* Admin Login Button */}
            <Flex align="center" justify="center" mt='2rem'>
                <Button colorScheme='red' onClick={adminLogin}>Admin Login</Button>
            </Flex>

            {/* Login Status */}
            <Text align="center" justify="center" mt='2rem' id={'login_status'}>{login_status}</Text>
        </div>
    );
}

export default Login;