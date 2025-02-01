'use client';
import React, { useEffect, useState } from 'react';
import Sidebarbtn from '../components/Sidebarbtn';

const page = () => {
  const [couponInfo, setCouponInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const couponRes = await fetch(`${process.env.NEXT_PUBLIC_URI}/couponCRUD/read`); // Update with your correct endpoint
        const couponData = await couponRes.json();
        setCouponInfo(couponData);
        console.log(couponData);
      } catch (error) {
        console.error('Error fetching coupon data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='w-[83%] max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg'>
      <Sidebarbtn />

      <div>
        <h1 className='font-bold text-2xl mx-8 my-4'>Coupon Information</h1>

        <div className="table w-[80%] mx-auto bg-slate-600 border border-slate-600 rounded-lg bg-opacity-80 drop-shadow-2xl">
          <div className="head w-full rounded-t-lg p-4 font-bold bg-slate-800 flex justify-around gap-1">
            <h1 className='w-[10%] text-center'>ID</h1>
            <h1 className='w-[20%] text-center'>Code</h1>
            <h1 className='w-[20%] text-center'>Discount (%)</h1>
            <h1 className='w-[25%] text-center'>Expiry Date</h1>
            <h1 className='w-[25%] text-center'>Usage Limit</h1>
          </div>

          <div className="body min-h-[20vh] max-h-[60vh] overflow-auto">
            {couponInfo.map((coupon) => (
              <div
                key={coupon.id}
                className={`item w-full border-b-2 border-slate-600 p-4 hover:bg-slate-600 duration-200 bg-slate-600 flex justify-around gap-1 h-16 overflow-hidden text-center`}
              >
                <h3 className='w-[10%] text-center'>{coupon.id}</h3>
                <h3 className='w-[20%] text-center'>{coupon.code}</h3>
                <h3 className='w-[20%] text-center'>{coupon.disc_perc}%</h3>
                <h3 className='w-[25%] text-center'>{coupon.exp_date}</h3>
                <h3 className='w-[25%] text-center'>{coupon.usage_lim}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
