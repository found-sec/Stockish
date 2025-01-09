import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	VStack,
	Text,
	Link,
	useToast,
  } from "@chakra-ui/react";
  
  import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
  import { Link as RouterLink, useNavigate } from "react-router-dom";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
  import accounts from "../services/accounts.service";
  import tokens from "../services/tokens.service";
  
  export default function Signup() {
	const toast = useToast();
	const navigate = useNavigate();
  
	const turnstileRef = useRef<TurnstileInstance>(null);
  
	useEffect(() => {
	  if (tokens.isAuthenticated()) {
		// Redirect to home if already authenticated
		navigate("/");
	  }
	}, [navigate]);
  
	useLayoutEffect(() => {
	  return () => {
		turnstileRef.current?.remove();
	  };
	}, []);
  
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isUsernameFocused, setIsUsernameFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
  
	// Validation Criteria
	const isLongEnough = password.length >= 8;
	const hasLowerCase = /[a-z]/.test(password);
	const hasUpperCase = /[A-Z]/.test(password);
	const hasNumber = /\d/.test(password);
	const hasSpecialChar = /[!@#$%^&*(),.?"]/.test(password);
  
	const handleSubmit = async (e: { preventDefault: () => void }) => {
	  e.preventDefault();
	  setIsSubmitted(true);
  
	  // Ensure validation on the first click
	  if (username.length >= 5 && isLongEnough && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar) {
		const turnstileResponse = turnstileRef.current?.getResponse();
		if (!turnstileResponse) {
		  toast({
			title: "Please complete the CAPTCHA.",
			status: "error",
			isClosable: true,
		  });
		  return;
		}
  
		accounts
		  .signup(email, username, password, turnstileResponse)
		  .then((res) => {
			if (res === "success") {
			  toast({
				title: `Account created! Redirecting to login...`,
				status: "success",
				isClosable: true,
			  });
			  navigate("/login");
			} else {
			  toast({
				title: `${res}`,
				status: "error",
				isClosable: true,
			  });
			}
		  })
		  .catch((err) => {
			toast({
			  title: `${err}`,
			  status: "error",
			  isClosable: true,
			});
		  });
	  }
	};
  
	return (
	  <Flex align={"center"} justify={"center"}>
		<Stack spacing={8} mx={"auto"} maxW={"lg"} px={{ base: 0, md: 6 }}>
		  <Stack align={"center"}>
			<Heading fontSize={"4xl"} textAlign="center">
			  Sign up
			</Heading>
		  </Stack>
		  <Box rounded={"lg"} boxShadow={"lg"} p={8} pt={{ base: 4, md: 8 }}>
			<form>
			  <Stack spacing={4}>
				<FormControl id="email" isRequired>
				  <FormLabel>Email</FormLabel>
				  <Input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				  />
				</FormControl>
				<FormControl id="username" isRequired>
				  <FormLabel>Username</FormLabel>
				  <Input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					onFocus={() => setIsUsernameFocused(true)}
					onBlur={() => setIsUsernameFocused(false)}
				  />
				  {(isUsernameFocused || isSubmitted) && (
					<VStack align="start" mt={2} spacing={1}>
					  {username.length < 5 && (
						<HStack spacing={2}>
						  <Text color="red.500">✘ At least 5 characters</Text>
						</HStack>
					  )}
					</VStack>
				  )}
				</FormControl>
				<FormControl id="password" isRequired>
				  <FormLabel>Password</FormLabel>
				  <InputGroup>
					<Input
					  type={showPassword ? "text" : "password"}
					  value={password}
					  onChange={(e) => setPassword(e.target.value)}
					  onFocus={() => setIsPasswordFocused(true)}
					  onBlur={() => setIsPasswordFocused(false)}
					/>
					<InputRightElement h={"full"}>
					  <Button
						variant={"ghost"}
						onClick={() => setShowPassword((prevState) => !prevState)}
					  >
						{showPassword ? <ViewIcon /> : <ViewOffIcon />}
					  </Button>
					</InputRightElement>
				  </InputGroup>
				  {(isPasswordFocused || isSubmitted) && (
					<VStack align="start" mt={2} spacing={1}>
					  {!isLongEnough && (
						<HStack spacing={2}>
						  <Text color="red.500">✘ At least 8 characters</Text>
						</HStack>
					  )}
					  {!hasLowerCase && (
						<HStack spacing={2}>
						  <Text color="red.500">✘ Contains a lowercase letter</Text>
						</HStack>
					  )}
					  {!hasUpperCase && (
						<HStack spacing={2}>
						  <Text color="red.500">✘ Contains an uppercase letter</Text>
						</HStack>
					  )}
					  {!hasNumber && (
						<HStack spacing={2}>
						  <Text color="red.500">✘ Contains a number</Text>
						</HStack>
					  )}
					  {!hasSpecialChar && (
						<HStack spacing={2}>
						  <Text color="red.500">✘ Contains a special character</Text>
						</HStack>
					  )}
					</VStack>
				  )}
				</FormControl>
				<Stack spacing={5} pt={2}>
				  <Turnstile ref={turnstileRef} siteKey="0x4AAAAAAA0F-DMj5gaXa47K" />
				  <Button
					loadingText="Submitting"
					size="lg"
					onClick={handleSubmit}
					type="submit"
				  >
					Sign up
				  </Button>
				</Stack>
				<HStack pt={2} fontWeight="500">
				  <Text>Already a user?</Text>
				  <Link as={RouterLink} to="/login">
					Login
				  </Link>
				</HStack>
			  </Stack>
			</form>
		  </Box>
		</Stack>
	  </Flex>
	);
  }
  