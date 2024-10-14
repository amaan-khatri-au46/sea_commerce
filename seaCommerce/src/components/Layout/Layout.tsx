import React from "react";
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component
import { LayoutRouteProps } from "react-router-dom";

const Layout: React.FC<LayoutRouteProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Use flex column layout */}
      <Header />
      <main className="flex-grow overflow-y-auto mt-16 mb-11"> {/* No margin needed here */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
