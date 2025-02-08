import React from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  SimpleGrid,
  Link,
  Image,
} from "@chakra-ui/react";

const HowToTrade: React.FC = () => {
  const cardTitles = [
    "Investing: An Introduction",
    "How To Start Investing in Stocks in 2025 and Beyond",
    "Investing vs. Trading: What's the Difference?",
    "Bonds: How They Work and How To Invest",
    "Options vs. Futures: What’s the Difference?",
    "Managing a Portfolio",
  ];

  const cardImages = [
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1612010167108-3e6b327405f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1601382270349-49c15bddf738?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1534469650761-fce6cc26ac0d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1560221328-12fe60f83ab8?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const cardLinks = [
    "https://www.investopedia.com/articles/basics/11/3-s-simple-investing.asp",
    "https://www.investopedia.com/articles/basics/06/invest1000.asp",
    "https://www.investopedia.com/articles/basics/09/become-your-own-stock-analyst.asp",
    "https://www.investopedia.com/terms/b/bond.asp",
    "https://www.investopedia.com/ask/answers/difference-between-options-and-futures/",
    "https://www.investopedia.com/investing/importance-diversification/",
  ];

  const cardDescriptions = [
    "The investment landscape can be extremely dynamic and ever-evolving. But those who take the time to understand the basic principles and the different asset classes stand to gain significantly over the long haul.",
    "Investing in stocks can be a powerful way to grow your wealth over time. It involves buying shares in a company with the hope that the company will grow and perform well in the stock market for the long term, resulting in gains on your investment. ",
    "Investing and trading are two different methods of attempting to profit in the financial markets. Both investors and traders seek profits through market participation. ",
    "Bonds are used by companies, municipalities, states, and sovereign governments to finance projects and operations.",
    "Options and futures are derivatives that let investors speculate or hedge risk by agreeing to buy assets at preset prices and dates, though they operate under different rules and risk levels.",
    "By holding a variety of investments and having a diverse portfolioc, the poor performance of any one investment potentially can be offset by the better performance of another, leading to a more consistent overall return.",
  ];

  return (
    <Box position="relative" overflow="hidden">
      {/* background SVGs */}
      <Box
        position="absolute"
        top="-90px"
        left="-100px"
        width="150%"
        height="150%"
        zIndex={-1}
        backgroundImage="url('/lineVector_2_cyan_l.svg')"
        backgroundRepeat="no-repeat"
        backgroundPosition="top left"
        backgroundSize="contain"
        opacity={0.3}
      />
      <Box
      />

      {/* Main Content */}
      <Box p={5}>
        <Box>
          <Heading as="h1" size="3xl" fontWeight="bold" mb={6}>
            How To Trade
          </Heading>
          <Text fontSize="lg" mb={6} color="gray.600">
            Resources to help you learn how to trade stocks like a pro
          </Text>
          <Heading as="h1" size="xl" fontWeight="bold" mb={6}>
            Video Tutorials
          </Heading>
          <Flex
            gap={4}
            overflowX="auto"
            css={{
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "4px",
              },
            }}>
            <Box flexShrink={0}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/86rPBAnRCHc"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
            <Box flexShrink={0}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/dbDijzEgo7E"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
            <Box flexShrink={0}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/rpDdQ0N2l50"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
            <Box flexShrink={0}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/8Ij7A1VCB7I"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
            <Box flexShrink={0}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/tW13N4Hll88"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
            <Box flexShrink={0}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/lNdOtlpmH5U"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
            <Box flexShrink={0}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/iCzBVWdNOeE"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
            <Box flexShrink={0}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/p7HKvqRI_Bo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          </Flex>
          <Heading as="h2" size="xl" fontWeight="bold" my={8}>
            Trading Articles
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 4, md: 6 }}
            mx={{ base: 2, md: 0 }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Link
                key={index}
                href={cardLinks[index] || "#"}
                _hover={{ textDecoration: "none" }}>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="md"
                  transition="transform 0.2s ease-in-out"
                  _hover={{ transform: "translateY(-4px)" }}
                  overflow="hidden">
                  <Image
                    src={
                      cardImages[index] ||
                      `https://placehold.co/600x400/cyan/white?text=Article+${
                        index + 1
                      }`
                    }
                    alt={cardTitles[index]}
                    width="100%"
                    height="200px"
                    objectFit="cover"
                  />
                  <Box p={6}>
                    <Heading as="h3" size="md" color="cyan.500" mb={3}>
                      {cardTitles[index]}
                    </Heading>
                    <Text color="gray.600">{cardDescriptions[index]}</Text>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default HowToTrade;
