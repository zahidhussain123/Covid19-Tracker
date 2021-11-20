import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Charts.module.css";
// import { registerables } from "chart.js";

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [daily, setDaily] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      setDaily(await fetchDailyData());
    };
    fetchApi();
  }, []);

  const lineChart = daily.length ? (
    <Line
      data={{
        labels: daily.map(({ date }) => date),
        datasets: [
          {
            data: daily.map(({ confirmed }) => confirmed),
            label: "infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: daily.map(({ deaths }) => deaths),
            label: "deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0 , 0 , 255 , 0.5)",
              "rgba(0 , 255 , 0 , 0.5)",
              "rgba(255 , 0 , 0 , 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>
      {/* {lineChart} */}
      {country ? barChart : lineChart}
    </div>
  );
};

export default Charts;
