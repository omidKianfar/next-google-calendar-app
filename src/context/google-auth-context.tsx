import React, { createContext, useContext, useState } from "react";
import { GoogleAuthContext, googleAuthContextType } from "./type";

const googleAuthContext = createContext<googleAuthContextType | undefined>(
  undefined
);

const GoogleAuthContextComponent = ({ children }: GoogleAuthContext) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const signOut = () => {
    setAccessToken(null);
  };

  return (
    <googleAuthContext.Provider
      value={{ accessToken, setAccessToken, signOut }}
    >
      {children}
    </googleAuthContext.Provider>
  );
};

export default GoogleAuthContextComponent;

export const useGoogleAuth = () => {
  const useGoogleAuthContext = useContext(googleAuthContext);

  if (!useGoogleAuthContext)
    throw new Error("useGoogleAuth must be used within AuthProvider");

  return useGoogleAuthContext;
};
