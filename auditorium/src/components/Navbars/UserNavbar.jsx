import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link,useNavigate } from 'react-router-dom'
const navigation = [
  { name: 'About', href: '#', current: true ,toAddress:"/About"},
  { name: 'Schedule', href: '#', current: false,toAddress:"/Schedule" },
  
 
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserNavbar() {
  let navigate = useNavigate()
  const handleLogout = (navigate) => {
    //e.preventDefault();
    // Clear the JWT token from local storage
    localStorage.removeItem('token');
    //alert("removed")
    // Redirect to login page
    //setLogout(1);
   
    navigate('/login')
    navigate(0)
    
  
  };
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto sm:px-6 lg:px-4">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/"><img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /></Link>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                <p className="flex flex-shrink-0 items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-5xl font-9xl ">AUDIB</p></div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link to={item.toAddress}><a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a></Link>
                    ))}
                     <button
                  type="submit" onClick={()=>handleLogout(navigate)}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  LOGOUT
                </button>
                  </div>

                
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
                 
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
