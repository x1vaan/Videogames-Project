import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Home.jsx';
import NavBar from './Components/Navbar/Navbar.jsx';
import Videogames from './Components/Videogames/Videogames';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/videogames'>
          <NavBar/>
          <Videogames/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
