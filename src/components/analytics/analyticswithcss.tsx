// analytics.tsx
import { Link } from 'react-router-dom';
import { AnalyticsCategory, ChartData } from '../../models/models';
import Bracelets from './Bracelets';
import Gadgets from './Gadgets';
import TshirtChart from './T-shirt';
import React from 'react';
const convertToChartData = (categoryData: any, label: string, borderColor: string, backgroundColor: string): ChartData => {
  // Assuming categoryData is your AnalyticsCategory with date keys.
  // Convert this object into an array of numbers for the data property.
  const data = Object.keys(categoryData).map(key => categoryData[key]);
  return {
    label,
    data,
    borderColor,
    backgroundColor
  };
};

function Analytics() {
  // Assume you have actual data for these categories
  const actualTshirtData: AnalyticsCategory = {    "01/01/2024": 120,
  "01/02/2024": 150,
  "01/03/2024": 180,
  "01/04/2024": 90,
  "01/05/2024": 160,
  "01/06/2024": 170,
  "01/07/2024": 200,
  "01/08/2024": 130,
  "01/09/2024": 140,
  "01/10/2024": 190,
  "01/11/2024": 220,
  "01/12/2024": 210,};
  const actualBraceletData: AnalyticsCategory = {    "01/01/2024": 120,
  "01/02/2024": 150,
  "01/03/2024": 180,
  "01/04/2024": 90,
  "01/05/2024": 160,
  "01/06/2024": 170,
  "01/07/2024": 200,
  "01/08/2024": 130,
  "01/09/2024": 140,
  "01/10/2024": 190,
  "01/11/2024": 220,
  "01/12/2024": 210,};
  const actualGadgetData: AnalyticsCategory = {    "01/01/2024": 120,
  "01/02/2024": 150,
  "01/03/2024": 180,
  "01/04/2024": 90,
  "01/05/2024": 160,
  "01/06/2024": 170,
  "01/07/2024": 200,
  "01/08/2024": 130,
  "01/09/2024": 140,
  "01/10/2024": 190,
  "01/11/2024": 220,
  "01/12/2024": 210,};

  // Convert actual data to chart data
  const tshirtsChartData = convertToChartData(actualTshirtData, 'T-Shirts', 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.5)');
  const braceletsChartData = convertToChartData(actualBraceletData, 'Bracelets', 'rgb(255, 206, 86)', 'rgba(255, 206, 86, 0.5)');
  const gadgetsChartData = convertToChartData(actualGadgetData, 'Gadgets', 'rgb(153, 102, 255)', 'rgba(153, 102, 255, 0.5)');

  // Labels should correspond to dates in the AnalyticsCategory
  const labels = Object.keys(actualTshirtData); // Use the keys from actual data

  // Function to create a dataset for the Chart component
  const createChartData = (chartData: ChartData) => ({
    labels,
    datasets: [chartData],
  });

  return (
    <div className="analytics-container">
      
      <h1>Analytics Dashboard</h1>
      

      <TshirtChart data={createChartData(tshirtsChartData)} />
      <Gadgets data={createChartData(braceletsChartData)} />
      <Bracelets data={createChartData(gadgetsChartData)} />
      <div className = "analytics-buttons">      <Link to="/">
        <button type="button">Home</button>
      </Link>
      </div>
    </div>
  );
}

export default Analytics;