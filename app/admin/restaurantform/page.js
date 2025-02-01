'use client';

import { useRef, useState, useEffect } from 'react';
import React from 'react';
import Sidebarbtn from '../components/Sidebarbtn';

const page = ({ restaurantData = null }) => {

  const [restaurants, setRestaurants] = useState([]);
  // Initial state for form
  const [form, setForm] = useState({
    id: '',
    name: '',
    status: '1',
    image: '',
  });





  // Populate form for edit
  useEffect(() => {
    if (restaurantData) {
      setForm(restaurantData);
    }
  }, [restaurantData]);

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



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };






  const saveRestaurant = async () => {
    try {
      const url = form.id ? `${process.env.NEXT_PUBLIC_URI}/restaurantCRUD/update` : `${process.env.NEXT_PUBLIC_URI}/restaurantCRUD/create`;
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
        alert(form.id ? 'Restaurant updated successfully!' : 'Restaurant added successfully!');
        setForm({ id: '', name: '', status: '1', image: '' });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving restaurant:', error);
      alert('Something went wrong. Please try again.');
    }
  };





  const deleteRestaurant = async () => {
    if (!form.id) {
      alert("Please enter an ID to delete.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URI}/restaurantCRUD/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: form.id }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Restaurant deleted successfully!");
        setForm({ id: '', name: '', status: '1', image: '' });
      } else {
        alert(`Error: ${data.error || 'ID not found.'}`);
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Something went wrong. Please try again.');
    }
  };







  return (
    <div className="w-[83%] max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg">
      <Sidebarbtn />

      <div>
        <h1 className="font-bold text-4xl mx-8 my-4 text-center">
          {restaurantData ? 'Edit Restaurant' : 'Add Restaurant'}
        </h1>

        <div className="bg-slate-800 drop-shadow-2xl mx-auto my-16 max-sm:mx-4 maxw-4xl rounded-xl text-white">
          <div className="flex flex-col p-4 gap-4">
            {/* Restaurant Name */}
            <input
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Restaurant Name"
              className="rounded-full border border-slate-500 w-full text-slate-200 bg-slate-700 font-semibold text-sm px-4 py-2"
              type="text"
              name="name"
              id="name"
            />



            <div className='flex gap-3'>
              {/* ID (Read Only for Edit Mode) */}
              {/* Restaurant Dropdown */}
              <select
                value={form.id}
                onChange={handleChange}
                className="rounded-full border border-slate-500 w-full text-slate-200 bg-slate-700 font-semibold text-sm px-4 py-2"
                name="id"
                id="id"
              >
                <option value="">Select Restaurant</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>

              <button
                onClick={deleteRestaurant}
                className=" duration-300 font-bold bg-red-600  hover:bg-red-500 text-red-100 flex justify-center items-center rounded-full px-6 py-2 text-xs  ">
                <lord-icon
                  src="https://cdn.lordicon.com/skkahier.json"
                  trigger="loop"
                  delay="1500"
                  state="in-trash-empty"
                  colors="primary:#e4e4e4">
                </lord-icon>
                Delete
              </button>


            </div>

            {/* Status */}
            <div className="flex gap-4 items-center">
              <label htmlFor="status" className="text-sm font-semibold">
                Status:
              </label>
              <select
                value={form.status}
                onChange={handleChange}
                className="rounded-full border border-slate-500 w-full text-slate-200 bg-slate-700 font-semibold text-sm px-4 py-2"
                name="status"
                id="status"
              >
                <option value="0">Inactive</option>
                <option value="1">Active</option>
              </select>
            </div>

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

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={saveRestaurant}
                className="disabled:opacity-50 duration-300 flex justify-center items-center bg-slate-600 hover:bg-slate-500 rounded-full px-6 py-2 text-xs font-bold gap-2"
              ><lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="loop" colors="primary:#e4e4e4"></lord-icon>
                {restaurantData ? 'Update Restaurant' : 'Save Restaurant'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;