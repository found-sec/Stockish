// We're sorry, skeletons, you're so misunderstood
// You only want to socialize (but I don't think we should)

// 'Cause spooky, scary skeletons
// Shout startling, shrilly screams
// They'll sneak from their sarcophagus
// And just won't leave you be

import { Box, Flex, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

const StockProfileSkeleton = () => {
  return (
    <Box width="100%">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Stack width="100%">
          <Skeleton height="40px" width="200px" />
          <Skeleton height="24px" width="150px" />
        </Stack>
        <Skeleton height="40px" width="180px" />
      </Flex>
      <Skeleton height="600px" width="100%" />
      <Box mt={4}>
        <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
      </Box>
    </Box>
  );
};

export default StockProfileSkeleton;
