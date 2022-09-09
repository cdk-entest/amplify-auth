import type { NextPage } from "next";
import LoginForm from "../src/components/login-form";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import SignOutForm from "../src/components/logout-form";
import Router from "next/router";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<any>(null);

  const getAuthUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setAuthUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthUser();
  }, [setAuthUser]);

  if (authUser) {
    return <SignOutForm></SignOutForm>;
  }
  return <LoginForm setUser={setAuthUser}></LoginForm>;
};

export default Home;
