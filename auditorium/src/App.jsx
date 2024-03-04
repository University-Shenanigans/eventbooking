import './App.css'
import Test2 from './components/Navbars/GeneralNavbar'
import SchedulePage from './components/General/SchedulePage'
import About from './components/General/About'
import Test from './components/General/Test'
import AdminPage from './components/Admin/AdminPage'
import { Routes, Route } from "react-router-dom"
function App() {


  return (
    <div >
     
     <Routes>
        <Route path="/" element={<Test2/>}/>
        <Route path="/Schedule" element={<SchedulePage/>}/>
            <Route path="/Admin" element={<AdminPage/>}/>
            <Route path="/Test" element={<Test/>}/>
            <Route path="/About" element={<About/>}/>
      </Routes>
   
    </div>
  )
}

export default App
/*

 <Routes>
        <Route path="/" element={Test2}/>
      </Routes>*/
