import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps {
  currentTime: number;
  currentSequence: number;
  onSelect: (startTime: number) => void;
}

const TranscriptContext = createContext<ContextProps | undefined>(undefined);

export const useTranscriptContext = (): ContextProps => {
  const context = useContext(TranscriptContext);
  if (!context) {
    throw new Error(
      "useTranscriptContext must be used within a TranscriptProvider"
    );
  }
  return context;
};

interface ProviderProps extends ContextProps {
  children: ReactNode;
}

export const TranscriptProvider: React.FC<ProviderProps> = ({
  children,
  currentTime,
  currentSequence,
  onSelect,
}) => {
  return (
    <TranscriptContext.Provider
      value={{ currentTime, currentSequence, onSelect }}
    >
      {children}
    </TranscriptContext.Provider>
  );
};
