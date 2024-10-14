import { useAppSelector } from "@/store";
import React from "react";
import { LayoutRouteProps, Navigate } from "react-router-dom";

interface AuthMiddlewareProps {
  layout?: React.FC<LayoutRouteProps>;
  isAuthProtected: boolean;
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({
  layout: Layout,
  children,
  isAuthProtected,
}) => {
  const { token } = useAppSelector((state) => state.auth);

  // Log the token to see its value and changes
  console.log("AuthMiddleware token:", token);

  // Redirect to sign-in if protected route and user is not authenticated
  if (isAuthProtected && !token) {
    return <Navigate to="/sigin-in" />;
  }

  // Render layout or children
  return Layout ? <Layout>{children}</Layout> : <>{children}</>;
};

export default AuthMiddleware;
