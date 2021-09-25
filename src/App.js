import { CircularProgress } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

const Contribute = lazy(() => import("./views/Contribute/Contribute"));
const LandingPage = lazy(() => import("./views/LandingPage/LandingPage"));
const Seek = lazy(() => import("./views/Seek/Seek"));

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="loading">
            <CircularProgress color="primary" />
          </div>
        }
      >
        <Navbar />
        <Switch>
          <Redirect exact from="/get-help" to="/get-info" />
          <Redirect exact from="/get-help/:uuid" to="/get-info/:uuid" />
          <Route exact path="/get-info" component={Seek} />
          <Route exact path="/get-info/:uuid" component={Seek} />
          <Route exact path="/add-info" component={Contribute} />
          <Route path="/" component={LandingPage} />
        </Switch>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
