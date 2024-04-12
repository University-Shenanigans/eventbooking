import { useEffect } from "react"
import React from 'react'
import { jwtDecode } from 'jwt-decode'
import AdminNavbar from "../Navbars/AdminNavbar"
export default function DashBoard() {
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
		<AdminNavbar/>  
		<div>

			DashBoard of Admin</div></>
	)
}
