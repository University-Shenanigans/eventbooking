import React from 'react'
import { useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode'
import { format } from 'date-fns';
import moment from"moment";
import UserNavbar from '../Navbars/UserNavbar'
import { Link } from 'react-router-dom';
export default function UserDashBoard() {
  const [cred, setCred] = useState(null)
  const [user, setUser] = useState("")
  const convertUTCToLocalTime = (dateString) => {
    const momentObj = moment(dateString);
    const formattedTime = momentObj.utc().format('h:mm a');
    const formattedDate = momentObj.format('MMMM Do YYYY');
    const formattedDateTime = `${formattedDate} ${formattedTime} `;

return formattedDateTime; // Output: 11:25 am on April 17th 2024
    
  };
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwtDecode(token)
      setUser(user.name)

      if (!user) {
        localStorage.removeItem('token')

      }
    }
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
  const Go = async(event,item)=>{
    event.preventDefault();
  }
  return (
    <>
      <UserNavbar />
      <div ><div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        </div>
        <div className="grid grid-rows-3 grid-cols-3 gap-4 bg-gray-200 ">
          {cred != null && cred.filter((item) => item['username'] === user).map((item, index) => (
            <div 
              className=" max-w-sm p-6 m-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
              key={item} // Add key prop for performance optimization
            >


              <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                {item['eventName'] || 'N/A'}  {/* Display 'N/A' for missing values */}
              </p>
             
         
<p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                  {convertUTCToLocalTime(item['fromtime'])}
                  {' - '}
                  {convertUTCToLocalTime(item['totime'])}
                </p>
              <p className={`mb-2 text-2xl tracking-tight ${item['isAccepted'] === 1 ? 'text-green-500' : (item['isAccepted'] === 2 ? 'text-red-500' : 'text-gray-900')} dark:text-white`}>
                {item['isAccepted'] === 1 ? 'Accepted' : (item['isAccepted'] === 2 ? 'Rejected' : 'Decision Pending')}
              </p>
              <Link to="/user/View" state={
    {id:item['_id']}
    // Add more properties here
  }
> <button class=" px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                 Go
               </button></Link>

            </div>
          ))}

        </div>

      </div></div>
    </>

  )
}
/*
  {cred != null && cred.filter((item) => item['username'] === user).map((item, index) => (
            <div 
              className="max-w-sm p-6 m-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
              key={item} // Add key prop for performance optimization
            >


              <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                Event Name: {item['eventName'] || 'N/A'}  {/* Display 'N/A' for missing values 
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
                <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                  Is Accepted: {item['isAccepted'] || 'N/A'}
                </p>
  
              </div>
            ))}

*/
