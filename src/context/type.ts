export type googleAuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  signOut: () => void;
};

export interface GoogleAuthContext {
  children: React.ReactNode;
}
