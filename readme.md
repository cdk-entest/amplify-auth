---
title: Amplify Authentication  
description: implement an authentication flow with amplify  
author: haimtran
publishedDate: 09/08/2022
date: 2022-09-08
---


## Introduction 
[GitHub] this shows a simple auth flow with Amplfiy and NextJS.
- Sign up 
- Confirm sign up code 
- Sign in 

## Amplify Setup 
Amplify offers different auth flow, this show a simple one 
```bash 
amplify init 
```
add auth 
```bash 
amplify add auth 
```
select default options then push 
```bash 
amplify push 
```

## Sign Up 

```tsx
  const signUp = async (username: string, password: string) => {
    console.log("sign up...", username, password);

    if (!username) {
      setUser(null)
    }
    else {
      try {
        const { user } = await Auth.signUp({
          username,
          password,
          autoSignIn: {
            enabled: true,
          },
        });
        console.log(user);
        setSubmit(true)
      } catch (error) {
        console.log(error);
        setUser(null)
      }
    }
  };
```

confirm sign up code which recieved via email 
```tsx

  const confirmSignUp = async (username: string, code: string) => {
    if (code) {
      setUser(null)
    } else {
      try {
        const confirm = await Auth.confirmSignUp(username, code)
        console.log('confirm sign up ...', confirm)
        const user = await Auth.currentAuthenticatedUser()
        console.log(user)
        setUser(user)
      } catch (error) {
        console.log("error configrm sign up")
        setUser(null)
      }
    }
  }
```

## Sign In 

the required reset password the first time 
```tsx

const firstSignIn = async (
  username: string,
  password: string,
  newPassword: string
) => {
  console.log("try to sign in ...");
  Auth.signIn(username, password)
    .then((user) => {
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        Auth.completeNewPassword(
          user, // the Cognito User Object
          newPassword // the new password
        )
          .then((user) => {
            // at this time the user is logged in if no MFA required
            console.log(user);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        // other situations
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
```

sign in function 
```tsx

  const signIn = async (username: string, password: string) => {
    console.log("sign in ...", username, password);
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      const authenticated = await Auth.currentAuthenticatedUser();
      console.log(authenticated);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
```

## Auth Flow 
the key here is tracking user auth state and pass this setUser to sign in and sign up forms. 

```tsx

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
```
