import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService.js";
import AuthContext from "../../context/authContext.js";
import Path from "../../paths.js";
export default function Logout() {
  const { logoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    authService
      .logout()
      .then(() => {
        logoutHandler();
        navigate(Path.Home);
      })
      .catch(() => navigate(Path.Home));
  }, []);

  return null;
}
