import React, { createContext, useContext, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

// Create context with a default of undefined
const LoadingBarContext = createContext<
  React.RefObject<LoadingBarRef> | undefined
>(undefined);

export const LoadingBarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize the ref for LoadingBar
  const loadingBarRef = useRef<LoadingBarRef>(null);

  return (
    <LoadingBarContext.Provider value={loadingBarRef}>
      <LoadingBar color="#59BEF4" height={3} ref={loadingBarRef} />
      {children}
    </LoadingBarContext.Provider>
  );
};

// Custom hook to use the loading bar context
export const useLoadingBar = () => {
  const context = useContext(LoadingBarContext);
  if (context === undefined) {
    throw new Error("useLoadingBar must be used within a LoadingBarProvider");
  }
  return context;
};
