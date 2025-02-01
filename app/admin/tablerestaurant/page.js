'use client'
import React, { useEffect, useState } from 'react';
import Sidebarbtn from '../components/Sidebarbtn'

const page = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchRestaurants() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/restaurantCRUD/read`);
      const data = await res.json();
      setRestaurants(data);
      console.log(data);
    }
    fetchRestaurants();
  }, []);

  return (
    <div className='w-[83%] max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg'>


      <Sidebarbtn />


      <div>

        <h1 className='font-bold text-2xl mx-8 my-4'>Restaurants will appear here:</h1>

        <div className="table w-[80%] mx-auto bg-slate-600  border border-slate-600 rounded-lg bg-opacity-80 drop-shadow-2xl">

          <div className="head w-full rounded-t-lg p-4 font-bold bg-slate-800 flex justify-around gap-1">
            <h1 className='w-[20%] text-center'>ID</h1>
            {/* <h1 className='w-[20%] text-center'>Image</h1> */}
            <h1 className='w-[20%] text-center'>Name</h1>
            <h1 className='w-[20%] text-center'>Status</h1>
            <h1 className='w-[20%] text-center'>Image URL</h1>
          </div>

          <div className="body min-h-[20vh] max-h-[60vh] overflow-auto">


            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className={`item w-full border-b-2 border-slate-600 p-4 hover:bg-slate-600 duration-200 bg-slate-6000 flex justify-around gap-1 ${restaurant.status === 0 ? 'opacity-50' : ''}`}>
                <h3 className='w-[20%] text-center'>{restaurant.id}</h3>
                {/* <h3 className='w-[20%] text-center flex justify-center'><img width={50} src="/restaurants/best-bite.jpg" alt="restaurant image" /></h3> */}
                <h3 className='w-[20%] text-center'>{restaurant.name}</h3>
                <h3 className='w-[20%] text-center'>{restaurant.status === 1 ? 'Active' : 'Inactive'}</h3>

                <h3 className='w-[20%] text-center'>{restaurant.image}</h3>
              </div>
            ))}





          </div>







        </div>

      </div>
    </div>
  )
}

export default page