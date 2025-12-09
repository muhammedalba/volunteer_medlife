import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import { successNotify } from "../utils/Toast";

const AuthContext = createContext(null);

// AuthProvider
const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [volunteer, setVolunteer] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = cookies.get("access_token", { path: "/" });
    const volunteerData = cookies.get("volunteer", { path: "/" });

    if (token && volunteerData) {
      setVolunteer({ ...volunteerData, token });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (responseData) => {
    try {
      const { user, access_token } = responseData;

      const expires = new Date();
      expires.setDate(expires.getDate() + 7);

      cookies.set("access_token", access_token, { path: "/", expires });
      cookies.set(
        "volunteer",
        { role: user.role, full_name: user.full_name},
        { path: "/", expires }
      );

      setVolunteer({ ...user, token: access_token });
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };
  // update volunteer
  const updateVolunteer = (volunteerData) => {
    setVolunteer(volunteerData);
  };

  const logout = () => {
    cookies.remove("access_token", { path: "/" });
    cookies.remove("volunteer", { path: "/" });
    // 
    setVolunteer(null);
    setIsAuthenticated(false);
    successNotify("تم تسجيل الخروج بنجاح ");
    
    return true;
  };

  const value = {
    volunteer,
    isAuthenticated,
    login,
    updateVolunteer,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//  useAuth
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
