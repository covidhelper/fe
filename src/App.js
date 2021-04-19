import { CircularProgress } from '@material-ui/core';
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

const Contribute = lazy(() => import('./views/Contribute/Contribute'));
const LandingPage = lazy(() => import('./views/LandingPage/LandingPage'));
const Seek = lazy(() => import('./views/Seek/Seek'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={
        <div className="loading">
          <CircularProgress color="primary" />
        </div>
      }
      >
        <Navbar />
        <Switch>
          <Route exact path="/get-help" component={Seek} />
          <Route exact path="/get-help/:uuid" component={Seek} />
          <Route exact path="/contribute" component={Contribute} />
          <Route path="/" component={LandingPage} />
        </Switch>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
