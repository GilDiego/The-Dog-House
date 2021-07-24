import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { render } from 'react-dom';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Details from './components/Details/Details';
import NewDog from './components/NewDog/NewDog.jsx';


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
