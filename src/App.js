import React from 'react';
import { Container, Flex, Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom'; // 引入 Routes 和 Route
import './App.css';
import Main from './components/main/Main';
import Login from './components/register-and-login/Login'; // 引入 Login 组件
import Register from './components/register-and-login/Register'; // 引入 Register 组件
import Admin from './components/admin/admin'; // 引入 Admin 组件
import Footer from './components/footer/Footer';

function App() {
  return (
    <Container bg={'#f8fafd'} maxW={'Container.3xl'} height={'100vh'} p={'0'}>
      <Flex height={'full'}>
        <Box height={'full'} flex={5} w={['20%', '30%', '40%', '50%', '60%']}>
          {/* 定义路由 */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-list" element={<Admin />} /> {/* 确保使用 Admin 组件 */}

          </Routes>
          <Footer />
        </Box>
      </Flex>
    </Container>
  );
}

export default App;
