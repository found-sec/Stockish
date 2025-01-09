import React from 'react';
import TickerTapeScript from '../components/tickerTapeScript';
import {
  Box,
  Text,
  Container,
  Heading,
  Flex,
  Image,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

export default function HeroPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <TickerTapeScript />
      
      <Container maxW="container.xl" px={5}>
        <VStack spacing={4} align="center" mt={100}>

          <Flex
            width="100%"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <Image
              src="/hackathon_logo.svg"
              alt="Stockish Logo"
              boxSize={{ base: "70px", md: "140px" }}
              mr={{ base: 5, md: 18 }}
            />
            <Heading
              as="h1"
              size="4xl"
              fontSize={{ base: "6xl", md: "9xl" }}
              fontWeight={"extrabold"}
            >
              Stockish
            </Heading>
          </Flex>
          
          <Text
            fontSize="2xl"
            fontWeight="semibold"
            textAlign="center"
            mt={0}
          >
            THE platform to kickstart your stock trading journey
          </Text>
        </VStack>

        <Flex
          mt={40}
          gap={16}
          direction={{ base: 'column', md: 'row' }}
          align="center"
        >
          <Box flex="1">
            <Heading
              as="h2"
              size="lg"
              mb={4}
            >
            › Learn by experience, without the cost
            </Heading>
            <Text fontSize="lg" color="gray.600">
            <Text as="span" fontWeight="bold">
              We believe the best way to learn trading is by practicing it and going hands-on.
            </Text>
            {" "}For “Experience is the best teacher”; and we’ve followed this quote by providing you with a stock simulator with virtual money, connected to the real worldwide stock market, so that you can experiment and be able to go through any bumpy roads on your way to becoming a trading master without making any financial loss!
          </Text>
          </Box>

          <Box flex="1">
            <Image
              src="/Showcase1.png"
              alt="Homepage & Markets Showcase"
              borderRadius="lg"
              objectFit="cover"
              width="100%"
              height="auto"
            />
          </Box>
        </Flex>

        
        <Flex
          mt={20}
          gap={16}
          direction={{ base: 'column', md: 'row' }}
          align="center"
        >
          <Box flex="1">
            <Image
              src="/Showcase2.png"
              alt="How to trade Page Showcase"
              borderRadius="lg"
              objectFit="cover"
              width="100%"
              height="auto"
            />
          </Box>

          <Box flex="1">
            <Heading
              as="h2"
              size="lg"
              mb={4}
            >
              For students, By students
            </Heading>
            <Text fontSize="lg" color="gray.600">
            We know understanding the market and being a good trader is hard. So we’ve got you equipped with lots of tutorials and articles we recommend you check out, along with resources to help you find out which stocks are the best to invest in.
            </Text>
          </Box>
        </Flex>

        <Flex
          mt={20}
          gap={16}
          direction={{ base: 'column', md: 'row' }}
          align="center"
        >
          <Box flex="1">
            <Heading
              as="h2"
              size="lg"
              mb={4}
            >
              Data from the most reliable sources
            </Heading>
            <Text fontSize="lg" color="gray.600">
            To be a good trader, you gotta make sure you have the fastest, most accurate data. We’ve got you covered - we get our stock data from TradingView, and news from Yahoo Finance, so you can always stay in sync with how the market is going and become a very competitive trader.
            </Text>
          </Box>

          <Box flex="1">
            <Image
              src="/Showcase3.png"
              alt="Stock Chart showcase"
              borderRadius="lg"
              objectFit="cover"
              width="100%"
              height="auto"
            />
          </Box>
        </Flex>

        <Flex
          mt={20}
          gap={16}
          direction={{ base: 'column', md: 'row' }}
          align="center"
        >
          <Box flex="1">
            <Image
              src="/Showcase4.png"
              alt="Leaderboard Showcase"
              borderRadius="lg"
              objectFit="cover"
              width="100%"
              height="auto"
            />
          </Box>

          <Box flex="1">
            <Heading
              as="h2"
              size="lg"
              mb={4}
            >
              No risk - high reward
            </Heading>
            <Text fontSize="lg" color="gray.600">
            We’ve also got a leaderboard where everyone can compete against each other and see who earns the most money, so that you won’t just earn bragging rights and trading experience if you win, but real monetary rewards for your hard work!
            </Text>
          </Box>
        </Flex>

        <Box
          mt={40}
          mb={20}
          py={20}
          px={14}
          borderRadius="xl"
          bgGradient="linear(to-r, #4cd6e9ff,rgb(125, 172, 219))"
          color="white"
          textAlign="center"
        >
          <VStack spacing={3}>
            <Heading
              as="h2"
              size="xl"
            >
              So, what are you waiting for?
            </Heading>
            
            <Text
              fontSize="lg"
              maxW="2xl"
              
            >
              Create a new account to join us and get started on a new financial adventure!
            </Text>

            <Button
              size="lg"
              colorScheme="whiteAlpha"
              onClick={() => navigate('/signup')}
              mt={20}
            >
              Create an account
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
