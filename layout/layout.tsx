// Layout.tsx
import React from "react";
import { AppNavbar } from "@/components/Navbar";


interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    
    <AppNavbar />
    {children}
    
  </>
);


