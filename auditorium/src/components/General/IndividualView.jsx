import React from 'react'
import UserNavbar from '../Navbars/UserNavbar'
import { useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { format } from 'date-fns';
export default function IndividualView() {
    const [cred, setCred] = useState(null)
    const [user, setUser] = useState("")
    useEffect(() => {
   
      const fetchBookings = async () => {
        try {
          const response = await fetch('https://eventbooking-8dlr.onrender.com/api/GetBookings', {
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
          const filteredData = data
          setCred(filteredData);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
  
      fetchBookings();
    }, [])
    const location = useLocation()
   
  const  data  = location
  const id = data['state']['id']
  
  
  return (
    <div>
        <UserNavbar/>
        <div ><div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        </div>
        <div className=" bg-gray-200 ">
          {cred != null && cred.filter((item) => item['_id'] === id).map((item, index) => (
            <div 
              className=" max-w-sm p-6 m-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
              key={item} // Add key prop for performance optimization
            >
                     <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                Event Name: {item['eventName'] || 'N/A'}  
                </p>
                <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                  Auditorium: {item['auditorium'] || 'N/A'}
                </p>
                <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                  From Time: {format(new Date(item['fromtime']), 'MMMM d, yyyy h:mm a')}
                </p>
                <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                  To Time:{format(new Date(item['totime']), 'MMMM d, yyyy h:mm a')}
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

             
             
              
             
              <p className={`mb-2 text-2xl tracking-tight ${item['isAccepted'] === 1 ? 'text-green-500' : (item['isAccepted'] === 2 ? 'text-red-500' : 'text-gray-900')} dark:text-white`}>
                {item['isAccepted'] === 1 ? 'Accepted' : (item['isAccepted'] === 2 ? 'Rejected' : 'Decision Pending')}
              </p>
       

            </div>
          ))}

        </div>

      </div></div>
       
    </div>
  )
}
