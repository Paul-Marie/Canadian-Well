import React, { memo, useEffect, useState } from "react";
import { fetchAllTemperatures, fetchCurrentTemperature } from "./../services/api";
import Loader from "./../utils/Loader";

import "../styles/Home.css";

const Home = () => {
  const [temperatures, setTemperatures] = useState(undefined);
  const [current, updateCurrent] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const result = await fetchAllTemperatures();
      console.log(result);
      setTemperatures(result);
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
        {(temperatures) ? (
          <>
          </>
        ) : (
        <Loader />
        )};
      </div>
    </>
  );
};

export default memo(Home);
