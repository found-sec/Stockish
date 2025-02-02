import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Heading, Spacer, Flex, Box, Button } from "@chakra-ui/react";
import axios from "axios";
import symbolMap from "../../../server/src/utils/symbolMap";
import SymbolProfileWidget from "../components/SymbolProfile";
import accounts from "../services/accounts.service";
import tokens from "../services/tokens.service";
import Newsfeed from "../components/Newsfeed";
import TransactionPane from "../components/TransactionPane";
import StockChart from "../components/StockChart";
import SymbolInfoWidget from "../components/SymbolInfo";
import StockProfileSkeleton from "../components/skeletons/StockProfileSkeleton";

import { AddIcon, MinusIcon } from "@chakra-ui/icons";

function StockView() {
  const { symbol } = useParams();
  const location = useLocation();
  const mappedSymbol = symbol ? symbolMap[symbol] || symbol : "";

  const [onWatchlist, setOnWatchlist] = useState(false);

  const [stock, setStock] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      symbol: mappedSymbol,
      longName: "",
      regularMarketPrice: -1,
      regularMarketChangePercent: 0,
    }
  );

  useEffect(() => {
    // Check if stock is on watchlist
    if (tokens.isAuthenticated()) {
      accounts.getWatchlist(true).then((res: any[]) => {
        setOnWatchlist(res.some((stock) => stock.symbol === symbol));
      });
    }

    axios
      .get(`/api/stocks/${symbol}/info`)
      .then((res) => {
        setStock({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  if (stock.regularMarketPrice < 0) {
    return <StockProfileSkeleton />;
  }

  return (
    <>
      {stock.regularMarketPrice > 0 && (
        <Flex direction={{ base: "column", md: "row" }} width="100%" gap={4}>
          <Box width="100%">
            <Flex 
              justifyContent="space-between" 
              alignItems="center" 
              mb={4}
              flexDirection={{ base: "column", sm: "row" }}
              gap={2}
            >
              <Box width="100%">
                <SymbolInfoWidget symbol={mappedSymbol} width="100%" />
              </Box>
              {tokens.isAuthenticated() && (
                <Box flexShrink={0}>
                  {onWatchlist ? (
                    <Button
                      leftIcon={<MinusIcon />}
                      variant={"outline"}
                      onClick={() =>
                        accounts
                          .editWatchlist(symbol as string, "remove")
                          .then(() => setOnWatchlist(false))
                      }>
                      Remove from Watchlist
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<AddIcon />}
                      variant={"outline"}
                      onClick={() =>
                        accounts
                          .editWatchlist(symbol as string, "add")
                          .then(() => setOnWatchlist(true))
                      }>
                      Add to Watchlist
                    </Button>
                  )}
                </Box>
              )}
            </Flex>

            {/* Stock Chart */}
            <Box
              width="100%"
              height={{ base: "400px", md: "600px" }}
              mb={4}
              minWidth={{ base: "300px", md: "800px" }}
              maxWidth="100%"
              overflow="hidden"
            >
              <StockChart
                symbol={symbol as string}
                width="100%"
                height="100%"
              />
            </Box>

            {/* Symbol Profile */}
            <Box mt={2}>
              <SymbolProfileWidget
                symbol={symbol as string}
                width="100%"
                height="400"
              />
            </Box>
          </Box>

          {/* Transaction Pane */}
          {tokens.isAuthenticated() && (
            <Box width="300px" flexShrink={0}>
              <TransactionPane
                symbol={symbol as string}
                price={stock.regularMarketPrice}
              />
            </Box>
          )}
        </Flex>
      )}

      <Heading size="md" mt={5}>
        {symbol as string} News
      </Heading>
      <Spacer height={3} />
      <Newsfeed symbol={symbol as string} />
    </>
  );
}

export default StockView;
