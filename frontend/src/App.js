import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
   <>
   <BrowserRouter>
     <Routes>
      <Route path="/" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
   </BrowserRouter>
    
   </>
  );
}

export default App;
