'use client';
import React, { useEffect, useState } from 'react';
import Sidebarbtn from './components/Sidebarbtn';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    restaurants: 0,
    foodItems: 0,
    orders: 0,
    coupons: 0,
    reviews: 0,
    payments: 0,
    deliveries: 0

  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data for all tables
        const [userRes, restaurantRes, foodRes, orderRes, couponRes, reviewRes, paymentRes, deliveryRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_URI}/userCRUD/read`), // Endpoint for users
          fetch(`${process.env.NEXT_PUBLIC_URI}/restaurantCRUD/read`), // Endpoint for restaurants
          fetch(`${process.env.NEXT_PUBLIC_URI}/fooditemCRUD/read`), // Endpoint for food items
          fetch(`${process.env.NEXT_PUBLIC_URI}/orderCRUD/read`), // Endpoint for orders
          fetch(`${process.env.NEXT_PUBLIC_URI}/couponCRUD/read`), // Endpoint for coupons
          fetch(`${process.env.NEXT_PUBLIC_URI}/reviewCRUD/read`), // Endpoint for reviews
          fetch(`${process.env.NEXT_PUBLIC_URI}/paymentCRUD/read`), // Endpoint for coupons
          fetch(`${process.env.NEXT_PUBLIC_URI}/deliveryCRUD/read`), // Endpoint for reviews
        ]);

        const [
          userData,
          restaurantData,
          foodData,
          orderData,
          couponData,
          reviewData,
          paymentData,
          deliveryData,
        ] = await Promise.all([
          userRes.json(),
          restaurantRes.json(),
          foodRes.json(),
          orderRes.json(),
          couponRes.json(),
          reviewRes.json(),
          paymentRes.json(),
          deliveryRes.json(),
        ]);
        // Count entries based on the number of IDs (primary keys)
        setStats({
          users: userData.length || 0,
          restaurants: restaurantData.length || 0,
          foodItems: foodData.length || 0,
          orders: orderData.length || 0,
          coupons: couponData.length || 0,
          reviews: reviewData.length || 0,
          payments: paymentData.length || 0,
          deliveries: deliveryData.length || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    }
    fetchData();
  }, []);

  return (<>
    <div className='w-[83%]  overflow-auto max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg'>
      <Sidebarbtn />

      <div className='h-[62vh]'>

        <h1 className='font-bold text-2xl mx-8 my-4'>Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <div className="card bg-slate-700 text-white rounded-lg p-6 bg-opacity-80 shadow-lg duration-300 hover:shadow-2xl hover:bg-opacity-100">
            <h2 className="text-lg font-bold">Total Restaurants</h2>
            <p className="text-4xl mt-2">{stats.restaurants}</p>
          </div>



          <div className="card bg-slate-700 text-white rounded-lg p-6 bg-opacity-80 shadow-lg duration-300 hover:shadow-2xl hover:bg-opacity-100">
            <h2 className="text-lg font-bold">Total Food Items</h2>
            <p className="text-4xl mt-2">{stats.foodItems}</p>
          </div>

          <div className="card bg-slate-700 text-white rounded-lg p-6 bg-opacity-80 shadow-lg duration-300 hover:shadow-2xl hover:bg-opacity-100">
            <h2 className="text-lg font-bold">Total Orders</h2>
            <p className="text-4xl mt-2">{stats.orders}</p>
          </div>

          <div className="card bg-slate-700 text-white rounded-lg p-6 bg-opacity-80 shadow-lg duration-300 hover:shadow-2xl hover:bg-opacity-100">
            <h2 className="text-lg font-bold">Total Coupons</h2>
            <p className="text-4xl mt-2">{stats.coupons}</p>
          </div>

          <div className="card bg-slate-700 text-white rounded-lg p-6 bg-opacity-80 shadow-lg duration-300 hover:shadow-2xl hover:bg-opacity-100">
            <h2 className="text-lg font-bold">Total Users</h2>
            <p className="text-4xl mt-2">{stats.users}</p>
          </div>
          <div className="card bg-slate-700 text-white rounded-lg p-6 bg-opacity-80 shadow-lg duration-300 hover:shadow-2xl hover:bg-opacity-100">
            <h2 className="text-lg font-bold">Total Reviews</h2>
            <p className="text-4xl mt-2">{stats.reviews}</p>
          </div>

          <div className="card bg-slate-700 text-white rounded-lg p-6 bg-opacity-80 shadow-lg duration-300 hover:shadow-2xl hover:bg-opacity-100">
            <h2 className="text-lg font-bold">No of Payments</h2>
            <p className="text-4xl mt-2">{stats.payments}</p>
          </div>

          <div className="card bg-slate-700 text-white rounded-lg p-6 bg-opacity-80 shadow-lg duration-300 hover:shadow-2xl hover:bg-opacity-100">
            <h2 className="text-lg font-bold">Deliveries left</h2>
            <p className="text-4xl mt-2">{stats.deliveries}</p>
          </div>
        </div>

      </div>

    </div>
  </>);
};

export default Dashboard;
