import GeneralNavbar from "../Navbars/GeneralNavbar"
import React, { useEffect, useState } from 'react'
import Calender from "./Calender"


export default function Home() {

    
   /* useEffect(() => {

     
    }, []);*/


    return (
        <div className="justify-items-center">
            <GeneralNavbar />
         <Calender/>
         
     
     
        </div>
    )
}
