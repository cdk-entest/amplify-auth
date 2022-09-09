import type { NextPage } from "next";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import SignOutForm from "../src/components/signout-form";
import LoginForm from "../src/components/signin-form";
import SignUpForm from "../src/components/signup-form";

const Home: NextPage = () => {
  const [user, setUser] = useState<any>(null);

  const getAuthUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthUser();
  }, [setUser]);

  if (user === 'SIGNUP') {
    return <SignUpForm setUser={setUser}></SignUpForm>
  }

  if (user) {
    return <SignOutForm setUser={setUser}></SignOutForm>;
  }

  return <LoginForm setUser={setUser}></LoginForm>;
};

export default Home;
