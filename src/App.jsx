import Navigation from "./components/Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import PizzaCreate from "./components/PizzaCreate/PizzaCreate";
import PizzaList from "./components/PizzaList/PizzaList.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import PizzaDetails from "./components/PizzaDetails/PizzaDetails.jsx";
import Path from "./paths.js";
import { AuthProvider } from "./context/authContext.jsx";
import Logout from "./components/Logout/Logout.jsx";

function App() {
  return (
    <AuthProvider>
      <>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pizzas" element={<PizzaList />} />
          <Route path="/login" element={<Login />} />
          <Route path={Path.Logout} element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pizzas/create" element={<PizzaCreate />} />
          <Route path="/pizzas/:pizzaId" element={<PizzaDetails />} />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
