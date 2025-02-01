'use client';
import React, { useEffect, useState } from 'react';


const FoodDetailPage = ({ params }) => {
  const { id } = params; // Assuming you pass the food ID as a route parameter
  const [foodItem, setFoodItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  console.log(id);
  useEffect(() => {
    async function fetchFoodData() {
      try {
        // Fetch the selected food item
        const foodRes = await fetch(`${process.env.NEXT_PUBLIC_URI}/foodCRUD/read?id=${id}`); // Assuming endpoint supports query params
        const foodData = await foodRes.json();
        setFoodItem(foodData);

        // Fetch all food items for related products
        const relatedRes = await fetch(`${process.env.NEXT_PUBLIC_URI}/foodCRUD/read`);
        const relatedData = await relatedRes.json();

        // Filter related items (excluding the current food item)
        const filteredRelatedItems = relatedData.filter((item) => item.id !== parseInt(id));
        setRelatedItems(filteredRelatedItems);
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    }
    fetchFoodData();
  }, [id]);

  if (!foodItem) return <div className='text-2xl flex justify-center items-center text-center p-5 font-bold bg-slate-900 bg-opacity-60 rounded-xl h-[35vh]'><p>Loading...</p></div>;

  return (
    <div className='w-[83%] max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg'>

      <div className='p-6'>
        {/* Food Item Details */}
        <div className='bg-slate-700 text-white rounded-lg p-6 shadow-lg mb-6'>
          <h1 className='text-3xl font-bold'>Burger</h1>
          <div className='flex flex-wrap gap-6 mt-4'>
            <img
              src={foodItem.image}
              alt={foodItem.name}
              className='w-[300px] h-[300px] rounded-lg shadow-md'
            />
            <div className='flex flex-col justify-between'>
              <p className='text-xl'>Price: <span className='font-bold'>Rs.{foodItem.price}</span></p>
              <p className='mt-4'>{foodItem.description || 'No description available.'}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {/* <div>
          <h2 className='text-2xl font-bold text-white mb-4'>Related Products</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {relatedItems.map((item) => (
              <div
                key={item.id}
                className='card bg-slate-700 text-white rounded-lg p-4 shadow-lg hover:bg-slate-600 transition duration-300'
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-[200px] object-cover rounded-lg mb-4'
                />
                <h3 className='text-lg font-bold'>{item.name}</h3>
                <p className='text-sm mt-2'>Price: Rs.{item.price}</p>
                <button
                  onClick={() => window.location.href = `/food/${item.id}`} // Redirect to food detail page
                  className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FoodDetailPage;
