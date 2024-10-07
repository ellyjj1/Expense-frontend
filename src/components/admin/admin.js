import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';
import { Text, Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Flex } from '@chakra-ui/react';
import UserForm from './UserForm'; // Import the UserForm component;
import { Link } from 'react-router-dom';


function Admin() {
    const { baseURL } = useContext(GlobalContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Use useCallback to memoize fetchUsers
    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}api/users/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('authToken')}` // Include token for authentication
                }
            });
            setUsers(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    }, [baseURL]); // Add baseURL as a dependency

    useEffect(() => {
        // Call fetchUsers when the component mounts
        fetchUsers();
    }, [fetchUsers]); // Include fetchUsers in the dependency array

    const deactivateUser = async (userId) => {
        try {
            await axios.post(`${baseURL}api/users/${userId}/deactivate/`, {}, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('authToken')}`
                }
            });
            setUsers(users.map(user =>
                user.id === userId ? { ...user, is_active: false } : user
            )); // Update the user list to reflect the change
        } catch (err) {
            console.error(err);
            setError("Failed to deactivate user.");
        }
    };

    const handleUserAdded = () => {
        // Fetch users again to update the list after adding a new user
        fetchUsers();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Text
                bgGradient="linear(to-l, #7928CA, #0077ff)"
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
                textAlign='center'
                mt='3rem'
            >
                Welcome to Admin Page
            </Text>
            <Heading as='h2' textAlign='center' size='xl' mt={2}>User List</Heading>
            <Table variant='simple' m='2rem'>
                {/* <TableCaption>List of all users</TableCaption> */}
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Username</Th>
                        <Th>Active</Th>
                        <Th>Admin</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(user => (
                        <Tr key={user.id}>
                            <Td>{user.id}</Td>
                            <Td>{user.username}</Td>
                            <Td>{user.is_active ? 'Yes' : 'No'}</Td>
                            <Td>{user.is_staff ? 'Yes' : 'No'}</Td>
                            <Td>
                                <Button colorScheme='red' onClick={() => deactivateUser(user.id)}>Deactivate</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Heading as='h2' textAlign='center' size='xl' mt={2}>Add New Users</Heading>
            <UserForm baseURL={baseURL} onSuccess={handleUserAdded} onError={() => { }} mt='2rem' />
            <Link to="/"> {/* 添加注册链接 */}
                <Flex align="center" justify="center">
                    <Button colorScheme='gray' variant='outline' mt='3rem' mb='2rem' >
                        Back to Login Page
                    </Button>
                </Flex>
            </Link>
        </div>
    );
}

export default Admin;
