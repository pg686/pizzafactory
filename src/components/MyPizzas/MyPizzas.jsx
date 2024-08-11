import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext.jsx";
import PizzaList from "../PizzaList/PizzaList.jsx";
import "./MyPizzas.modules.css";

const MyPizzas = () => {
  const { userId } = useContext(AuthContext);
  return (
    <div className="pageWrapper">
      <h1>My Pizzas</h1>
      <PizzaList userId={userId} />
    </div>
  );
};

export default MyPizzas;
