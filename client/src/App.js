import './App.css';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <h1>Landing Page</h1>
      <Link to='/home'>
        <button>Let the dogs in!</button>
      </Link>
    </div> 
    
  );
}

export default App;
