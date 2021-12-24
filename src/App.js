import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./App.scss";
import Calculator from "./components/Calculator/Calculator";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Provider } from "./components/context";
const App = () => {
  const contextValue = {

  }
  return (
    <div className="App">
    <Provider value={contextValue}>
        <Calculator/>
    </Provider>
    </div>
  );
};

export default App;
