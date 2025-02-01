import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  keyframes,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

// Create motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

//cursor pulse animation
const cursorPulse = keyframes`
  0% { border-right-color: #4cd6e9 }
  50% { border-right-color: transparent }
  100% { border-right-color: #4cd6e9 }
`;

function useTypewriter(text: string, speed: number = 150) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayText;
}

export default function HeroPage() {
  const navigate = useNavigate();
  const displayText = useTypewriter('Stoockish', 100); // Sorry I had to add the extra O or else the heading becomes "Stckish" :/

  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cursorAnimation = `${cursorPulse} 1.1s infinite`;

  return (
    <Box>
      <TickerTapeScript />
      
      <Container maxW="container.xl" px={5}>
        <MotionFlex
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
          transition={{ duration: 0.6 }}
          width="100%"
          justifyContent="center"
          alignItems="center"
          position="relative"
          mt={100}
        >
          <Box display="flex" alignItems="center">
            <Image
              src="/Logo.svg"
              alt="Stockish Logo"
              boxSize={{ base: "70px", md: "140px" }}
            />
            <Box
              textAlign="left"
              minWidth={{ base: "8ch", md: "10ch" }}
              ml={{ base: 5, md: 18 }}
              style={{ borderRight: '4px solid #4cd6e9', paddingRight: '4px' }}
              animation={cursorAnimation}
            >
              <Heading
                as="h1"
                size="4xl"
                fontSize={{ base: "6xl", md: "9xl" }}
                fontWeight="extrabold"
              >
                {displayText}
              </Heading>
            </Box>
          </Box>
        </MotionFlex>

        <Text
          fontSize="2xl"
          fontWeight="semibold"
          textAlign="center"
          mt={0}
        >
          THE platform to kickstart your stock trading journey
        </Text>

        {[1, 2, 3, 4].map((index) => (
          <MotionFlex
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariant}
            transition={{ duration: 0.6 }}
            mt={index === 1 ? 40 : 20}
            gap={16}
            direction={{ base: 'column', md: 'row' }}
            align="center"
          >
            {index % 2 === 1 ? (
              <>
                <MotionBox flex="1" variants={fadeInVariant}>
                  {index === 1 && (
                    <>
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
                    </>
                  )}
                  {index === 3 && (
                    <>
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
                    </>
                  )}
                </MotionBox>
                <MotionBox flex="1" variants={fadeInVariant}>
                  <Image
                    src={`/Showcase${index}.png`}
                    alt={`Showcase ${index}`}
                    borderRadius="lg"
                    objectFit="cover"
                    width="100%"
                    height="auto"
                  />
                </MotionBox>
              </>
            ) : (
              <>
                <MotionBox flex="1" variants={fadeInVariant}>
                  <Image
                    src={`/Showcase${index}.png`}
                    alt={`Showcase ${index}`}
                    borderRadius="lg"
                    objectFit="cover"
                    width="100%"
                    height="auto"
                  />
                </MotionBox>
                <MotionBox flex="1" variants={fadeInVariant}>
                  {index === 2 && (
                    <>
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
                    </>
                  )}
                  {index === 4 && (
                    <>
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
                    </>
                  )}
                </MotionBox>
              </>
            )}
          </MotionFlex>
        ))}

        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariant}
          transition={{ duration: 0.6 }}
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
        </MotionBox>
      </Container>
    </Box>
  );
}
