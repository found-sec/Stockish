import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  SimpleGrid,
  Heading,
  Stack,
  Link,
  useTheme,
  CardFooter,
  Tag,
  HStack,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import NewsCardSkeleton from "./skeletons/NewsCardSkeleton";

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  symbols: string[];
  source: string;
  sourceUrl: string;
  url: string;
}

function timeSince(date: string) {
  const now = Date.now();
  const seconds = Math.floor((now - new Date(date).getTime()) / 1000);
  const intervals = [
    { name: "years", seconds: 31536000 },
    { name: "months", seconds: 2592000 },
    { name: "days", seconds: 86400 },
    { name: "hours", seconds: 3600 },
    { name: "minutes", seconds: 60 },
    { name: "seconds", seconds: 1 },
  ];

  for (const interval of intervals) {
    const value = Math.floor(seconds / interval.seconds);
    if (value >= 1) {
      return `${value} ${interval.name} ago`;
    }
  }

  return "Just now";
}

function Newsfeed(props: { symbol?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<NewsItem[]>([]);

  const accentColor =
    useTheme()["components"]["Link"]["baseStyle"]["color"].split(".")[0];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const endpoint = props.symbol
          ? `/api/news/${props.symbol}` // If a symbol is passed, call the specific endpoint
          : `/api/news`; // Otherwise, load general news for the dashboard

        const response = await axios.get(endpoint);

        if (response.headers["content-type"]?.includes("application/json")) {
          const data = response.data;
          if (Array.isArray(data)) {
            setNews(data.slice(0, 9)); // Take the first 9 items
          } else {
            console.error("News data is not an array:", data);
          }
        } else {
          console.error("API did not return JSON:", response.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [props.symbol]);

  if (isLoading) {
    return (
      <SimpleGrid
        spacing={1}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={5}>
        {[...Array(9)].map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid
      spacing={1}
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={5}>
      {news.map((item) => (
        <Card maxW="sm" h="100%" key={item.title}>
          <CardHeader fontSize="sm" pb={2} display="flex" gap="2">
            <Text whiteSpace="nowrap">{timeSince(item.publishedAt)}</Text>
            <Text
              color={accentColor + ".500"}
              fontWeight="500"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap">
              {item.source}
            </Text>
          </CardHeader>
          <Link
            href={item.sourceUrl}
            color="inherit"
            isExternal
            _hover={{ textDecoration: "none" }}>
            <CardBody pt={0} h="100%">
              <HStack align="flex-start" spacing={4}>
                <Stack flex="1">
                  <Heading
                    size="sm"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    overflow="hidden"
                    css="-webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                    {item.title}
                  </Heading>
                  <Text
                    size="sm"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    overflow="hidden"
                    css="-webkit-line-clamp: 6; -webkit-box-orient: vertical;">
                    {item.description}
                  </Text>
                </Stack>
                {item.url && (
                  <Image
                    src={item.url}
                    alt={item.title}
                    boxSize="60px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                )}
              </HStack>
            </CardBody>
          </Link>
          {item.symbols.length > 0 && (
            <CardFooter as={Stack}>
              <Text fontSize="sm" fontWeight="500" mr="2">
                Symbols:
              </Text>
              <HStack flexWrap="wrap">
                {item.symbols.map((symbol) => (
                  <Tag
                    as={Link}
                    href={`/stocks/${symbol}`}
                    key={symbol}
                    colorScheme={accentColor}
                    size="sm">
                    {symbol}
                  </Tag>
                ))}
              </HStack>
            </CardFooter>
          )}
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default Newsfeed;
