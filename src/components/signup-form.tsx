import {
  Box,
  VStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import { EmailIcon, ViewIcon } from "@chakra-ui/icons";
import { Auth } from "aws-amplify";
import React, { useState } from "react";

const SignUpForm = ({ setUser }: { setUser: any }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [code, setCode] = useState("");
  const [submit, setSubmit] = useState(false);

  const signUp = async (username: string, password: string) => {
    console.log("sign up...", username, password);

    if (!username) {
      setUser(null);
    } else {
      try {
        const { user } = await Auth.signUp({
          username,
          password,
          autoSignIn: {
            enabled: true,
          },
        });
        console.log(user);
        setSubmit(true);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    }
  };

  const confirmSignUp = async (username: string, code: string) => {
    if (!code) {
      setUser(null);
    } else {
      try {
        const confirm = await Auth.confirmSignUp(username, code);
        console.log("confirm sign up ...", confirm);
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        setUser(user);
      } catch (error) {
        console.log("error configrm sign up");
        setUser(null);
      }
    }
  };

  const SignUpButton = (
    <Box
      width="5xl"
      height="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin={"auto"}
    >
      <VStack
        py={12}
        px={12}
        borderWidth={1}
        borderRadius="lg"
        spacing={4}
        alignItems="flex-start"
      >
        <Text fontSize={30}>Welcome</Text>
        <InputGroup>
          <InputLeftElement>{<EmailIcon></EmailIcon>}</InputLeftElement>
          <Input
            placeholder="Email"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></Input>
        </InputGroup>
        <InputGroup>
          <InputLeftElement>{<ViewIcon></ViewIcon>}</InputLeftElement>
          <Input
            placeholder="Password"
            value={pass}
            onChange={(event) => {
              setPass(event.target.value);
            }}
          ></Input>
        </InputGroup>
        <Button
          width="100%"
          colorScheme="teal"
          onClick={async () => {
            signUp(name, pass);
          }}
        >
          Sign Up
        </Button>
      </VStack>
    </Box>
  );

  const ConfirmButton = (
    <Box
      width="5xl"
      height="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        py={12}
        px={12}
        borderWidth={1}
        borderRadius="lg"
        spacing={4}
        alignItems="flex-start"
      >
        <InputGroup>
          <InputLeftElement>{<EmailIcon></EmailIcon>}</InputLeftElement>
          <Input
            placeholder="Code"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
            }}
          ></Input>
        </InputGroup>
        <Button
          width="100%"
          colorScheme="teal"
          onClick={async () => {
            confirmSignUp(name, code);
          }}
        >
          Confirm
        </Button>
      </VStack>
    </Box>
  );

  return submit ? ConfirmButton : SignUpButton;
};

export default SignUpForm;
