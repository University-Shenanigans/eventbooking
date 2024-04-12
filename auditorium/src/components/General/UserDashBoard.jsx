import React from 'react'
import { useEffect } from "react"
import { jwtDecode } from 'jwt-decode'
import UserNavbar from '../Navbars/UserNavbar'
export default function UserDashBoard() {
    useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwtDecode(token)
			if (!user) {
				localStorage.removeItem('token')
				
			}
		}
	}, [])
  return (
	<>
	<UserNavbar/>
	<div>UserDashBoard</div>
	</>
    
  )
}
