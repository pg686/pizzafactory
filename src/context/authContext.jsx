import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as authService from '../services/authService';
const AuthContext = createContext();
import Path from '../paths';

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        localStorage.removeItem("accessToken");
        return {};
      });
      const navigate = useNavigate();
      const loginSubmitHandler = async (values) => {
        const result = await authService.login(values.email, values.password);
        setAuth(result);
        localStorage.setItem("accessToken", result.accessToken);
        navigate(Path.Home);
      };
      const registerSubmitHandler = async (values) => {
        const result = await authService.register(
          values.email,
          values.password,
          values.username,
        );
        setAuth(result);
        localStorage.setItem("accessToken", result.accessToken);
        navigate(Path.Home);
      };
    
      const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem("accessToken");
      };
      const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username,
        email: auth.email,
        isAuthenticated: !!auth.email,
      };
    
    return (
    <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>);
}
AuthContext.displayName = "AuthContext";

export default AuthContext;
