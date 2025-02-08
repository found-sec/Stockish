import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import api from "../services/api.service";
import { Box, Spinner, Text } from "@chakra-ui/react";
import tokens from "../services/tokens.service";

interface Position {
  symbol: string;
  purchasePrice: number;
  purchaseDate: number;
  quantity: number;
}

interface LedgerEntry {
  symbol: string;
  price: number;
  quantity: number;
  type: 'buy' | 'sell';
  date: number;
}

interface PortfolioDataPoint {
  date: number;
  value: number;
}

interface StockPrice {
  price: number;
}

const PortfolioChart: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tokens.isAuthenticated()) return;

    const calculatePortfolioHistory = async () => {
      try {
        // Fetch user data including positions, ledger, and cash
        const response = await api.get("/api/user/portfolio");
        const { positions, ledger, cash } = response.data;

        // Get current stock prices
        const symbols = [...new Set(positions.map((pos: Position) => pos.symbol))];
        const pricePromises = symbols.map(symbol => 
          api.get<StockPrice>(`/api/stocks/${symbol}/price`)
        );
        const priceResponses = await Promise.all(pricePromises);
        const stockPrices: Record<string, number> = {};
        symbols.forEach((symbol, index) => {
          stockPrices[symbol] = priceResponses[index].data.price;
        });

        // Sort ledger entries by date
        const sortedLedger = [...ledger].sort((a, b) => a.date - b.date);

        // Calculate portfolio value at each transaction point
        const portfolioHistory: PortfolioDataPoint[] = [];
        let currentPositions: Record<string, Position> = {};
        let currentCash = cash;

        // Add initial point (either first transaction or 30 days ago)
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const startDate = sortedLedger.length > 0 
          ? Math.max(sortedLedger[0].date, thirtyDaysAgo)
          : thirtyDaysAgo;

        portfolioHistory.push({
          date: startDate,
          value: currentCash
        });

        // Process each transaction
        sortedLedger.forEach((entry: LedgerEntry) => {
          if (entry.date < thirtyDaysAgo) return;

          // Update cash
          if (entry.type === 'buy') {
            currentCash -= entry.price * entry.quantity;
          } else {
            currentCash += entry.price * entry.quantity;
          }

          // Update positions
          if (entry.type === 'buy') {
            if (!currentPositions[entry.symbol]) {
              currentPositions[entry.symbol] = {
                symbol: entry.symbol,
                purchasePrice: entry.price,
                purchaseDate: entry.date,
                quantity: entry.quantity
              };
            } else {
              const position = currentPositions[entry.symbol];
              if (position) {
                position.quantity += entry.quantity;
              }
            }
          } else {
            const position = currentPositions[entry.symbol];
            if (position) {
              position.quantity -= entry.quantity;
              if (position.quantity === 0) {
                delete currentPositions[entry.symbol];
              }
            }
          }

          // Calculate total value at this point
          let totalValue = currentCash;
          Object.values(currentPositions).forEach(position => {
            const currentPrice = stockPrices[position.symbol];
            if (typeof currentPrice === 'number') {
              totalValue += currentPrice * position.quantity;
            }
          });

          portfolioHistory.push({
            date: entry.date,
            value: totalValue
          });
        });

        // Add current point if not already included
        const lastPoint = portfolioHistory[portfolioHistory.length - 1];
        if (lastPoint && lastPoint.date < Date.now()) {
          let finalValue = currentCash;
          Object.values(currentPositions).forEach(position => {
            const currentPrice = stockPrices[position.symbol];
            if (typeof currentPrice === 'number') {
              finalValue += currentPrice * position.quantity;
            }
          });

          portfolioHistory.push({
            date: Date.now(),
            value: finalValue
          });
        }

        setPortfolioData(portfolioHistory);
      } catch (err) {
        setError("Failed to load portfolio data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    calculatePortfolioHistory();
  }, []);

  if (!tokens.isAuthenticated()) {
    return (
      <Box
        mt={4}
        mb={4}
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Text color="gray.400" fontSize="lg">
          Sign-in to view portfolio chart
        </Text>
      </Box>
    );
  }

  const options: Highcharts.Options = {
    title: {
      text: "Portfolio Value History",
    },
    chart: {
      type: "area",
      style: {
        fontFamily: "inherit",
      },
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Portfolio Value ($)",
      },
      labels: {
        formatter: function() {
          return `$${this.value.toLocaleString()}`;
        }
      }
    },
    series: [{
      name: "Portfolio Value",
      data: portfolioData.map(point => [point.date, point.value]),
      type: "area",
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, Highcharts.color("#3182CE").setOpacity(0.4).get('rgba')],
          [1, Highcharts.color("#3182CE").setOpacity(0).get('rgba')]
        ]
      },
      color: "#3182CE"
    }],
    tooltip: {
      formatter: function() {
        const value = typeof this.y === 'number' ? this.y : 0;
        return `<b>${Highcharts.dateFormat('%Y-%m-%d', this.x)}</b><br/>
                Portfolio Value: $${value.toLocaleString()}`;
      }
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      area: {
        marker: {
          enabled: true,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box mt={4} mb={4}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};

export default PortfolioChart;