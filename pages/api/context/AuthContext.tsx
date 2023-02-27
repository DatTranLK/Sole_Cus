import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";

import { useContext, createContext, useState, ReactNode } from "react";

type UserInfo = {
  id: number;
  name: string;
  role: string;
}

type AuthContextProps = {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  logOut: () => {},
});

export function UseAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  
  const logOut = () => {
    signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
