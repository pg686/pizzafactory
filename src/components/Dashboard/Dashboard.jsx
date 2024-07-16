import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import Card from "../../elements/Card/Card.jsx";
import * as pizzaService from "../../services/pizzaService.js";
import PizzaList from "../PizzaList/PizzaList.jsx";
export default function Dashboard() {
  return (
    <section className="home section" id="home">
      <div className="homeContainer container grid">
        <img src="/images/pizzaImage.png" className="homeImg" />
      </div>
      <div className="homeData">
        <h1 className="homeTitle">
          Enjoy Delicious
          <div>Pizza</div>
        </h1>
        <p className="homeDescription">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <a href="#" className="button">
          Order Now
          <FaArrowRight />
        </a>
      </div>
      <PizzaList />
    </section>
  );
}
