import { googleAuthContext } from "@/context/google-auth-context";
import { useContext } from "react";

export const useGoogleAuth = () => {
  const useGoogleAuthContext = useContext(googleAuthContext);

  if (!useGoogleAuthContext)
    throw new Error("useGoogleAuth must be used within AuthProvider");

  return useGoogleAuthContext;
};
