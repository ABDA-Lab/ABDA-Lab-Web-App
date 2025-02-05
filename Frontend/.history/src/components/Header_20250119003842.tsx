import { Box, Button, Container, Flex, Image } from '@chakra-ui/react';

export default function Header() {
    return (
        <Box as="header" py={4} boxShadow="sm" bg="white">
            <Container maxW="container.xl">
                <Flex justify="space-between" align="center">
                    {/* Logo Section */}
                    <Box>
                        <Image
                            src="/logo.png" // Replace with your logo path
                            alt="Logo"
                            h="40px"
                        />
                    </Box>

                    {/* Navigation Section */}
                    <Flex gap={6}>
                        <Button variant="ghost">Home</Button>
                        <Button variant="ghost">About</Button>
                        <Button variant="ghost">Services</Button>
                    </Flex>

                    {/* Login Section */}
                    <Box>
                        <Button colorScheme="blue">Login</Button>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}</Box>
