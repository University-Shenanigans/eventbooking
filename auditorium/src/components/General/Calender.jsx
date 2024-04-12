import React from 'react'
import GeneralNavbar from "../Navbars/GeneralNavbar"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'


import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment)


const events = [
  {
    title: 'Event 1',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  },
  {
    title: 'Event 2',
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  }
];
export default function Calender() {
  return (
    <div>
       <GeneralNavbar/><br></br>
        <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </div>
  )
}