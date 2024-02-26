import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export function LoadingProvider({ children }) {
  const [openLoading, setOpenLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ openLoading, setOpenLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
