// Spooky, scary skeletons
// Send shivers down your spine
// Shrieking skulls will shock your soul
// Seal your doom tonight

import React from "react";
import {
  Box,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const LeaderboardSkeleton = () => {
  return (
    <Box>
      <Skeleton height="36px" width="200px" mx="auto" mb={4} />
      <Skeleton height="40px" width="50%" mx="auto" mb={4} />
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th p={{ base: 2, md: 4 }}>Rank</Th>
            <Th p={{ base: 2, md: 4 }}>Username</Th>
            <Th p={{ base: 2, md: 4 }}>Portfolio Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(10)].map((_, index) => (
            <Tr key={index}>
              <Td p={{ base: 2, md: 4 }}>
                <Skeleton height="20px" width="30px" />
              </Td>
              <Td p={{ base: 2, md: 4 }}>
                <Skeleton height="20px" width="120px" />
              </Td>
              <Td p={{ base: 2, md: 4 }}>
                <Skeleton height="20px" width="100px" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LeaderboardSkeleton;
