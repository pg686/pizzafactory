import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService.js";
import AuthContext from "../../context/authContext";
import Path from "../../paths.js";
import CardContext from "../../context/cardContext.jsx";
export default function Logout() {
  const { logoutHandler } = useContext(AuthContext);
  const { cleanCard } = useContext(CardContext)
  const navigate = useNavigate();
  useEffect(() => {
    authService
      .logout()
      .then(() => {
        logoutHandler();
        cleanCard();
        navigate(Path.Home);
      })
      .catch(() => navigate(Path.Home));
  }, []);

  return null;
}
