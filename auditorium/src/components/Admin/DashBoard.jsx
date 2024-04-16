import { useEffect, useState } from "react"
import React from 'react'
import { jwtDecode } from 'jwt-decode'
import AdminNavbar from "../Navbars/AdminNavbar"
export default function DashBoard() {
  const [cred, setCred] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwtDecode(token)
      if (!user) {
        localStorage.removeItem('token')

      }
    }
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/GetBookings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.status}`);
        }

        const data = await response.json();
        // Filter bookings where isAccepted is 0 (not accepted yet)
        const filteredData = data.filter((item) => item['isAccepted'] === 0);
        setCred(filteredData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [])
  
  const submit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/GetBookings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })

    const data = await response.json();
    console.log(data);
    setCred(data); // Log the response from the server
  }
  const accept = async (event, index) => {
    event.preventDefault();

    const id = cred[index]['_id']

    try {
      const updateData = { isAccepted: 1 }; // Update object
      const response = await fetch(`http://localhost:1337/api/bookings/accept/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error(`Update failed with status ${response.status}`);
      }

      const updatedBooking = await response.json();
      console.log('Booking updated successfully:', updatedBooking);
      // Optimistic update: Update local state to reflect the change immediately
      setCred((prevCred) =>
        prevCred.map((item, i) => (i === index ? updatedBooking : item))
      );
      // Clear loading state
      // Handle successful update (e.g., display confirmation message)
    } catch (error) {
      console.error('Error updating booking:', error);
      // Clear loading state on error
      // Handle update errors
    }
  }
  const reject = async (event, index) => {
    event.preventDefault();

    const id = cred[index]['_id']

    try {
      const updateData = { isAccepted: 2 }; // Update object
      const response = await fetch(`http://localhost:1337/api/bookings/reject/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error(`Update failed with status ${response.status}`);
      }

      const updatedBooking = await response.json();
      console.log('Booking updated successfully:', updatedBooking);
      setCred((prevCred) =>
      prevCred.map((item, i) => (i === index ? updatedBooking : item))
    );
      // Clear loading state
      // Handle successful update (e.g., display confirmation message)
    } catch (error) {
      console.error('Error updating booking:', error);
      // Clear loading state on error
      // Handle update errors
    }
  }
  return (
    <>
      <AdminNavbar />
      <div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           </div>
          <div className="grid grid-rows-3 grid-cols-3 gap-4">
            {cred != null && cred.filter((item) => item['isAccepted'] === 0).map((item, index) => (
               <div
               className="max-w-sm p-6 m-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
               key={item} // Add key prop for performance optimization
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
               <button onClick={(e) => accept(e, index)} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                 Accept
               </button>
               <button onClick={(e) => reject(e, index)} class="inline-flex items-center ms-20 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-right-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                 Reject

               </button>
             </div>
            ))}
            
          </div>

        </div>
      </div></>
  )
}
