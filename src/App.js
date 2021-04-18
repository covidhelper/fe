import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './views/LandingPage/LandingPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={LandingPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
