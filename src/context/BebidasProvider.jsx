/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [bebidaId, setBebidaId] = useState(null);
  const [receta, setReceta] = useState(null);
  const [cargando, setCargando] = useState(false);

  /**
   * Lookup full cocktail details by id
    https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
   */
  useEffect(() => {
    setCargando(true);
    const obtenerReceta = async () => {
      if (!bebidaId) return; //Evitar nulos

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const { data } = await axios(url);
        setReceta(data.drinks[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    obtenerReceta();
  }, [bebidaId]);

  const handleModalClick = () => {
    setModal(!modal);
  };

  const handleBebidaIdClick = (id) => {
    setBebidaId(id);
  };

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
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        handleModalClick,
        modal,
        handleBebidaIdClick,
        receta,
        cargando,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;
