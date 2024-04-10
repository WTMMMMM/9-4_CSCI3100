// analytics.tsx
import { Typography } from "@material-ui/core";
import { Box, Button, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { AnalyticsCategory, ChartData } from "../../models/models";
import Bracelets from "./Bracelets";
import Gadgets from "./Gadgets";
import TshirtChart from "./T-shirt";
import React, { useEffect, useState } from "react";
import NavBar from "../../common/navbar";
import { baseUrl, getRequestOptions, handleAuth } from "../../common/cookie";

const convertToChartData = (categoryData: any, label: string, borderColor: string, backgroundColor: string): ChartData => {
  // Assuming categoryData is your AnalyticsCategory with date keys.
  // Convert this object into an array of numbers for the data property.
  const data = Object.keys(categoryData).map((key) => categoryData[key]);
  return {
    label,
    data,
    borderColor,
    backgroundColor,
  };
};

function Analytics() {
  // Assume you have actual data for these categories
  let [actualTshirtData, setTshirts] = useState({});
  let [actualBraceletData, setBracelets] = useState({});
  let [actualGadgetData, setGadgets] = useState({});

  // Convert actual data to chart data
  const tshirtsChartData = convertToChartData(actualTshirtData, "T-Shirts", "rgb(75, 192, 192)", "rgba(75, 192, 192, 0.5)");
  const braceletsChartData = convertToChartData(actualBraceletData, "Bracelets", "rgb(255, 206, 86)", "rgba(255, 206, 86, 0.5)");
  const gadgetsChartData = convertToChartData(actualGadgetData, "Gadgets", "rgb(153, 102, 255)", "rgba(153, 102, 255, 0.5)");

  // Labels should correspond to dates in the AnalyticsCategory
  const labels = ["Jan", "Feb", "March", "April", "May", "June", "July", "August"]; // Use the keys from actual data

  // Function to create a dataset for the Chart component
  const createChartData = (chartData: ChartData) => ({
    labels,
    datasets: [chartData],
    
  });
  let url = baseUrl + "analytics";
  useEffect(() => {
    fetch(url, getRequestOptions)
      .then((res) => {
        handleAuth(res.status);
        return res.json();
      })
      .then((data) => {
        setTshirts(data.tshirts);
        setBracelets(data.bracelets);

        setGadgets(data.gadgets);

        console.log(data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="analytics-title">Analytics Dashboard</h1>
      <div className="charts-container">
        <div className="chart-container">
          <TshirtChart data={createChartData(tshirtsChartData)} />
        </div>
        <div className="chart-container">
          <Gadgets data={createChartData(gadgetsChartData)} />
        </div>

        <div className="chart-container">
          <Bracelets data={createChartData(braceletsChartData)} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
