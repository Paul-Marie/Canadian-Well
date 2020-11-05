import React, { memo, useEffect, useState } from "react";
import { fetchAllTemperatures, fetchCurrentTemperature } from "./../services/api";
import { Line } from 'react-chartjs-2';
import Loader from "./../utils/Loader";

import "../styles/Home.css";

const Home = () => {
  const [current, updateCurrent] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const result = await fetchAllTemperatures();
      const ids = result.data.reduce((final, item) => (
        final.includes(item.id) ? final : [ ...final, item.id ]
      ), []).sort();
      const colors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
      setData({
        labels: result.data.reduce((final, item) => (
          final.includes(item.date)
            ? final
            : [ ...final, item.date ]
        ), []).sort(),
        datasets: ids.map((id) => ({
          label: id,
          fill: false,
          data: result.data.filter(
            (elem) => elem.id === id).map(
              (elem) => elem.value),
          borderColor: colors[id - 1],
          borderWidth: 1,
          lineTension: 0.1,
          borderCapStyle: 'butt',
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        }))
      });
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const result = await fetchCurrentTemperature();
      updateCurrent(result);
    })();
  }, [time]);

  return (
    <>
      <div className="title">
        <div className="title--text">
          Puits Canadien de Meximieux
        </div>
      </div>
      <div className="current-time">
        {(current) ? (
          <div className="current-time__container">
            {current.data[0].sensors.map((elem, key) => (
              <div
                className="current-time-container__item"
                key={key}>
                <div className="current-time-container__item--title">
                  Sonde {elem.id}
                </div>
                <div className="current-time-container__item--value">
                  {elem.value}°C
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
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
        )}
      </div>
    </>
  );
};

export default memo(Home);
