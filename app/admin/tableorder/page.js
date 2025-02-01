'use client';
import React, { useEffect, useState } from 'react';
import Sidebarbtn from '../components/Sidebarbtn';

const page = () => {
  const [orderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_URI}/orderCRUD/read`); // Update with your correct endpoint
      const orderData = await orderRes.json();
      setOrderInfo(orderData);
      console.log(orderData);
    }
    fetchData();
  }, []);

  return (
    <div className='w-[83%] max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg'>
      <Sidebarbtn />

      <div>
        <h1 className='font-bold text-2xl mx-8 my-4'>Order Information</h1>

        <div className="table w-[80%] mx-auto bg-slate-600 border border-slate-600 rounded-lg bg-opacity-80 drop-shadow-2xl">
          <div className="head w-full rounded-t-lg p-4 font-bold bg-slate-800 flex justify-around gap-1">
            <h1 className='w-[10%] text-center'>ID</h1>
            <h1 className='w-[25%] text-center'>User ID</h1>
            <h1 className='w-[25%] text-center'>Total Amount</h1>
            <h1 className='w-[20%] text-center'>Status</h1>
            <h1 className='w-[20%] text-center'>Date</h1>
            <h1 className='w-[20%] text-center'>Coupon ID</h1>
            
          </div>

          <div className="body min-h-[20vh] max-h-[60vh] overflow-auto">
            {orderInfo.map((order) => (
              <div
                key={order.id}
                className={`item w-full border-b-2 border-slate-600 p-4 hover:bg-slate-600 duration-200 bg-slate-600 flex justify-around gap-1 h-16 overflow-hidden text-center`}
              >
                <h3 className='w-[10%] text-center'>{order.id}</h3>
                <h3 className='w-[25%] text-center'>{order.user_id}</h3>
                <h3 className='w-[25%] text-center'>Rs.{order.total}</h3>
                <h3 className='w-[20%] text-center'>{order.status  === 1 ? 'Pending' : 'Completed'}</h3>
                <h3 className='w-[20%] text-center'>{order.date}</h3>
                <h3 className='w-[20%] text-center'>{order.copn_id}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
