import React, { useCallback, useEffect, useMemo, useState } from "react";
import { signInFn } from "../actions/signIn";
import { signUpFn } from "../actions/signUp";
import { getCurrentUserProfile } from "../actions/user";
import CircularProgressPage from "../Components/CircularProgressPage";
import { AuthContext, initialContext } from "../context/authContext";
import { ISignInBody } from "../models/SignIn";
import { ISignUpBody } from "../models/SignUp";
import { UserProfile } from "../models/userProfile";

interface IAuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialContext.state.isAuthenticated
  );
  const [userProfile, setUserProfile] = useState<
    UserProfile | null | undefined
  >(initialContext.state.userProfile);
  const [initialLoading, setInitialLoading] = useState<boolean>(
    initialContext.state.initialLoading
  );
  const [isSigningIn, setIsSigningIn] = useState<boolean>(
    initialContext.state.isSigningIn
  );
  const [signInError, setSignInError] = useState<string>(
    initialContext.state.signInError
  );
  const [isSigningUp, setIsSigningUp] = useState<boolean>(
    initialContext.state.isSigningUp
  );
  const [signUpError, setSignUpError] = useState<string>(
    initialContext.state.signUpError
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("access_token");
        if (userId && token) {
          setInitialLoading(true);
          const currentUserProfile = await getCurrentUserProfile();

          console.log("currentUserProfile", currentUserProfile);

          if (currentUserProfile) {
            setUserProfile(currentUserProfile);
            setIsAuthenticated(true);
            setInitialLoading(false);
          } else {
            setInitialLoading(false);
            setUserProfile(null);
            setIsAuthenticated(false);
          }
        } else {
          setInitialLoading(false);
        }
      } catch (error: Error | any) {
        setInitialLoading(false);
        setUserProfile(null);
        setIsAuthenticated(false);
      }
    };

    fetchUserData();
  }, []);

  // used the useCallback hook to prevent the function from being recreated after a re-render
  const signUp = useCallback(async ({ name, email, password }: ISignUpBody) => {
    try {
      setIsSigningUp(true);
      const signUpResponse = await signUpFn({ name, email, password });
      if (signUpResponse.status === 201) {
        console.log("signInResponse", signUpResponse);

        // complete a successful signUp process
        setIsSigningUp(false);
        setSignUpError("");
        // go to the sign in page
        window.location.href = "/signin";
      } else {
        setIsSigningUp(false);
        setSignUpError("SignUp failed. Email maybe already used");
      }
    } catch (error: Error | any) {
      setIsSigningUp(false);
      setSignUpError(
        `SignUp failed. Email maybe already used. ${error.message}`
      );
    }
  }, []);

  // used the useCallback hook to prevent the function from being recreated after a re-render
  const signIn = useCallback(async ({ email, password }: ISignInBody) => {
    try {
      setIsSigningIn(true);
      const signInResponse = await signInFn({ email, password });
      if (signInResponse) {
        console.log("signInResponse", signInResponse);

        const { userProfile, access_token } = signInResponse;
        // store the token in localStorage
        localStorage.setItem("access_token", access_token);

        // store the userProfile's id in localStorage
        localStorage.setItem("userId", userProfile.userId);

        // complete a successful signIn process
        setUserProfile(signInResponse.userProfile);
        setIsAuthenticated(true);
        setIsSigningIn(false);
        setSignInError("");
        // go to the home page
        window.location.href = "/";
      } else {
        setUserProfile(null);
        setIsAuthenticated(false);
        setIsSigningIn(false);
        setSignInError("SignIn failed");
      }
    } catch (error: Error | any) {
      setUserProfile(null);
      setIsAuthenticated(false);
      setIsSigningIn(false);
      setSignInError(error.message || "SignIn failed");
    }
  }, []);

  // used the useCallback hook to prevent the function from being recreated after a re-render
  const signOut = useCallback(() => {
    setUserProfile(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
  }, []);

  // stored the auth context value in useMemo hook to recalculate
  // the value only when necessary
  const authContext = useMemo(
    () => ({
      state: {
        isAuthenticated,
        userProfile,
        initialLoading,
        isSigningIn,
        signInError,
        isSigningUp,
        signUpError,
      },
      actions: { signIn, signUp, signOut },
    }),
    [
      signIn,
      signUp,
      signOut,
      isAuthenticated,
      userProfile,
      initialLoading,
      isSigningIn,
      signInError,
      isSigningUp,
      signUpError,
    ]
  );

  return (
    <AuthContext.Provider value={authContext}>
      {initialLoading ? <CircularProgressPage /> : children}
    </AuthContext.Provider>
  );
};
