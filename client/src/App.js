import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Details from './components/Details/Details';
import NewDog from './components/NewDog/NewDog.jsx';
import Header2 from './components/Header/Header2.jsx';


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
          <Header2/>
          <Details/>
        </Route>

        <Route path='/new'>
          <Header2/>
          <NewDog/>
        </Route>

      </Switch>

      </div> 
    </Router>
    
    
  );
}

export default App;
