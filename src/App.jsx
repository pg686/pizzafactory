
import Navigation from './components/Navigation/Navigation';
import {Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import PizzaCreate from './components/PizzaCreate/PizzaCreate';
import PizzaList from './components/PizzaList/PizzaList.jsx';
import PizzaDetails from './components/PizzaDetails/PizzaDetails.jsx';
function App() {

  return (
    <>
 <Navigation />
 <Routes>
  <Route path='/' element={ <Dashboard />} />
  <Route path='/pizzas'  element={ <PizzaList />} />
  <Route path='/pizzas/create' element={ <PizzaCreate />} />
  <Route path="/pizzas/:pizzaId" element={<PizzaDetails /> } />
 </Routes>
    </>
  )
}

export default App;
