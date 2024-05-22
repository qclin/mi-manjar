"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface StateData {
  season: number;
  episode: number;
  title: string;
}

interface AppContextProps {
  navigationState: StateData | null;
  setNavigationState: React.Dispatch<React.SetStateAction<StateData | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [navigationState, setNavigationState] = useState<StateData | null>(
    null
  );

  return (
    <AppContext.Provider value={{ navigationState, setNavigationState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
