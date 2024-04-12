import GeneralNavbar from "../Navbars/GeneralNavbar"
import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function Home() {
    const [PublicData, setPublicData] = useState(null)

    useEffect(() => {

        //Runs on every render
        axios.get("http://10.19.7.47:3000/api/data/publicfetch/")
            .then(result => {
                setPublicData(result.data)

                console.log(result.data[0])
                console.log(PublicData)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("Request made but no response received:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error setting up request:", error.message);
                }
                console.error("Error config:", error.config);
            });
    }, []);


    return (
        <div className="justify-items-center">
            <GeneralNavbar />

            <div className="grid grid-rows-3 grid-cols-3 gap-4">
                {PublicData != null && PublicData.map((item, index) => (
                    <div class=" max-w-sm p-6 m-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item['Name of the Event']}</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item['Date']}</p>

                    </div>
                ))}


            </div>
     
     
        </div>
    )
}
