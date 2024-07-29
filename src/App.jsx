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
import Logout from "./components/Logout/Logout.jsx";

function App() {
  const [auth, setAuth] = useState(()=>{
    localStorage.removeItem('accessToken');
    return {};
  });
  const navigate = useNavigate();
  const loginSubmitHandler = async (values) => {
const result = await authService.login(values.email, values.password);
setAuth(result);
localStorage.setItem('accessToken', result.accessToken);
console.log(result, "result");
navigate(Path.Home);
  }
const registerSubmitHandler = async (values) => {
  console.log(values, "values");
const result = await authService.register(values.email, values.password, values.username);
setAuth(result);
console.log(result, "result");
localStorage.setItem('accessToken', result.accessToken);
navigate(Path.Home);
};

const logoutHandler =  () => {
  setAuth({});
  localStorage.removeItem('accessToken');
}
  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    username: auth.username,
    email: auth.email,
    isAuthenticated: !!auth.email
  }

  return (
    <AuthContext.Provider value={values}>
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pizzas" element={<PizzaList />} />
        <Route path="/login" element={<Login/>} />
        <Route path={Path.Logout} element={<Logout/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/pizzas/create" element={<PizzaCreate />} />
        <Route path="/pizzas/:pizzaId" element={<PizzaDetails />} />

      </Routes>
    </>
    </AuthContext.Provider>
  );
}

export default App;
