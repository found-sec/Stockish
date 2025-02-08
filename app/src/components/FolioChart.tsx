// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import api from "../services/api.service"; 
// import { Box, Spinner, Text } from "@chakra-ui/react";
// import tokens from "../services/tokens.service";

// const PortfolioChart: React.FC = () => {
//   const [chartData, setChartData] = useState<[number, number][]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!tokens.isAuthenticated()) return;

//     const fetchPortfolioHistory = async () => {
//       try {
//         const response = await api.get("/user/portfolio/history");
//         const formattedData = response.data.map((point: any) => [
//           new Date(point.timestamp).getTime(), 
//           point.value,
//         ]);
//         setChartData(formattedData);
//       } catch (err) {
//         setError("Failed to load portfolio data");
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPortfolioHistory();
//   }, []);

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
//           Sign-in to view portfolio graph
//         </Text>
//       </Box>
//     );
//   }

//   const options: Highcharts.Options = {
//     title: {
//       text: "Portfolio Value (30 Days)",
//     },
//     chart: {
//       type: "spline",
//       style: {
//         fontFamily: "inherit",
//       },
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
//     },
//     series: [
//       {
//         name: "Portfolio Value",
//         data: chartData,
//         type: "spline",
//         color: "#22D3EE",
//       },
//     ],
//     credits: {
//       enabled: false,
//     },
//     plotOptions: {
//       spline: {
//         marker: {
//           enabled: false,
//         },
//       },
//     },
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
