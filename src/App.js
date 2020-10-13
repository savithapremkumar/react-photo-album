import React from "react";
import Header from "./components/Header/index";
import Home from "./views/Home/index";
import Photos from "./views/Photos/index";
import "./styles/main.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SiteHeading } from "./constants/messages";

function App() {
  return (
    <Router>
      <div data-test="appComponent" className="App">
        <Header heading={SiteHeading} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/albums/:albumId/photos"
            render={(props) => {
              return <Photos {...props}></Photos>;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
