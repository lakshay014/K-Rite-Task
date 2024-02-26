import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }) {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("user")));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const getUserProfile = async () => {
        try {
          const response = await axios.get("/api/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response) {
            setUser(response.data);
          }
        } catch (error) {
          console.log(error); // Debug Log
        }
      };
      getUserProfile();
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
