import { Box, Flex, Image, Text, Link } from '@chakra-ui/react';
import avatar1 from '../../assets/avatar1.png'; // 替换为正确的图片路径

export default function Footer() {
  return (
    <Box position="relative" zIndex="10" as="footer" bg='gray.100' mt='5rem'>
      <Box maxW="5xl" w="full" px={{ base: 4, xl: 0 }} py={{ base: 10, lg: 16 }} mx="auto" >
        <Flex align="center">
          <Image src={avatar1} alt="avatar1" w="16" h="auto" borderRadius="50"/>

          <Box borderLeft="1px" borderColor="neutral.700" pl={5} ml={5}>
            <Text fontSize="sm" color="neutral.400">
              2024 Jingjing Yu
              <Link
                fontSize="sm"
                color="neutral.400"
                ml={4}
                href="https://github.com/ellyjj1"
                isExternal
              >
                GitHub
              </Link>

              <Link
                fontSize="sm"
                color="neutral.400"
                ml={4}
                href="https://www.jingjing-portfolio.online/"
                isExternal
              >
                Portfolio
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
