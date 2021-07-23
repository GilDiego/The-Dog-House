import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { render } from 'react-dom';
import Home from './components/home';
import LandingPage from './components/landingPage';
import NavBar from './components/navbar';
import Details from './components/details';
import NewDog from './components/newDog';


function App() {
  return (
    <Router>
      <div className="App">

      <Switch>

        <Route exact path='/'>
          <LandingPage/>
        </Route>

        <Route path='/home'>
          <Home/>
        </Route>

        <Route path='/details'>
          <Details/>
        </Route>

        <Route path='/new'>
          <NewDog/>
        </Route>

      </Switch>

      </div> 
    </Router>
    
    
  );
}

export default App;
