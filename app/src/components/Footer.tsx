import React from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  Text,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      bgGradient="linear(to-r,rgb(15, 64, 80),rgb(12, 53, 92))"
      color="white"
      py={12}
      mt={10}
      position="relative"
      zIndex={1}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align="stretch"
          position="relative"
          gap={{ base: 8, lg: 0 }}>
          <Box
            mb={{ base: 4, lg: 0 }}
            maxW={{ base: "100%", lg: "45%" }}
            textAlign={{ base: "center", lg: "left" }}>
            <Flex
              direction="column"
              align={{ base: "center", lg: "start" }}
              h="100%">
              <Flex
                align="center"
                mb={3}
                direction={{ base: "column", lg: "row" }}>
                <Image
                  src="/Logo_white.svg"
                  alt="Stockish Logo"
                  h={{ base: "100px", lg: "120px" }}
                  mr={{ base: 0, lg: 5 }}
                  mb={{ base: 2, lg: 0 }}
                />
                <Text
                  fontSize={{ base: "5xl", lg: "7xl" }}
                  fontWeight="bold">
                  Stockish
                </Text>
              </Flex>
              <Text
                fontSize={{ base: "lg", lg: "xl" }}
                color="gray.300"
                ml={{ base: 0, lg: 3 }}
                px={{ base: 4, lg: 0 }}>
                Learn trading by experience, without the cost.
              </Text>
              <Text
                fontSize={{ base: "lg", lg: "m" }}
                color="gray.300"
                ml={{ base: 0, lg: 3 }}
                px={{ base: 4, lg: 0 }}
                mt={12}>
                Found a bug or need help? Contact us{" "}
                <Link
                  href="mailto:anas.timeridjine@gmail.com" // Can't wait to get ~200 emails
                  color="blue.300"
                  _hover={{ color: "blue.200" }}>
                  here.
                </Link>
              </Text>
            </Flex>
          </Box>

          {/* Responsive Divider */}
          <Box display={{ base: "block", lg: "none" }}>
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
            display={{ base: "none", lg: "block" }}
            position="relative"
            left="240px">
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
            align={{ base: "center", lg: "start" }}
            gap={6}
            pl={{ base: 0, lg: 8 }}
            maxW={{ base: "100%", lg: "45%" }}>
            <Box width="100%">
              <Text
                fontSize={{ base: "lg", lg: "xl" }}
                mb={6}
                textAlign={{ base: "center", lg: "left" }}>
                Made with ❤️ by
              </Text>
              <Flex
                direction="column"
                gap={4}
                align={{ base: "center", lg: "start" }}
                width="100%">
                <Link
                  href="https://github.com/SnowyCrest"
                  isExternal
                  width="100%">
                  <Flex
                    align="center"
                    gap={3}
                    justify={{ base: "center", lg: "start" }}>
                    <Image
                      src="https://github.com/SnowyCrest.png"
                      alt="SnowyCrest"
                      boxSize="50px"
                      borderRadius="full"
                    />
                    <Text fontSize="sm">Anas Timeridjine</Text>
                  </Flex>
                </Link>
                <Link
                  href="https://github.com/found-sec"
                  isExternal
                  width="100%">
                  <Flex
                    align="center"
                    gap={3}
                    justify={{ base: "center", lg: "start" }}>
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
              href="https://github.com/found-sec/Stockish"
              isExternal
              display="flex"
              alignItems="center"
              justifyContent={{ base: "center", lg: "flex-start" }}
              bg="whiteAlpha.200"
              px={4}
              py={2}
              borderRadius="lg"
              width={{ base: "200px", lg: "auto" }}
              _hover={{ bg: "whiteAlpha.300" }}>
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
