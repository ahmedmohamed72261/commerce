"use client";

import React, { useEffect, useState } from "react";
import GeneralLoadingScreen from "./GeneralLoadingScreen";

const InitialLoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Simulate an initial loading period for the app
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1500); // Show loader for 1.5 seconds minimum for better UX

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <GeneralLoadingScreen />}
      <div className={showLoader ? "opacity-0" : "opacity-100"} style={{ transition: "opacity 0.5s ease" }}>
        {children}
      </div>
    </>
  );
};

export default InitialLoadingWrapper;