"use client";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider";
// import AuthProvider from "./AuthProvider";
// import AuthProvider from "./AuthProvider";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <Toaster />
      {children}
    </AuthProvider>
  );
};

export default Providers;
