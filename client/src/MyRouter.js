import React, { memo } from "react";
import { Router, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Home from "./components/Home";
import history from "./utils/History";

const MyRouter = () => {
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Menu />
      <div className="main-content">
        <Route path="/" exact component={Home} />
      </div>
    </Router>
  );
};

export default memo(MyRouter);
