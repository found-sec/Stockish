import React, { useState, useEffect } from "react";
import { Box, Text, CloseButton, Flex } from "@chakra-ui/react";

const MarketStatusBar = () => {
  const [isMarketClosed, setIsMarketClosed] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const checkMarketStatus = () => {
    const now = new Date();
    const nyTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    ); // use newyork time
    const day = nyTime.getDay();
    const hour = nyTime.getHours();
    const minute = nyTime.getMinutes();
    const currentTime = hour * 60 + minute;

    // checks if it's weekend
    if (day === 0 || day === 6) {
      setIsMarketClosed(true);
      return;
    }

    // market hours: 9:30 AM - 4:00 PM ET
    const marketOpen = 9 * 60 + 30;
    const marketClose = 16 * 60;

    setIsMarketClosed(currentTime < marketOpen || currentTime >= marketClose);
  };

  useEffect(() => {
    checkMarketStatus();
    const interval = setInterval(checkMarketStatus, 60000); // checks every minute
    return () => clearInterval(interval);
  }, []);

  if (!isVisible || !isMarketClosed) return null;

  return (
    <Box
      bg="linear-gradient(90deg,rgb(250, 230, 115) 0%,rgb(248, 188, 75) 100%)"
      p={1}
      position="relative"
      width="100%"
      zIndex="1000">
      <Flex align="center" justify="center">
        <Text
          color="white"
          fontWeight="medium"
          textAlign="center"
          fontSize="sm"
          mr={8}>
          The stock market is closed - Portfolio values may not update
        </Text>
        <CloseButton
          size="sm"
          color="white"
          onClick={() => setIsVisible(false)}
          _hover={{ opacity: 0.8 }}
        />
      </Flex>
    </Box>
  );
};

export default MarketStatusBar;
