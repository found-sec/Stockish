import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  HStack,
  Text,
  IconButton,
  // useColorMode,
  Flex,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  useTheme,
  Image,
} from "@chakra-ui/react";

import { Link, useLocation, NavLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import SearchBox from "./SearchBox";
import AccountMenu from "./AccountMenu";

export default function Navbar() {
  const location = useLocation();

  // mobile nav menu
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mobileMenuBtn =
    useRef<HTMLButtonElement>() as RefObject<HTMLButtonElement>;

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
    if (isOpen) {
      onClose();
    }
  }, [location]);

  return (
    <HStack
      className="Navbar"
      borderBottomWidth="1px"
      p="5"
      display="flex"
      justifyContent="space-between"
      position="relative"
      bg="#f7fafc"
      zIndex="1001">
      {/* left side */}
      <Flex align="center" gap={30}>
        <Text as={Link} to="/" display="flex" alignItems="center" gap="1">
          <Image src="/Logo.svg" alt="Stotra Logo" boxSize="12" />

          <Text fontWeight="bold">Stockish</Text>
        </Text>
        <NavLink
          style={({ isActive }) => ({ fontWeight: isActive ? "500" : "" })}
          to="/dashboard">
          <Text display={{ base: "none", lg: "block" }}>Dashboard</Text>
        </NavLink>
        <NavLink
          style={({ isActive }) => ({ fontWeight: isActive ? "500" : "" })}
          to="/markets">
          <Text display={{ base: "none", lg: "block" }}>Markets</Text>
        </NavLink>
        <NavLink
          style={({ isActive }) => ({ fontWeight: isActive ? "500" : "" })}
          to="/leaderboard">
          <Text display={{ base: "none", lg: "block" }}>Leaderboard</Text>
        </NavLink>
        <NavLink
          style={({ isActive }) => ({ fontWeight: isActive ? "500" : "" })}
          to="/howtotrade">
          <Text display={{ base: "none", lg: "block" }}>Guide</Text>
        </NavLink>
      </Flex>

      {/* center */}
      <Box flexShrink={5} width="500px">
        <SearchBox />
      </Box>

      {/* right Side */}
      <Box>
        <HStack spacing="2" display={{ base: "none", lg: "flex" }}>
          {/* <IconButton
						variant="outline"
						aria-label="Toggle dark mode"
						icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
						onClick={toggleColorMode}
					/> */}
          <AccountMenu />
        </HStack>

        <Box display={{ base: "block", lg: "none" }}>
          <IconButton
            aria-label="Hamburger menu"
            icon={<HamburgerIcon />}
            ref={mobileMenuBtn}
            colorScheme={
              useTheme()["components"]["Link"]["baseStyle"]["color"].split(
                "."
              )[0]
            }
            onClick={onOpen}
          />
          <Drawer
            isOpen={isOpen}
            placement="top"
            onClose={onClose}
            finalFocusRef={mobileMenuBtn}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <Text as={Link} to="/">
                  <Text fontWeight="bold">Stockish</Text>
                </Text>
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="2.5">
                  <Text as={Link} to="/dashboard">
                    <Text>Dashboard</Text>
                  </Text>
                  <Text as={Link} to="/markets">
                    <Text>Markets</Text>
                  </Text>
                  <Text as={Link} to="/leaderboard">
                    <Text>Leaderboard</Text>
                  </Text>
                  <Text as={Link} to="/howtotrade">
                    <Text>Guide</Text>
                  </Text>
                </Stack>
              </DrawerBody>

              <DrawerFooter>
                <HStack spacing="2" width="100%">
                  {/* <IconButton
										variant="outline"
										aria-label="Toggle dark mode"
										icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
										onClick={toggleColorMode}
									/> */}

                  <AccountMenu />
                </HStack>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </Box>
    </HStack>
  );
}
