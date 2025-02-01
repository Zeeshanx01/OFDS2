'use client';
import React, { useEffect, useState } from 'react';
import Sidebarbtn from '../components/Sidebarbtn';

const page = () => {
  const [deliveryInfo, setDeliveryInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const deliveryRes = await fetch(`${process.env.NEXT_PUBLIC_URI}/deliveryCRUD/read`); // Update with your correct endpoint
      const deliveryData = await deliveryRes.json();
      setDeliveryInfo(deliveryData);
      console.log(deliveryData);
    }
    fetchData();
  }, []);

  return (
    <div className='w-[83%] max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg'>
      <Sidebarbtn />

      <div>
        <h1 className='font-bold text-2xl mx-8 my-4'>Delivery Details</h1>

        <div className="table w-[80%] mx-auto bg-slate-600 border border-slate-600 rounded-lg bg-opacity-80 drop-shadow-2xl">
          <div className="head w-full rounded-t-lg p-4 font-bold bg-slate-800 flex justify-around gap-1">
            <h1 className='w-[10%] text-center'>ID</h1>
            <h1 className='w-[25%] text-center'>Order ID</h1>
            <h1 className='w-[25%] text-center'>Delivery Person</h1>
            <h1 className='w-[20%] text-center'>Delivery Status</h1>
            <h1 className='w-[20%] text-center'>Delivery Date</h1>
          </div>

          <div className="body min-h-[20vh] max-h-[60vh] overflow-auto">
            {deliveryInfo.map((delivery) => (
              <div
                key={delivery.id}
                className={`item w-full border-b-2 border-slate-600 p-4 hover:bg-slate-600 duration-200 bg-slate-600 flex justify-around gap-1 h-16 overflow-hidden text-center`}
              >
                <h3 className='w-[10%] text-center'>{delivery.id}</h3>
                <h3 className='w-[25%] text-center'>{delivery.order_id}</h3>
                <h3 className='w-[25%] text-center'>{delivery.person}</h3>
                <h3 className='w-[20%] text-center'>
                  {delivery.status === 1 ? 'In Progress' : 'Delivered'}
                </h3>
                <h3 className='w-[20%] text-center'>{delivery.date}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
