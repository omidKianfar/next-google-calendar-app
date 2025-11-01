import React, { createContext, useState } from "react";
import { GoogleAuthContext, googleAuthContextType } from "./type";

export const googleAuthContext = createContext<
  googleAuthContextType | undefined
>(undefined);

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
