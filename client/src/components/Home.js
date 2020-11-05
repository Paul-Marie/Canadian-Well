import React, { memo, useEffect, useState } from "react";
import { fetchAllTemperatures, fetchCurrentTemperature } from "./../services/api";
import { Line } from 'react-chartjs-2';
import Loader from "./../utils/Loader";

import "../styles/Home.css";

const Home = () => {
  const [temperatures, setTemperatures] = useState(undefined);
  const [current, updateCurrent] = useState(undefined);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const result = await fetchAllTemperatures();
      console.log(result)
      setTemperatures(result);
      console.log("toto");
      console.log({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: result.data.map(elem => {
          console.log(elem)
          return {
            label: elem.id
            /*
            label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        */
          }
        })
      });
      setData({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: result.data.map(elem => {
          return [
            
          ]
        })
      })
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await fetchCurrentTemperature();
      console.log(result);
      updateCurrent(result);
    })();
  }, [temperatures]);

  return (
    <>
      <div className="current-time">
        {(temperatures) ? (
          <>
          </>
        ) : (
          <Loader />
        )};
      </div>
      <div className="graph">
        {(data) ? (
          <>
            <Line
              data={data}
            />
          </>
        ) : (
        <Loader />
        )};
      </div>
    </>
  );
};

export default memo(Home);
