import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home'
import Services from './components/Services/Services'
import ServicesDetails from './components/ServicesDetails/ServicesDetails.jsx'
import Contact from './components/Contact/Contact'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import ProtectedRoutes from './Routes/ProtectedRoutes'
import Profile from './components/Profile/Profile.jsx'
import ScrollToTop from './UI/ScrollToTop.jsx'

function App() {
  return (
    <>
    <BrowserRouter>
      <NavBar/>
      <ScrollToTop /> {/* Mueve esta línea dentro del BrowserRouter */}
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='support' element={<Contact/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='services' element={<Services/>}/>
        <Route path='register' element={<Register/>}/>
        <Route element={<ProtectedRoutes/>}> 
          <Route path='services/:id' element={<ServicesDetails />} />
          <Route path='profile/:id' element={<Profile/>}/>  
        </Route> 
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
