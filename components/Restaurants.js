'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'

const Restaurants = () => {
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
    <div className='bg-slate-4000 bg-opacity-50 mx-auto w-[95%] max-sm:w-fit'>
      <div className='flex flex-col h-72 overflow-hidden relative'>
        <img className='object-cover opacity-70' src="food-cover.jpg" alt="" />
        <div className='absolute top-0 h-72 flex items-center'>
          <h1 className='font-bold text-5xl mx-12 opacity-90'>Choose a Restaurant</h1>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12">
        <article>
          <section className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
            {restaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
                style={{ backgroundImage: `url('${restaurant.image}')` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-55 group-hover:opacity-50 transition duration-300 ease-in-out"></div>
                <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                  <h3 className="text-center">
                    <Link href={`/products/${restaurant.id}`} className="text-white text-2xl font-bold text-center">
                      <span className="absolute inset-0"></span>
                      {restaurant.name}
                    </Link>
                  </h3>
                </div>
              </article>
            ))}
          </section>
        </article>
      </section>
    </div>
  );
}

export default Restaurants;
