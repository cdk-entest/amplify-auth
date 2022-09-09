import type { AppProps } from "next/app";
import { Amplify, Auth } from "aws-amplify";
import { ChakraProvider } from "@chakra-ui/react";

import awsconfig from "./../src/aws-exports";

try {
  Amplify.configure(awsconfig);
  Amplify.register(Auth);
} catch (error) {
  console.log(error);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
