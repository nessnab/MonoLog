import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/auth/me", {
      credentials: "include",
      cache: "no-cache",
    })
      .then((response) => {
        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }  
    
  if (!authenticated) {
    return <Navigate to="/auth" replace />;
  } 

  return <Outlet />;
}