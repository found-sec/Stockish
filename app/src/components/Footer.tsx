import React from 'react';
import { Box, Container, Flex, Image, Link, Text, Icon, Divider } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      bgGradient="linear(to-r,rgb(15, 64, 80),rgb(12, 53, 92))"
      color="white"
      py={12}
      mt={32} // So genius I forgot to add this
    >
      <Container maxW="container.xl">
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align="stretch"
          position="relative"
          gap={{ base: 8, md: 0 }}
        >
          <Box 
            mb={{ base: 4, md: 0 }} 
            maxW={{ base: "100%", md: "45%" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Flex 
              direction="column" 
              align={{ base: "center", md: "start" }}
              h="100%"
            >
              <Flex 
                align="center" 
                mb={3} 
                direction={{ base: "column", md: "row" }}
              >
                <Image 
                  src="/Logo_white.svg" 
                  alt="Stockish Logo" 
                  h={{ base: "100px", md: "120px" }} 
                  mr={{ base: 0, md: 5 }}
                  mb={{ base: 2, md: 0 }}
                />
                <Text 
                  fontSize={{ base: "5xl", md: "7xl" }} 
                  fontWeight="bold" 
                  letterSpacing="wide"
                >
                  Stockish
                </Text>
              </Flex>
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color="gray.300"
                ml={{ base: 0, md: 3 }}
                px={{ base: 4, md: 0 }}
              >
                Learn trading by experience, without the cost.
              </Text>
              <Text 
                fontSize={{ base: "md", md: "m" }} 
                color="gray.300"
                ml={{ base: 0, md: 3 }}
                px={{ base: 4, md: 0 }}
                mt={12}
              >
                Found a bug or need help? Contact us{" "}
                <Link
                  href="mailto:anas.timeridjine@gmail.com" // Can't wait to get ~200 emails
                  color="blue.300"
                  _hover={{ color: "blue.200" }}
                >
                  here.
                </Link>
              </Text>
            </Flex>
          </Box>

          {/* Responsive Divider */}
          <Box display={{ base: "block", md: "none" }}>
            <Divider
              orientation="horizontal"
              position="relative"
              mx="auto"
              my={6}
              width="80%"
              height="2px"
              borderColor="whiteAlpha.600"
              borderWidth="1px"
            />
          </Box>
          <Box 
            display={{ base: "none", md: "block" }}
            position="relative"
            left="240px"  // This moves the divider closer to the contributors section
          >
            <Divider
              orientation="vertical"
              position="relative"
              mx="auto"
              height="240px"
              borderColor="whiteAlpha.600"
              borderWidth="2px"
            />
          </Box>

          <Flex 
            direction="column" 
            align={{ base: "center", md: "start" }} 
            gap={6}
            pl={{ base: 0, md: 8 }} 
            maxW={{ base: "100%", md: "45%" }}
          >
            <Box width="100%">
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                mb={6} 
                textAlign={{ base: "center", md: "left" }}
              >
                Made with ❤️ by
              </Text>
              <Flex 
                direction="column" 
                gap={4} 
                align={{ base: "center", md: "start" }}
                width="100%"
              >
                <Link href="https://github.com/SnowyCrest" isExternal width="100%">
                  <Flex align="center" gap={3} justify={{ base: "center", md: "start" }}>
                    <Image
                      src="https://github.com/SnowyCrest.png"
                      alt="SnowyCrest"
                      boxSize="50px"
                      borderRadius="full"
                    />
                    <Text fontSize="sm">Anas Timeridjine</Text>
                  </Flex>
                </Link>
                <Link href="https://github.com/found-sec" isExternal width="100%">
                  <Flex align="center" gap={3} justify={{ base: "center", md: "start" }}>
                    <Image
                      src="https://github.com/found-sec.png"
                      alt="FoundSec"
                      boxSize="50px"
                      borderRadius="full"
                    />
                    <Text fontSize="sm">Ashish Dhakal</Text>
                  </Flex>
                </Link>
              </Flex>
            </Box>

            <Link
              href="https://github.com/SnowyCrest/Stockish"
              isExternal
              display="flex"
              alignItems="center"
              justifyContent={{ base: "center", md: "flex-start" }}
              bg="whiteAlpha.200"
              px={4}
              py={2}
              borderRadius="md"
              width={{ base: "200px", md: "auto" }}
              _hover={{ bg: "whiteAlpha.300" }}
            >
              <Icon as={FaGithub} mr={2} />
              <Text>View on GitHub</Text>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
