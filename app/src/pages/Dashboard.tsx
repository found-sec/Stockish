import { 
	Box,
	Flex,
	Spacer,
	Heading,
	Text,
	useBreakpointValue,
	Link,
} from "@chakra-ui/react";
import PortfolioPreview from "../components/PortfolioPreview";
import React, { useEffect } from "react";
import PositionsList from "../components/PositionsList";
import Newsfeed from "../components/Newsfeed";
import Watchlist from "../components/Watchlist";
import tokens from "../services/tokens.service";
import { Link as RouterLink } from "react-router-dom";

export default function Dashboard() {
	const isOnMobile = useBreakpointValue({ base: true, md: false });
	
	useEffect(() => {
		// Initialize TradingView widget
		const overviewScript = document.createElement("script");
		overviewScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
		overviewScript.async = true;
		overviewScript.innerHTML = JSON.stringify({
			colorTheme: "light",
			dateRange: "12M",
			showChart: true,
			locale: "en",
			largeChartUrl: "",
			isTransparent: true,
			showSymbolLogo: true,
			showFloatingTooltip: true,
			width: "100%",
			height: "400",
			plotLineColorGrowing: "rgba(34, 211, 238, 1)",
			plotLineColorFalling: "rgba(34, 211, 238, 1)",
			gridLineColor: "rgba(34, 211, 238, 0)",
			scaleFontColor: "rgba(34, 211, 238, 1)",
			belowLineFillColorGrowing: "rgba(34, 211, 238, 0.12)",	
			belowLineFillColorFalling: "rgba(34, 211, 238, 0.12)",
			belowLineFillColorGrowingBottom: "rgba(34, 211, 238, 0)",
			belowLineFillColorFallingBottom: "rgba(34, 211, 238, 0)",
			symbolActiveColor: "rgba(34, 211, 238, 0.12)",
			tabs: [
				{
					title: "Indices",
					symbols: [
						{ s: "FOREXCOM:SPXUSD", d: "S&P 500 Index" },
						{ s: "FOREXCOM:DJI", d: "Dow Jones Industrial Average Index" },
					],
					originalTitle: "Indices",
				},
			],
		});

		const overviewContainer = document.getElementById("tradingview-market-overview-widget");
		if (overviewContainer) {
			overviewContainer.appendChild(overviewScript);
		}

		//   return () => {
		// 	if (overviewContainer) {
		// 		overviewContainer.removeChild(overviewContainer)   -- uncomment this if you want the website to break
		// 	}
		// };

	}, []);

	return (
		<Box className="Dashboard">
			<Flex direction={{ base: "column", md: "row" }} gap={5}>
				<Box flex="0.75">
					{tokens.isAuthenticated() ? (
						<PortfolioPreview />
					) : (
						<>
							<Heading as="h1" size="xl">
								<Box as="span" fontWeight="bold">
									Stock
								</Box>
								<Box as="span" fontStyle="italic">
									-ish
								</Box>
							</Heading>
							<Text fontSize="lg">
								<Link as={RouterLink} to="/signup">
									Create an account
								</Link>{" "}
								or{" "}
								<Link as={RouterLink} to="/login">
									login
								</Link>{" "}
								to get started!
							</Text>

							{/* Indices Heading */}
							<Heading as="h2" size="md" mt="6">
								Indices
							</Heading>
							<Text fontSize="sm" mt="2">
								See how the market is doing
							</Text>
							{/* TradingView Widget */}
							<Box className="tradingview-widget-container" id="tradingview-market-overview-widget">
								<Box className="tradingview-widget-container__widget"></Box>
							</Box>
						</>
					)}
					{!isOnMobile && (
						<>
							<Spacer height={10} />
							<Heading size="md">Stock Market News</Heading>
							<Spacer height={2} />
							<Newsfeed symbol={""} />
						</>
					)}
				</Box>
				<Box
					flex="0.25"
					borderWidth={{ base: 0, md: 1 }}
					borderRadius="md"
					p={{ base: 0, md: 3 }}
					height={"fit-content"}
				>
					{tokens.isAuthenticated() ? (
						<>
							<PositionsList />
							<Spacer h="3" />
							<Watchlist />
						</>
					) : (
						<Box>
							<Heading as="h6" size="xs" textAlign={"center"}>
								Sign in to view positions and watchlist
							</Heading>
						</Box>
					)}
				</Box>
			</Flex>
			{isOnMobile && (
				<>
					<Spacer height={10} />
					<Heading size="md">Stock Market News</Heading>
					<Spacer height={2} />
					<Newsfeed symbol={""} />
				</>
			)}
		</Box>
	);
}