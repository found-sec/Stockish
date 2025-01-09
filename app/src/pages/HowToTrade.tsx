import React from 'react';
import { Box, Heading, Flex, Text, SimpleGrid, Link, Image } from '@chakra-ui/react';

const HowToTrade: React.FC = () => {
  const cardTitles = [
    "Introduction to Stocks", 
    "Stock Trading Basics",
    "Stock Research",
    "Introduction to Options",
    "Managing a Portfolio",
    "Options Strategies"
  ];

  const cardImages = [
    "https://www.investopedia.com/thmb/4MXyI1WRNrKV0jNmBuZ81sQKnX8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/stockmarket.asp-d2f34bb1e91444069bc6e9b24cfdf6e8.jpg",
    "https://www.investopedia.com/thmb/gz7z6CgH_EnmtN_IgL5eDVSalSw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Primary-Image-how-to-invest-in-esg-in-2023-7499371-35a96ba3de4247538dd0f95dc43f9103.jpg",
    "https://cdn.corporatefinanceinstitute.com/assets/stock-analysis.jpeg",
    // "/path/to/options-intro-image.jpg",
    // "/path/to/portfolio-image.jpg",
    // "/path/to/options-strategies-image.jpg"
  ];

  const cardLinks = [
    "https://www.investopedia.com/terms/s/stockmarket.asp",
    "https://www.investopedia.com/ask/answers/12/difference-investing-trading.asphttps://example.com/trading-basics",
    "https://www.investopedia.com/articles/basics/09/become-your-own-stock-analyst.asp",
    "https://example.com/options-intro",  
    "https://example.com/portfolio-management",
    "https://example.com/options-strategies"
  ];

  const cardDescriptions = [
    "Learn the fundamentals of stock markets, including what stocks are and how they work.",
    "Master the essential concepts and techniques for successful stock trading.",
    "Discover how to research and analyze stocks to make informed investment decisions.",
    "Understand the basics of options trading and how to get started.",
    "Learn effective strategies for building and managing your investment portfolio.",
    "Explore advanced options trading strategies to maximize your potential returns."
  ];

  return (
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
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
            },
          }}
        >
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
        <SimpleGrid columns={3} spacing={6}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Link 
              key={index} 
              href={cardLinks[index] || "#"}
              _hover={{ textDecoration: 'none' }}
            >
              <Box 
                borderWidth="1px" 
                borderRadius="lg" 
                boxShadow="md"
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: 'translateY(-4px)' }}
                overflow="hidden"
              >
                <Image
                  src={cardImages[index] || `https://placehold.co/600x400/cyan/white?text=Article+${index + 1}`}
                  alt={cardTitles[index]}
                  width="100%"
                  height="200px"
                  objectFit="cover"
                />
                <Box p={6}>
                  <Heading 
                    as="h3" 
                    size="md" 
                    color="cyan.500" 
                    mb={3}
                  >
                    {cardTitles[index]}
                  </Heading>
                  <Text color="gray.600">
                    {cardDescriptions[index]}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default HowToTrade;
