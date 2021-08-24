import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import SenderLink from "./SenderLink";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/links/:code" component={SenderLink} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
