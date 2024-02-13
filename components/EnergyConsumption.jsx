import React, { useEffect, useState } from "react";
import { renderChart } from "../utils/chart.js";
import { groupByDay, sortByTime } from "../utils/reading";
import ConsumptionCard from "./ConsumptionCard.jsx";


export const EnergyConsumption = ({ readings }) => {
  const [newReadings, setNewReadings] = useState(readings);
  const containerId = "usageChart";
  const totalValue = sortByTime(groupByDay(newReadings))?.reduce((sum, curr) => {
    return sum + (curr?.value || 0)
  }, 0)

  const totalCost = 0.138 * totalValue;
  const roundedTotalCost = Math.round(totalCost)
  const totalFootprint = parseFloat(0.0002532 * totalValue).toFixed(4);
  useEffect(() => {
    renderChart(containerId, sortByTime(groupByDay(readings)).slice(-30));
  }, []);

  // const handleClick = () => {
  //   const currentTime = new Date();
  //   const 
  //   setNewReadings 
  // }

  return (
    <>
      <h1 className="regular darkgray line-height-1 mb3">Energy consumption</h1>
      <section className="mb3">
        <button
          className="
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
              border-grey
              bg-blue
              white
              bold
            "
        >
          Last 30 days
        </button>
        {/* <button
          onClick={handleClick}
          className="
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
              border-grey
              bg-blue
              white
              bold
            "
        >
          Last 24 hours
        </button> */}
      </section>
      <section className="chartHeight mb3">
        <canvas id={containerId} />
      </section>
      <section style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '2rem' }}>
        <ConsumptionCard icon={"☀️"} title="Cost" value={roundedTotalCost} unit="kWh" />
        <ConsumptionCard icon={"☀️"} title="Consumption" value={totalValue} unit="$" />
        <ConsumptionCard icon={"☀️"} title="Footprint" value={totalFootprint} unit="tonnes" />
      </section>
    </>
  );
};
