import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  HStack,
  Link,
  useToast,
  } from "@chakra-ui/react";
  import { Link as RouterLink } from "react-router-dom";
  
  const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message] = useState<string | null>(null);
    const toast = useToast(); // Initialize toast here
    const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (newPassword !== confirmNewPassword) {
      // Display error toast when passwords don't match
      toast({
        title: "Passwords do not match",
        description: "Please make sure both passwords are the same.",
        status: "error",
        isClosable: true,
      });
      return;
    }
  
    try {
      await axios.post("/api/auth/forgot-password", {
        email,
        username,
        newPassword,
        confirmNewPassword,
      });
  
      // Display success toast when password is updated successfully
      toast({
        title: "Password updated successfully!",
        description: "You can now log in with your new password...",
        status: "success",
        isClosable: true,
      });
      
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful reset
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error updating password');
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={{ base: 0, md: 6 }}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign="center">
            Reset Your Password
          </Heading>
          {message && <Text color="green.500">{message}</Text>}
          {error && <Text color="red.500">{error}</Text>}
          <HStack spacing="1">
            <Text>Remember your password?</Text>
            <Link as={RouterLink} to="/login" fontWeight="500">
              Sign in
            </Link>
          </HStack>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8} pt={{ base: 4, md: 8 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
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
                />
              </FormControl>
              <FormControl id="newPassword" isRequired>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="confirmNewPassword" isRequired>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </FormControl>

              <Stack spacing={10} alignItems="center">
                <Button type="submit">Reset Password</Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default ForgotPassword;
