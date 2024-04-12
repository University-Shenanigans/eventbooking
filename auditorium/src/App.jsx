import './App.css'
import Test2 from './components/Navbars/GeneralNavbar'
import SchedulePage from './components/General/SchedulePage'
import About from './components/General/About'
import Test from './components/General/Test'
import AdminPage from './components/Admin/AdminPage'
import Calender from './components/General/Calender'
import Home from './components/General/Home'
import Register from './components/Authentication/register'
import Login from './components/Authentication/Login'
import DashBoard from './components/Admin/DashBoard'
import UserDashBoard from './components/General/UserDashBoard'
import { Routes, Route } from "react-router-dom"
function App() {


  return (
    <div >
     
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Schedule" element={<SchedulePage/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin/DashBoard" element={<DashBoard/>}/>
        <Route path="/user/DashBoard" element={<UserDashBoard/>}/>
            <Route path="/Admin" element={<AdminPage/>}/>
            <Route path="/Test" element={<Test/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path="/calendar" element={<Calender/>}/>
      </Routes>
   
    </div>
  )
}

export default App
/*

 <Routes>
        <Route path="/" element={Test2}/>
      </Routes>*/
