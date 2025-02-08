// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import api from "../services/api.service";
// import { Box, Spinner, Text } from "@chakra-ui/react";
// import tokens from "../services/tokens.service";

// interface Position {
//   symbol: string;
//   purchasePrice: number;
//   purchaseDate: number;
//   quantity: number;
// }

// interface LedgerEntry {
//   symbol: string;
//   price: number;
//   quantity: number;
//   type: 'buy' | 'sell';
//   date: number;
// }

// interface PortfolioDataPoint {
//   date: number;
//   value: number;
// }

// interface StockPrice {
//   price: number;
// }

// const PortfolioChart: React.FC = () => {
//   const [portfolioData, setPortfolioData] = useState<PortfolioDataPoint[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [positions, setPositions] = useState<Position[]>([]);
//   const [cash, setCash] = useState<number>(0);

//   // Fetch initial portfolio data
//   useEffect(() => {
//     if (!tokens.isAuthenticated()) return;

//     const fetchPortfolioData = async () => {
//       try {
//         const response = await api.get("/user/portfolio");
//         setPositions(response.data.positions || []);
//         setCash(response.data.cash || 0);
//         await calculatePortfolioHistory(response.data.positions, response.data.cash, response.data.ledger);
//       } catch (err) {
//         setError("Failed to load initial portfolio data");
//         console.error(err);
//       }
//     };

//     fetchPortfolioData();
//   }, []);

//   // Listen for position updates
//   useEffect(() => {
//     if (!tokens.isAuthenticated()) return;

//     const updateInterval = setInterval(async () => {
//       try {
//         const response = await api.get("/user/portfolio");
//         const newPositions = response.data.positions || [];
//         const newCash = response.data.cash || 0;

//         // Check if positions or cash have changed
//         const hasChanged = 
//           JSON.stringify(positions) !== JSON.stringify(newPositions) ||
//           cash !== newCash;

//         if (hasChanged) {
//           setPositions(newPositions);
//           setCash(newCash);
//           await calculatePortfolioHistory(newPositions, newCash, response.data.ledger);
//         }
//       } catch (err) {
//         console.error("Failed to update portfolio data:", err);
//       }
//     }, 5000); // Update every 5 seconds

//     return () => clearInterval(updateInterval);
//   }, [positions, cash]);

//   const calculatePortfolioHistory = async (
//     currentPositions: Position[],
//     currentCash: number,
//     ledger: LedgerEntry[]
//   ) => {
//     try {
//       // Get current stock prices
//       const symbols = [...new Set(currentPositions.map(pos => pos.symbol))];
//       const pricePromises = symbols.map(symbol => 
//         api.get<StockPrice>(`/stocks/${symbol}/price`)
//       );
//       const priceResponses = await Promise.all(pricePromises);
//       const stockPrices: Record<string, number> = {};
//       symbols.forEach((symbol, index) => {
//         if (priceResponses[index] && priceResponses[index].data) {
//           stockPrices[symbol] = priceResponses[index].data.price;
//         }
//       });

//       // Sort ledger entries by date
//       const sortedLedger = [...ledger].sort((a, b) => a.date - b.date);

//       // Calculate portfolio value at each transaction point
//       const portfolioHistory: PortfolioDataPoint[] = [];
//       let positionsMap: Record<string, Position> = {};
//       let cashBalance = currentCash;

//       // Add initial point (30 days ago)
//       const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      
//       portfolioHistory.push({
//         date: thirtyDaysAgo,
//         value: cashBalance
//       });

//       // Process each transaction
//       sortedLedger
//         .filter(entry => entry.date >= thirtyDaysAgo)
//         .forEach(entry => {
//           // Update cash
//           if (entry.type === 'buy') {
//             cashBalance -= entry.price * entry.quantity;
//           } else {
//             cashBalance += entry.price * entry.quantity;
//           }

//           // Update positions
//           if (entry.type === 'buy') {
//             if (!positionsMap[entry.symbol]) {
//               positionsMap[entry.symbol] = {
//                 symbol: entry.symbol,
//                 purchasePrice: entry.price,
//                 purchaseDate: entry.date,
//                 quantity: entry.quantity
//               };
//             } else {
//               const position = positionsMap[entry.symbol];
//               if (position) {
//                 position.quantity += entry.quantity;
//               }
//             }
//           } else {
//             const position = positionsMap[entry.symbol];
//             if (position) {
//               position.quantity -= entry.quantity;
//               if (position.quantity === 0) {
//                 delete positionsMap[entry.symbol];
//               }
//             }
//           }

//           // Calculate total value at this point
//           let totalValue = cashBalance;
//           Object.values(positionsMap).forEach(position => {
//             const currentPrice = stockPrices[position.symbol];
//             if (typeof currentPrice === 'number') {
//               totalValue += currentPrice * position.quantity;
//             }
//           });

//           portfolioHistory.push({
//             date: entry.date,
//             value: totalValue
//           });
//         });

//       // Add current point
//       let finalValue = currentCash;
//       currentPositions.forEach(position => {
//         const currentPrice = stockPrices[position.symbol];
//         if (typeof currentPrice === 'number') {
//           finalValue += currentPrice * position.quantity;
//         }
//       });

//       portfolioHistory.push({
//         date: Date.now(),
//         value: finalValue
//       });

//       setPortfolioData(portfolioHistory);
//       setIsLoading(false);
//     } catch (err) {
//       setError("Failed to calculate portfolio history");
//       console.error(err);
//       setIsLoading(false);
//     }
//   };

//   if (!tokens.isAuthenticated()) {
//     return (
//       <Box
//         mt={4}
//         mb={4}
//         height="300px"
//         display="flex"
//         alignItems="center"
//         justifyContent="center">
//         <Text color="gray.400" fontSize="lg">
//           Sign-in to view portfolio chart
//         </Text>
//       </Box>
//     );
//   }

//   const options: Highcharts.Options = {
//     title: {
//       text: "Portfolio Value History",
//     },
//     chart: {
//       type: "area",
//       style: {
//         fontFamily: "inherit",
//       },
//       animation: {
//         duration: 500
//       }
//     },
//     xAxis: {
//       type: "datetime",
//       title: {
//         text: "Date",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "Portfolio Value ($)",
//       },
//       labels: {
//         formatter: function() {
//           return `$${this.value.toLocaleString()}`;
//         }
//       }
//     },
//     series: [{
//       name: "Portfolio Value",
//       data: portfolioData.map(point => [point.date, point.value]),
//       type: "area",
//       fillColor: {
//         linearGradient: {
//           x1: 0,
//           y1: 0,
//           x2: 0,
//           y2: 1
//         },
//         stops: [
//           [0, 'rgba(49, 130, 206, 0.4)'], // 40% opacity
//           [1, 'rgba(49, 130, 206, 0)']    // 0% opacity (fully transparent)
//         ]
//       },
//       color: "#3182CE"
//     }],
//     tooltip: {
//       formatter: function() {
//         const value = typeof this.y === 'number' ? this.y : 0;
//         const date = this.x ? Highcharts.dateFormat('%Y-%m-%d', Number(this.x)) : 'Invalid date';  // Ensure x is a number
//         return `<b>${date}</b><br/>Portfolio Value: $${value.toLocaleString()}`;
//       }
//     }
//     ,
    
//     credits: {
//       enabled: false,
//     },
//     plotOptions: {
//       area: {
//         marker: {
//           enabled: true,
//           symbol: 'circle',
//           radius: 2,
//           states: {
//             hover: {
//               enabled: true
//             }
//           }
//         }
//       }
//     }
//   };

//   if (isLoading) return <Spinner />;
//   if (error) return <Text color="red.500">{error}</Text>;

//   return (
//     <Box mt={4} mb={4}>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </Box>
//   );
// };

// export default PortfolioChart;
