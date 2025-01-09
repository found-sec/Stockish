import React, { RefObject, useEffect, useRef } from "react";
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
	const mobileMenuBtn = useRef<HTMLButtonElement>() as RefObject<HTMLButtonElement>;

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
		>
			{/* left side */}
			<Flex align="center" gap={30}>
				<Text as={Link} to="/" display="flex" alignItems="center" gap="1">
					<Image src="/hackathon_logo.svg" alt="Stotra Logo" boxSize="12" />
					{/* alternatively, try: <Image src={process.env.PUBLIC_URL + '/hackathon_logo.svg'} alt="Stotra Logo" boxSize="6" /> */}
					<Text fontWeight="bold">Stock-ish</Text>
				</Text>
				<NavLink
					style={({ isActive }) => ({ fontWeight: isActive ? "500" : "" })}
					to="/dashboard"
				>
					<Text display={{ base: "none", md: "block" }}>Dashboard</Text>
				</NavLink>
				<NavLink
					style={({ isActive }) => ({ fontWeight: isActive ? "500" : "" })}
					to="/markets"
				>
					<Text display={{ base: "none", md: "block" }}>Markets</Text>
				</NavLink>
				<NavLink
					style={({ isActive }) => ({ fontWeight: isActive ? "500" : "" })}
					to="/leaderboard"
				>
					<Text display={{ base: "none", md: "block" }}>Leaderboard</Text>
				</NavLink>
				<NavLink
					style={({ isActive }) => ({ fontWeight: isActive ? "500" : "" })} 
					to="/howtotrade"
				>
					<Text display={{ base: "none", md: "block" }}>Guide</Text>
				</NavLink>
			</Flex>

			{/* center */}
			<Box flexShrink={5} width="500px">
				<SearchBox />
			</Box>

			{/* right Side */}
			<Box>
				<HStack spacing="2" display={{ base: "none", md: "flex" }}>
					{/* <IconButton
						variant="outline"
						aria-label="Toggle dark mode"
						icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
						onClick={toggleColorMode}
					/> */}
					<AccountMenu />
				</HStack>

				<Box display={{ base: "block", md: "none" }}>
					<IconButton
						aria-label="Hamburger menu"
						icon={<HamburgerIcon />}
						ref={mobileMenuBtn}
						colorScheme={useTheme()["components"]["Link"]["baseStyle"]["color"].split(".")[0]}
						onClick={onOpen}
					/>
					<Drawer isOpen={isOpen} placement="top" onClose={onClose} finalFocusRef={mobileMenuBtn}>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>
								<Text as={Link} to="/">
									<Text fontWeight="bold">NIAstock</Text>
								</Text>
							</DrawerHeader>

							<DrawerBody>
								<Stack spacing="2.5">
									<Text as={Link} to="/">
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
