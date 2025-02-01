'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Sidebarbtn from '../components/Sidebarbtn';

const page = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [restaurants, setRestaurants] = useState({}); // Store restaurants in an object for quick lookup

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch food items
        const foodRes = await fetch(`${process.env.NEXT_PUBLIC_URI}/fooditemCRUD/read`);
        const foodData = await foodRes.json();

        // Fetch restaurants
        const restaurantRes = await fetch(`${process.env.NEXT_PUBLIC_URI}/restaurantCRUD/read`);
        const restaurantData = await restaurantRes.json();

        // Create a lookup object for restaurants
        const restaurantLookup = restaurantData.reduce((acc, restaurant) => {
          acc[restaurant.id] = restaurant.name; // Map res_id to restaurant name
          return acc;
        }, {});

        setFoodItems(foodData);
        setRestaurants(restaurantLookup);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='w-[83%] max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg'>
      <Sidebarbtn />

      <div>
        <h1 className='font-bold text-2xl mx-8 my-4'>Food Items will appear here:</h1>

        <div className="table w-[80%] mx-auto bg-slate-600 border border-slate-600 rounded-lg bg-opacity-80 drop-shadow-2xl">
          <div className="head w-full rounded-t-lg p-4 font-bold bg-slate-800 flex justify-around gap-1">
            <h1 className='w-[10%] text-center'>ID</h1>
            <h1 className='w-[20%] text-center'>Name</h1>
            <h1 className='w-[30%] text-center'>Description</h1>
            <h1 className='w-[10%] text-center'>Price</h1>
            <h1 className='w-[15%] text-center'>Image URL</h1>
            <h1 className='w-[15%] text-center'>Restaurant</h1>
          </div>

        
            <div className="body min-h-[20vh] max-h-[60vh] overflow-auto">
              {foodItems.map((food) => (
                <div
                  key={food.id}
                  className={`item w-full border-b-2 border-slate-600 p-4 hover:bg-slate-600 duration-200 bg-slate-600 flex justify-around gap-1 h-16 overflow-hidden text-center ${food.status === 0 ? 'opacity-50' : ''
                    }`}
                >
                  <h3 className='w-[10%] text-center'>{food.id}</h3>
                  <h3 className='w-[20%] text-center'>{food.name}</h3>
                  <h3 className='w-[30%] text-center'>{food.description}</h3>
                  <h3 className='w-[10%] text-center'>Rs.{food.price.toFixed(2)}</h3>
                  <h3 className='w-[15%] text-center'>{food.image}</h3>
                  <h3 className='w-[15%] text-center'>{restaurants[food.res_id] || "Unknown"}</h3>
                </div>
              ))}
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default page;
