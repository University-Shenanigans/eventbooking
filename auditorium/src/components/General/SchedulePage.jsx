import React,{useState} from 'react'
import GeneralNavbar from "../Navbars/GeneralNavbar"
export default function SchedulePage() {
  const [formData, setFormData] = useState({
    eventName: '',
    auditorium: '',
    fromtime: '',
    totime: '',
    noOfAttendees: '',
    department: '',
    category: '',
    email: '',
    firstperson: '',
    faculty: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, such as sending it to a server
    console.log(formData);
    // Reset the form after submission
    setFormData({
      eventName: '',
      auditorium: '',
      fromtime: '',
      totime: '',
      noOfAttendees: '',
      department: '',
      category: '',
      email: '',
      firstperson: '',
      faculty: '',
      phone: ''
    });
  };
  return (
    <div>
      <GeneralNavbar/>
  
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Schedule Your Auditorium Slot
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium leading-6 text-gray-900">
                Event Name
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="eventName"
                  value={formData.eventName}
              onChange={handleChange}
              
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="auditorium" className="block text-sm font-medium leading-6 text-gray-900">
                Enter Auditorium
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="auditorium"
                  value={formData.auditorium}
                  onChange={handleChange}
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="fromtime" className="block text-sm font-medium leading-6 text-gray-900">
                From time
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="fromtime"
                  value={formData.fromtime}
              onChange={handleChange}
                  type="datetime-local"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="totime" className="block text-sm font-medium leading-6 text-gray-900">
                To time
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="totime"
                  value={formData.totime}
              onChange={handleChange}
                  type="datetime-local"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="noOfAttendees" className="block text-sm font-medium leading-6 text-gray-900">
                No Of Attendees
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="noOfAttendees"
                  value={formData.noOfAttendees}
                  onChange={handleChange}
                  type="number"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                Enter department name
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="department"
                  type="text"
                  value={formData.department}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Enter Category
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Enter Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="firstperson" className="block text-sm font-medium leading-6 text-gray-900">
                Enter Name of First Coordinating person
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="firstperson"
                  value={formData.firstperson}
                  onChange={handleChange}
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="Faculty" className="block text-sm font-medium leading-6 text-gray-900">
                Enter Faculty Coordinator
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="faculty"
                  value={formData.faculty}
              onChange={handleChange}
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Enter Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="phone"
                  value={formData.phone}
              onChange={handleChange}
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>

         
        </div>
      </div>
   
  

</div>
  )
}
