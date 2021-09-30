import './App.css';
import { Route, Switch, HashRouter } from 'react-router-dom';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import LoginPage from './Components/LoginPage/LoginPage';
import Home from './Components/LandingPage/LandingPage';
import Shop from './Components/Shop/Shop';
import Rewards from './Components/Rewards/Rewards';
import Podcast from './Components/Podcast/Podcast';
import Dashboard from './Components/Dashboard/Dashboard';
import DigitalVault from './Components/DigitalVault/DigitalVault';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <HashRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/signup" component={SignUpPage}/>
            <Route exact path="/shop" component={Shop}/>
            <Route exact path="/rewards" component={Rewards}/>
            <Route exact path="/podcast" component={Podcast}/>
            <Route exact path="/vault" component={DigitalVault}/>
            <Route exact path="/dashboard" component={Dashboard}/>
          </Switch>
      </HashRouter>
      {/* </header> */}
    </div>
  );
}

export default App;