import React from "react";
import KPICards from "../components/Dashboard/KPICards";
import Charts from "../components/Dashboard/Charts";
import { useEffect } from "react";
import useStockRequests from "../services/useStockRequests";

const Home = () => {
  const { getStock } = useStockRequests();

  useEffect(() => {
    getStock("purchases");
    getStock("sales");
  }, []);

  return (
    <div>
      <KPICards />
      <Charts />
    </div>
  );
};

export default Home;
