import { useEffect,useState } from "react"
import React from 'react'
import { jwtDecode } from 'jwt-decode'
import AdminNavbar from "../Navbars/AdminNavbar"
export default function DashBoard() {
	const [cred,setCred] = useState(null)
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwtDecode(token)
			if (!user) {
				localStorage.removeItem('token')

			}
		}
	}, [])
	const submit = async(event)=>{
		event.preventDefault();
		const response = await fetch('http://localhost:1337/api/GetBookings',{
			method: 'GET', 
			headers:{
				'Content-Type':'application/json',
			},
			
		})
		
		const data = await response.json();
		console.log(data);
		setCred(data); // Log the response from the server
	}
	return (
		<>
		<AdminNavbar/>  
		<div>

			DashBoard of Admin
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <button onClick={submit}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Load Requests
          </button></div>
		  <div className="grid grid-rows-3 grid-cols-3 gap-4">
  {cred != null && cred.map((item, index) => (
    <div
      className="max-w-sm p-6 m-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
      key={index} // Add key prop for performance optimization
    >
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        UserName: {item['username']}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        Event Name: {item['eventName'] || 'N/A'}  {/* Display 'N/A' for missing values */}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        Auditorium: {item['auditorium'] || 'N/A'}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        From Time: {item['fromtime']}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        To Time: {item['totime']}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        No. of Attendees: {item['noOfAttendees'] || 'N/A'}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        Department: {item['department'] || 'N/A'}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        Category: {item['category'] || 'N/A'}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        Email: {item['email'] || 'N/A'}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        First Person: {item['firstperson'] || 'N/A'}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        Faculty: {item['faculty'] || 'N/A'}
      </p>
      <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        Phone: {item['phone'] || 'N/A'}
      </p>
    </div>
  ))}
</div>

      </div>
			</div></>
	)
}
