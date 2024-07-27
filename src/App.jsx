import Navigation from "./components/Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import PizzaCreate from "./components/PizzaCreate/PizzaCreate";
import PizzaList from "./components/PizzaList/PizzaList.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import PizzaDetails from "./components/PizzaDetails/PizzaDetails.jsx";
import { useState } from "react";

function App() {
  const [auth, setAuth] = useState({});
  const loginSubmitHandler = (data) => {

console.log(data, "data");
  }
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pizzas" element={<PizzaList />} />
        <Route path="/login" element={<Login loginSubmitHandler={loginSubmitHandler} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pizzas/create" element={<PizzaCreate />} />
        <Route path="/pizzas/:pizzaId" element={<PizzaDetails />} />
      </Routes>
    </>
  );
}

export default App;
