import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./EOQGraph.css";

const EOQGraph = () => {
  const [demand, setDemand] = useState(300); // Initial demand value
  const [holdingCost, setHoldingCost] = useState(0); // Initial holding cost value
  const [setupCost, setSetupCost] = useState(0); // Initial setup cost value
  const [prodCost, setProdCost] = useState(0); // Initial production cost value
  const [bestGuess, setBestGuess] = useState(300); // Initial best guess value

  // Calculate EOQ
  const eoq = Math.sqrt((2 * demand * setupCost) / holdingCost);

  // Calculate total cost for the best guess
  const totalCostBestGuess = (
    (demand * prodCost) / bestGuess +
    (bestGuess * holdingCost) / 2 +
    (setupCost * demand) / bestGuess
  ).toFixed(2);

  // Calculate total cost for the optimal EOQ
  const optimalEOQ = Math.sqrt((2 * demand * setupCost) / holdingCost);
  const totalCostOptimalEOQ = (
    (demand * prodCost) / optimalEOQ +
    (optimalEOQ * holdingCost) / 2 +
    (setupCost * demand) / optimalEOQ
  ).toFixed(2);

  // Data for the graph
  const data = [];
  for (let i = 0; i <= demand; i += 10) {
    const quantity = Math.round((i / demand) * eoq);
    const productionCost = ((demand * prodCost) / quantity).toFixed(2);
    const holdingCostPerYear = ((quantity * holdingCost) / 2).toFixed(2);
    const setupCostPerYear = ((setupCost * demand) / quantity).toFixed(2);
    const totalCost = (
      (demand * prodCost) / quantity +
      (quantity * holdingCost) / 2 +
      (setupCost * demand) / quantity
    ).toFixed(2);
    data.push({
      Demand: i,
      EOQ: quantity,
      ProductionCost: productionCost,
      HoldingCost: holdingCostPerYear,
      SetupCost: setupCostPerYear,
      TotalCost: totalCost,
    });
  }

  // Handler for demand slider
  const handleDemandChange = (event) => {
    setDemand(Number(event.target.value));
  };

  // Handler for holding cost slider
  const handleHoldingCostChange = (event) => {
    setHoldingCost(Number(event.target.value));
  };

  // Handler for setup cost slider
  const handleSetupCostChange = (event) => {
    setSetupCost(Number(event.target.value));
  };

  // Handler for production cost slider
  const handleProdCostChange = (event) => {
    setProdCost(Number(event.target.value));
  };

  // Handler for best guess input
  const handleBestGuessChange = (event) => {
    setBestGuess(Number(event.target.value));
  };

  return (
    <div className="container">
      <div className="input-section">
        <h2>Input Values</h2>
        <div>
          <label htmlFor="demand">Demand (Units):</label>
          <input
            type="number"
            id="demand"
            value={demand}
            onChange={handleDemandChange}
          />
        </div>
        <div>
          <label htmlFor="holdingCost">
            Holding Cost (₹ per Unit per Year):
          </label>
          <input
            type="number"
            id="holdingCost"
            value={holdingCost}
            onChange={handleHoldingCostChange}
          />
        </div>
        <div>
          <label htmlFor="setupCost">Set-up Cost (₹):</label>
          <input
            type="number"
            id="setupCost"
            value={setupCost}
            onChange={handleSetupCostChange}
          />
        </div>
        <div>
          <label htmlFor="prodCost">Production Cost (₹):</label>
          <input
            type="number"
            id="prodCost"
            value={prodCost}
            onChange={handleProdCostChange}
          />
        </div>
        <div>
          <label htmlFor="bestGuess">Enter your Best Guess for Q:</label>
          <input
            type="number"
            id="bestGuess"
            value={bestGuess}
            onChange={handleBestGuessChange}
          />
        </div>
      </div>

      <div className="visualization-section">
        <h2>Visualization</h2>
        <div>
          <h3>Data</h3>
          <table>
            <tbody>
              <tr>
                <th>SL.NO</th>
                <th>Metric</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Order Quantity</td>
                <td>{bestGuess}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Total Cost</td>
                <td>{totalCostBestGuess}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Total Annual Hold</td>
                <td>{((bestGuess * holdingCost) / 2).toFixed(2)}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Total Annual Setup</td>
                <td>{((setupCost * demand) / bestGuess).toFixed(2)}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Total Less c</td>
                <td>{((demand * prodCost) / bestGuess).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="line-chart">
          <h3>Cost-Quantity Relationship</h3>
          <LineChart width={1000} height={500} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Demand" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="EOQ" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="estimate-section">
          <h3>Estimate</h3>
          <table>
            <tbody>
              <tr>
                <th>SL.NO</th>
                <th>Metric</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Order Quantity</td>
                <td>{optimalEOQ.toFixed(2)}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Total Cost</td>
                <td>{totalCostOptimalEOQ}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Total Annual Hold</td>
                <td>{((optimalEOQ * holdingCost) / 2).toFixed(2)}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Total Annual Setup</td>
                <td>{((setupCost * demand) / optimalEOQ).toFixed(2)}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Total Less c</td>
                <td>{((demand * prodCost) / optimalEOQ).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EOQGraph;
