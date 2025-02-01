'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import Sidebarbtn from '../components/Sidebarbtn';

const page = ({ foodItemData = null }) => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    image: '',
    res_id: '',
  });

  const [restaurants, setRestaurants] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  useEffect(() => {
    if (foodItemData) {
      setForm(foodItemData);
    }
  }, [foodItemData]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URI}/restaurantCRUD/read`); // Update with your endpoint
        const data = await response.json();
        if (response.ok) {
          setRestaurants(data);
        } else {
          console.error('Failed to fetch restaurants:', data.error);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);


  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URI}/fooditemCRUD/read`); // Adjust endpoint
        const data = await response.json();
        if (response.ok) {
          setFoodItems(data);
        } else {
          console.error('Failed to fetch food items:', data.error);
        }
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveFoodItem = async () => {
    try {
      const url = form.id ? `${process.env.NEXT_PUBLIC_URI}/fooditemCRUD/update` : `${process.env.NEXT_PUBLIC_URI}/fooditemCRUD/create`;
      const method = form.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {




        alert(form.id ? 'Food item updated successfully!' : 'Food item added successfully!');




        setForm({ id: '', name: '', description: '', price: '', image: '', res_id: '' });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving food item:', error);
      alert('Something went wrong. Please try again.');
    }







  };

  const deleteFoodItem = async () => {
    if (!form.id) {
      alert('Please enter an ID to delete.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URI}/fooditemCRUD/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: form.id }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Food item deleted successfully!');
        setForm({ id: '', name: '', description: '', price: '', image: '', res_id: '' });
      } else {
        alert(`Error: ${data.error || 'ID not found.'}`);
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
      alert('Something went wrong. Please try again.');
    }
  };



  return (<>









    <div className="w-[83%] max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg">


      <Sidebarbtn />

      <div>
        <h1 className="font-bold text-4xl mx-8 my-4 text-center">
          {foodItemData ? 'Edit Food Item' : 'Add Food Item'}
        </h1>

        <div className="bg-slate-800 drop-shadow-2xl mx-auto my-16 max-sm:mx-4 max-w-4xl rounded-xl text-white">
          <div className="flex flex-col p-4 gap-4">
            {/* Food Item Name */}
            <input
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Food Item Name"
              className="rounded-full border border-slate-500 w-full text-slate-200 bg-slate-700 font-semibold text-sm px-4 py-2"
              type="text"
              name="name"
              id="name"
            />

            {/* Description */}
            <textarea
              value={form.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="rounded border border-slate-500 w-full text-slate-200 bg-slate-700 font-semibold text-sm px-4 py-2"
              name="description"
              id="description"
            ></textarea>

            {/* Price */}
            <input
              value={form.price}
              onChange={handleChange}
              placeholder="Enter Price"
              className="rounded-full border border-slate-500 w-full text-slate-200 bg-slate-700 font-semibold text-sm px-4 py-2"
              type="number"
              name="price"
              id="price"
            />

            {/* Image Link */}
            <input
              value={form.image}
              onChange={handleChange}
              placeholder="Enter Image Link"
              className="rounded-full border border-slate-500 w-full text-slate-200 bg-slate-700 font-semibold text-sm px-4 py-2"
              type="text"
              name="image"
              id="image"
            />

            {/* Restaurant Dropdown */}
            <select
              value={form.res_id}
              onChange={handleChange}
              className="rounded-full border border-slate-500 w-full text-slate-200 bg-slate-700 font-semibold text-sm px-4 py-2"
              name="res_id"
              id="res_id"
            >
              <option value="">Select Restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>

            {/* ID and Delete */}
            <div className="flex gap-3">
              <select
                value={form.id || ""}
                onChange={handleChange}
                className="rounded-full border border-slate-500 w-full text-slate-200 bg-slate-700 font-semibold text-sm px-4 py-2"
                name="id"
                id="id"
              >
                <option value="">Select Food Item for Update or Delete</option>
                {foodItems.map((foodItem) => (
                  <option key={foodItem.id} value={foodItem.id}>
                    {foodItem.name}
                  </option>
                ))}
              </select>



              <button
                onClick={deleteFoodItem}
                className=" duration-300 font-bold bg-red-600  hover:bg-red-500 text-red-100 flex justify-center items-center rounded-full px-6 py-2 text-xs  "
              ><lord-icon
                src="https://cdn.lordicon.com/skkahier.json"
                trigger="loop"
                delay="1500"
                state="in-trash-empty"
                colors="primary:#e4e4e4">
                </lord-icon>
                Delete
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={saveFoodItem}
                className="disabled:opacity-50 duration-300 flex justify-center items-center bg-slate-600 hover:bg-slate-500 rounded-full px-6 py-2 text-xs font-bold gap-2"
              ><lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="loop" colors="primary:#e4e4e4"></lord-icon>
                {foodItemData ? 'Update Food Item' : 'Save Food Item'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default page;
