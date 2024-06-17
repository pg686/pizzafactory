
import Navigation from './components/Navigation/Navigation';
import {Routes, Route } from 'react-router-dom';
//import Dashboard from './components/Dashboard/Dashboard';
import PizzaCreate from './components/PizzaCreate/PizzaCreate';
function App() {

  return (
    <>
 <Navigation />
 <Routes>
  <Route path='/create' element={ <PizzaCreate />} />
 </Routes>
    </>
  )
}

export default App;
