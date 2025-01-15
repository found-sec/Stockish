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
  Spinner,
  useTheme,
  CardFooter,
  Tag,
  HStack,
  Image,
} from "@chakra-ui/react";
import axios from "axios";

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

function Newsfeed({ symbol }: { symbol: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<NewsItem[]>([]);

  const theme = useTheme();
  const accentColor = theme?.components?.Link?.baseStyle?.color?.split(".")[0] || "blue";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`/api/news/${symbol || ""}`);
        const data = response.data;

        // Ensure data is an array before setting it to state
        if (Array.isArray(data)) {
          setNews(data.slice(0, 9)); // Slice to the first 9 items
        } else {
          console.error("News data is not an array", data);
          setNews([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [symbol]);

  if (isLoading) {
    return (
      <Stack align="center" justify="center" h="100%">
        <Spinner />
      </Stack>
    );
  }

  return (
    <SimpleGrid spacing={5} templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
      {news.map((item) => (
        <Card maxW="sm" h="100%" key={item.title}>
          <CardHeader fontSize="sm" pb={2} display="flex" gap="2">
            <Text whiteSpace="nowrap">{timeSince(item.publishedAt)}</Text>
            <Text
              color={`${accentColor}.500`}
              fontWeight="500"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {item.source}
            </Text>
          </CardHeader>
          <Link
            href={item.sourceUrl}
            color="inherit"
            isExternal
            _hover={{ textDecoration: "none" }}
          >
            <CardBody pt={0} h="100%">
              <HStack align="flex-start" spacing={4}>
                <Stack flex="1">
                  <Heading
                    size="sm"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    overflow="hidden"
                    css={{
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.title}
                  </Heading>
                  <Text
                    size="sm"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    overflow="hidden"
                    css={{
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
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
                    size="sm"
                  >
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
