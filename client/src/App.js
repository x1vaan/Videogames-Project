import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home.jsx';
import NavBar from './Components/Navbar/Navbar.jsx';
import Videogames from './Components/Videogames/Videogames';
import Videogamedetail from './Components/Videogamedetail/Videogamedetail.jsx'
import CreateVideogame from './Components/CreateVideogame/CreateVideogame';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/videogames' element={<> <NavBar/><Videogames/></>}/>  
        <Route path='/videogame/:id' element={<Videogamedetail/>}/>
        <Route path='/videogames/create' element={<CreateVideogame/>}/>
      </Routes>
    </div>
  );
}

export default App;
