'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const page = () => {
  const [fooditems, setFooditems] = useState([]);

  useEffect(() => {
    async function fetchfooditems() {
      const res = await fetch('http://localhost:3000/api/fooditemCRUD/read');
      const data = await res.json();
      setFooditems(data);
      console.log(data);
    }
    fetchfooditems();
  }, []);

  return (
    <div className='bg-gray-5000 bg-opacity-300'>
      {/* Cover Section */}
      <div className='flex flex-col h-56 overflow-hidden relative'>
        <img className='object-cover opacity-70' src="food-cover.jpg" alt="" />
        <div className='absolute top-0 h-56 flex items-center'>
          <h1 className='font-bold text-5xl mx-12 opacity-90'>Food Items</h1>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="w-[70%] max-sm:w-fit bg-gray-5000 mx-auto grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
        {fooditems.map((fooditem) => (
          <Link key={fooditem.id} href={`${fooditem.id}/food`} passHref>
            <div className="shadow-md rounded-lg max-w-sm bg-gray-800 border-gray-700 bg-opacity-70 hover:bg-opacity-90 cursor-pointer duration-300 m-2">
              {/* Image */}
              <div className="w-full h-96 max-2xl:h-72 max-xl:h-56 relative overflow-hidden">
                <img
                  className="rounded-t-lg p-8 bg-gray-8000 object-cover"
                  src={fooditem.image}
                  alt="Product Image not found!"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>

              <div className="px-5 pb-5">
                {/* Name */}
                <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                  {fooditem.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mt-2.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    5.0
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    Rs.{fooditem.price}
                  </span>
                  <button className="text-white duration-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
