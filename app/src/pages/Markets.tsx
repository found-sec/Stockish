import React, { useEffect } from "react";
import TickerTapeScript from "../components/tickerTapeScript";

import {
	Box,
	Spacer,
	Heading,
} from "@chakra-ui/react";

import Newsfeed from "../components/Newsfeed";
import Watchlist from "../components/Watchlist";
import tokens from "../services/tokens.service";
import PositionsList from "../components/PositionsList";

const Markets: React.FC = () => {

  useEffect(() => {

    // Create script for TradingView screener widget
    const screenerScript = document.createElement("script");
    screenerScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    screenerScript.async = true;
    screenerScript.innerHTML = JSON.stringify({
      width: "100%", 
      height: "600",
      defaultColumn: "overview",
      defaultScreen: "most_capitalize",
      market: "america",
      showToolbar: true,
      colorTheme: "light",
      locale: "en",
      isTransparent: true,
    });

    const hotlistsScript = document.createElement("script");
    hotlistsScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
    hotlistsScript.async = true;
    hotlistsScript.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "12M",
      exchange: "US",
      showChart: true,
      locale: "en",
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      width: "100%",
      height: "700",
      plotLineColorGrowing: "rgba(34, 211, 238, 1)",
      plotLineColorFalling: "rgba(34, 211, 238, 1)",
      gridLineColor: "rgba(34, 211, 238, 0)",
      scaleFontColor: "rgba(34, 211, 238, 1)",
      belowLineFillColorGrowing: "rgba(34, 211, 238, 0.12)",
      belowLineFillColorFalling: "rgba(34, 211, 238, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(34, 211, 238, 0)",
      belowLineFillColorFallingBottom: "rgba(34, 211, 238, 0)",
      symbolActiveColor: "rgba(34, 211, 238, 0.12)",
    });

    // Create script for TradingView market overview widget
    const overviewScript = document.createElement("script");
    overviewScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    overviewScript.async = true;
    overviewScript.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      width: "100%",
      height: "1000",      
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
            { s: "NASDAQ:AAPL", d: "Apple" },
            { s: "NASDAQ:AMZN", d: "Amazon" },
            { s: "NASDAQ:GOOG", d: "Alphabet Inc." },
            { s: "NASDAQ:TSLA", d: "Tesla" },
            { s: "NASDAQ:META", d: "Meta (Facebook, Instagram, WhatsApp)" },
            { s: "NASDAQ:NFLX", d: "Netflix" },
            { s: "NYSE:RBLX", d: "Roblox Corporation" },
          ],
          originalTitle: "Indices",
        },
      ],
    });

    // Create script for TradingView single quote widget (for Amazon)
    const singleQuoteAMZNScript = document.createElement("script");
    singleQuoteAMZNScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    singleQuoteAMZNScript.async = true;
    singleQuoteAMZNScript.innerHTML = JSON.stringify({
      symbol: "NASDAQ:AMZN",
      width: 320,
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
      largeChartUrl: "http://stockish.vercel.app/stocks/AMZN",
    });

    // Create script for TradingView single quote widget (for Tesla)
    const singleQuoteTSScript = document.createElement("script");
    singleQuoteTSScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    singleQuoteTSScript.async = true;
    singleQuoteTSScript.innerHTML = JSON.stringify({
      symbol: "NASDAQ:TSLA",
      width: 320,
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
      largeChartUrl: "http://stockish.vercel.app/stocks/TSLA",
    });

    // Create script for TradingView single quote widget (for Apple)
    const singleQuoteAAPLScript = document.createElement("script");
    singleQuoteAAPLScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    singleQuoteAAPLScript.async = true;
    singleQuoteAAPLScript.innerHTML = JSON.stringify({
      symbol: "NASDAQ:AAPL",
      width: 320,
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
      largeChartUrl: "http://stockish.vercel.app/stocks/AAPL",
    });

    // Create script for TradingView single quote widget (for Microsoft)
    const singleQuoteMSScript = document.createElement("script");
    singleQuoteMSScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    singleQuoteMSScript.async = true;
    singleQuoteMSScript.innerHTML = JSON.stringify({
      symbol: "NASDAQ:MSFT",
      width: 320,
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
      largeChartUrl: "http://stockish.vercel.app/stocks/MSFT",
    });

    // Create script for TradingView single quote widget (for NVIDIA)
    const singleQuoteNVDAScript = document.createElement("script");
    singleQuoteNVDAScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    singleQuoteNVDAScript.async = true;
    singleQuoteNVDAScript.innerHTML = JSON.stringify({
      symbol: "NASDAQ:NVDA",
      width: 320,
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
      largeChartUrl: "http://stockish.vercel.app/stocks/NVDA",
    });

    // Append all scripts to their respective containers when the component mounts
    const screenerContainer = document.getElementById("tradingview-screener-widget");
    const overviewContainer = document.getElementById("tradingview-market-overview-widget");
    const singleQuoteAMZNContainer = document.getElementById("tradingview-single-quote-amzn-widget");
    const singleQuoteTSLAContainer = document.getElementById("tradingview-single-quote-tsla-widget");
    const singleQuoteAAPLContainer = document.getElementById("tradingview-single-quote-aapl-widget");
    const singleQuoteMSContainer = document.getElementById("tradingview-single-quote-msft-widget");
    const singleQuoteNVDAContainer = document.getElementById("tradingview-single-quote-nvda-widget");
    const hotlistsContainer = document.getElementById("tradingview-hotlists-widget");

  
    if (hotlistsContainer) {
      hotlistsContainer.appendChild(hotlistsScript);
    }

    if (screenerContainer) {
      screenerContainer.appendChild(screenerScript);
    }

    if (overviewContainer) {
      overviewContainer.appendChild(overviewScript);
    }

    if (singleQuoteAMZNContainer) {
      singleQuoteAMZNContainer.appendChild(singleQuoteAMZNScript);
    }

    if (singleQuoteTSLAContainer) {
      singleQuoteTSLAContainer.appendChild(singleQuoteTSScript);
    }

    if (singleQuoteAAPLContainer) {
      singleQuoteAAPLContainer.appendChild(singleQuoteAAPLScript);
    }

    if (singleQuoteMSContainer) {
      singleQuoteMSContainer.appendChild(singleQuoteMSScript);
    }

    if (singleQuoteNVDAContainer) {
      singleQuoteNVDAContainer.appendChild(singleQuoteNVDAScript);
    }

    // clean up scripts when the component unmounts
    // return () => {
    //   if (tickerTapeContainer) {
    //     tickerTapeContainer.removeChild(tickerTapeScript);
    //   }
    //   if (screenerContainer) {
    //     screenerContainer.removeChild(screenerScript);
    //   }
    //   if (overviewContainer) {
    //     overviewContainer.removeChild(overviewScript);
    //   }
    //   if (singleQuoteAMZNContainer) {
    //     singleQuoteAMZNContainer.removeChild(singleQuoteAMZNScript);
    //   }
    //   if (singleQuoteTSLAContainer) {
    //     singleQuoteTSLAContainer.removeChild(singleQuoteTSScript);
    //   }
    //   if (singleQuoteAAPLContainer) {
    //     singleQuoteAAPLContainer.removeChild(singleQuoteAAPLScript);
    //   }
    //   if (singleQuoteMSContainer) {
    //     singleQuoteMSContainer.removeChild(singleQuoteMSScript);
    //   }
    //   if (hotlistsContainer) {
    //     hotlistsContainer.removeChild(hotlistsScript);
    //   }
    // };
  }, []);

  return (
    <div>

      <TickerTapeScript />

      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginTop: "30px" }}>Market Overview</h1>


      <div className="tradingview-widget-container" id="tradingview-market-overview-widget">
        <div className="tradingview-widget-container__widget"></div>
      </div>

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

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "30px" }}>Popular Stocks</h1>


      <div style={{ display: "flex", gap: "25px", marginTop: "30px", marginBottom: "30px" }}>

        <div
          className="tradingview-widget-container"
          id="tradingview-single-quote-amzn-widget"
          style={{ width: "320px" }}
        >
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright">
          </div>
        </div>

        <div
          className="tradingview-widget-container"
          id="tradingview-single-quote-tsla-widget"
          style={{ width: "320px" }} 
        >
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright">
          </div>
        </div>

        <div
          className="tradingview-widget-container"
          id="tradingview-single-quote-aapl-widget"
          style={{ width: "320px" }} 
        >
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright">
          </div>
        </div>

        <div
          className="tradingview-widget-container"
          id="tradingview-single-quote-msft-widget"
          style={{ width: "320px"}} 
          
        >
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright">
          </div>
        </div>

        <div
          className="tradingview-widget-container"
          id="tradingview-single-quote-nvda-widget"
          style={{ width: "320px" }}
        >
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright">
          </div>
        </div>
      </div>

      <div className="tradingview-widget-container" id="tradingview-hotlists-widget">
        <div className="tradingview-widget-container__widget"></div>
      </div>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "30px" }}>Recent Stock Market News</h1>

      <>
							<Spacer height={10} />
							<Spacer height={2} />
							<Newsfeed symbol={""} />
						</>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "30px" }}>Stock Screener</h1>

      <div className="tradingview-widget-container" id="tradingview-screener-widget">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default Markets;
