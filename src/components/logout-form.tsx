import { Box, VStack, Button } from "@chakra-ui/react";
import { Auth } from "aws-amplify";

const signOut = async () => {
  const resp = await Auth.signOut();
};

const SignOutForm = () => {
  return (
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
        <Button
          width="100%"
          colorScheme="teal"
          onClick={async () => {
            signOut();
          }}
        >
          Sign Out
        </Button>
      </VStack>
    </Box>
  );
};

export default SignOutForm;
