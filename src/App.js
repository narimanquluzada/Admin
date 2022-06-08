import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  QueryClient,QueryClientProvider } from 'react-query'
import LoginContextProvider from './Context/LoginContext';
import Login from './Components/Login';
import ProductList from './Components/ProductList';
import CategoryAdd from './Components/CategoryAdd';
import Navbar from './Components/Navbar';
import Inform from './Components/Inform';


const queryClient = new QueryClient()
function App() {
 

  return (
    <div >
      <QueryClientProvider client={queryClient}>
     <Router>
    < LoginContextProvider>
    <Navbar/>
 


            
               <Routes>
               
               <Route path='/list' element={<ProductList/>} />
               <Route path='/category' element={<CategoryAdd/>} />
               <Route path='/inform/:id' element={<Inform/>} />
               <Route path='/' element={<Login/>} />
               
               </Routes>
               </LoginContextProvider>
        </Router>
        </QueryClientProvider>
    </div>
  );
}

export default App;
