/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const consultarBebida = async (datos) => {
    /*
    Search by ingredient
    www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
    www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka

    Filter by Category
    www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
    www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail
    */
    try {
      const url = `
      https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}
      `;
      const { data } = await axios(url);
      setBebidas(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BebidasContext.Provider value={{ consultarBebida, bebidas }}>
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;
