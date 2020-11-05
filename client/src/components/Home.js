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
      const ids = result.data.reduce((final, item) =>
        final.includes(item.id) ? final : [ ...final, item.id ],
      []).sort();
      setTemperatures(result);
      const colors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
      setData({
        labels: result.data.reduce((final, item) =>(
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
            borderWidth: 1
        }))
      });
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
