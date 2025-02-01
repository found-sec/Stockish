// Spooky, scary skeletons
// Speak with such a screech
// You'll shake and shudder in surprise
// When you hear these zombies shriek

import { Card, CardBody, CardHeader, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

const NewsCardSkeleton = () => {
  return (
    <Card maxW="sm" h="100%">
      <CardHeader fontSize="sm" pb={2} display="flex" gap="2">
        <Skeleton height="20px" width="100px" />
        <Skeleton height="20px" width="80px" />
      </CardHeader>
      <CardBody pt={0}>
        <Stack spacing={4}>
          <Skeleton height="60px" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NewsCardSkeleton;
