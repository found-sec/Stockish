import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MarketStatusBar from "./components/MarketStatusBar";
import { Container, Box, Spacer, Text, Link, Spinner } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const StockView = lazy(() => import("./pages/StockView"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Markets = lazy(() => import("./pages/Markets"));
const HowToTrade = lazy(() => import("./pages/HowToTrade"));

import NotFound from "./pages/NotFound";
import HeroPage from "./pages/HeroPage";
import Footer from "./components/Footer";

export type Transaction = {
  symbol: string;
  purchasePrice: number;
  quantity: number;
  date: Date;
  type: "buy" | "sell";
};

export type Position = {
  symbol: string;
  longName: string;
  purchasePrice: number;
  purchaseDate: Date;
  quantity: number;
  regularMarketPrice: number;
  regularMarketPreviousClose: number;
  regularMarketChangePercent: number;
};

function App() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    console.log("Welcome to Stockish");
  }, []);

  return (
    <>
      <Box
        position="fixed"
        width="100%"
        zIndex={1000}
        transition="transform 0.3s ease-in-out"
        transform={visible ? "translateY(0)" : "translateY(-100%)"}>
        <Navbar />
        <MarketStatusBar />
      </Box>
      <Container maxW="container.90vw" paddingTop="100px">
        <Spacer h="10" />
        <Box>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<HeroPage />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>

              <Route path="/markets" element={<Markets />}></Route>

              <Route path="/login" element={<Login />}></Route>

              <Route
                path="/forgot-password"
                element={<ForgotPassword />}></Route>

              <Route path="/signup" element={<Signup />}></Route>

              <Route path="/howtotrade" element={<HowToTrade />}></Route>

              <Route path="/leaderboard" element={<Leaderboard />}></Route>

              <Route path="/stocks/:symbol" element={<StockView />}></Route>

              {/* Add 404*/}
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Suspense>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default App;
