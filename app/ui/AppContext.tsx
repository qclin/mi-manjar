"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { Overview } from "../lib/definitions";

interface StateData {
  season: number;
  episode: number;
  title: string;
}

interface AppContextProps {
  navigationState: StateData | null;
  setNavigationState: React.Dispatch<React.SetStateAction<StateData | null>>;
  episodesList: Overview[]; 
  setEpisodeList: React.Dispatch<React.SetStateAction<Overview[]>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [navigationState, setNavigationState] = useState<StateData | null>(
    null
  );

  const [episodesList, setEpisodeList] = useState<Overview[]>([])
  
  return (
    <AppContext.Provider value={{ navigationState, setNavigationState, episodesList, setEpisodeList }}>
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
