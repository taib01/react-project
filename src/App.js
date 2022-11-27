import './App.css';
import Home from './Component/Home';
import AddAgenda from './Component/AddAgenda';
import EditAgenda from './Component/EditAgenda'
import {BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route  exact path='/' element={<Home />} ></Route>
          <Route  path='/create' element={<AddAgenda />} ></Route>
          <Route  path='/edit' element={<EditAgenda />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
