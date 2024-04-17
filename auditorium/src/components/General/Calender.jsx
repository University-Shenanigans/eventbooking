import React from 'react'
import { useEffect, useState } from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'


import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Calender() {
  const [cred, setCred] = useState(null)
  const [event,setEvents] = useState([])
  const localizer = momentLocalizer(moment)
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
        
        // Filter bookings where isAccepted is 1
        const acceptedBookings = data.filter(booking => booking.isAccepted === 1);
        
        // Set the filtered bookings to the state
        setCred(acceptedBookings);
        console.log(acceptedBookings);
    
        // Convert the filtered bookings to events format
        const events = acceptedBookings.map((item) => ({
          title: item.eventName,
          start: new Date(item.fromtime),
          end: new Date(item.totime)
        }));
    
        console.log(events);
        setEvents(events);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    

    fetchBookings();
  }, [])

const events=[]
  return (
    <div>
       <br></br> <br></br> <br></br>
        <Calendar
      localizer={localizer}
      events={event}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </div>
  )
}
