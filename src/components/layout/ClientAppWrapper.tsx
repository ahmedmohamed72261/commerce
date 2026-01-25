"use client";

import React, { useEffect, useState } from "react";
import GeneralLoadingScreen from "./GeneralLoadingScreen";

const ClientAppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Simulate an initial loading period for the app
    // We'll hide the loader after a brief moment to ensure smooth transition
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1200); // Show loader for 1.2 seconds minimum for better UX

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

export default ClientAppWrapper;