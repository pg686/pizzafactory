import Navigation from "./components/Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import PizzaCreate from "./components/PizzaCreate/PizzaCreate";
import PizzaList from "./components/PizzaList/PizzaList.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import PizzaDetails from "./components/PizzaDetails/PizzaDetails.jsx";
import { useState } from "react";
import AuthContext from "./context/authContext.js";
import * as authService from "./services/authService.js";
import { useNavigate } from "react-router-dom";
import Path from "./paths.js";

function App() {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  const loginSubmitHandler = async (values) => {
const result = await authService.login(values.email, values.password);
setAuth(result);
console.log(result, "result");
navigate(Path.Home);
  }
const registerSubmitHandler = async (values) => {
 console.log(values, "values");
};
  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    username: auth.username,
    email: auth.email,
    isAuthenticated: !!auth.username
  }
  return (
    <AuthContext.Provider value={values}>
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pizzas" element={<PizzaList />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/pizzas/create" element={<PizzaCreate />} />
        <Route path="/pizzas/:pizzaId" element={<PizzaDetails />} />
      </Routes>
    </>
    </AuthContext.Provider>
  );
}

export default App;
