import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Input,
  Table,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useTheme,
} from "@chakra-ui/react";
import LeaderboardSkeleton from "../components/skeletons/LeaderboardSkeleton";

interface LeaderboardUser {
  username: string;
  value: number;
}

const format = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Use theme for accent color
  let accentColor =
    useTheme()["components"]["Link"]["baseStyle"]["color"].split(".")[0];

  // Function to fetch leaderboard data
  const fetchLeaderboard = () => {
    setIsLoading(true);
    axios
      .get(`/api/user/leaderboard?timestamp=${Date.now()}`)
      .then((res) => {
        setLeaderboard(res.data.users);
        setIsLoading(false);
        console.log("Fetched leaderboard data:", res.data.users);
      })
      .catch((err) => {
        console.log("Error fetching leaderboard data:", err);
        setIsLoading(false);
      });
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchLeaderboard(); // Initial data fetch
  }, []); // Empty dependency array ensures it runs only once on mount

  // Filtered leaderboard based on search query
  const filteredLeaderboard = leaderboard.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  return (
    <Box className="leaderboard">
      <Heading size="lg" mb={4} textAlign="center">
        Leaderboard
      </Heading>
      <Box mb={4} textAlign="center">
        <Input
          placeholder="Search by username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          width={{ base: "100%", md: "50%" }}
        />
      </Box>
      <Box overflowY="auto" maxHeight="500px">
        <Table variant="simple" colorScheme="gray">
          <Thead>
            <Tr>
              <Th p={{ base: 2, md: 4 }}>Rank</Th>
              <Th p={{ base: 2, md: 4 }}>Username</Th>
              <Th p={{ base: 2, md: 4 }}>Portfolio Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredLeaderboard.map((user, index) => (
              <Tr key={index}>
                <Td p={{ base: 2, md: 4 }}>
                  <Tag colorScheme={index === 0 ? accentColor : "white"}>
                    #{index + 1}
                  </Tag>
                </Td>
                <Td
                  p={{ base: 2, md: 4 }}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  maxW={5}
                >
                  {user.username}
                </Td>
                <Td p={{ base: 2, md: 4 }}>{format(user.value)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default Leaderboard;
