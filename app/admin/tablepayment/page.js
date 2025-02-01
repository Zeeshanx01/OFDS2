'use client';
import { useEffect, useState } from 'react';
import Sidebarbtn from '../components/Sidebarbtn';

const page = () => {
  const [paymentInfo, setPaymentInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const paymentRes = await fetch(`${process.env.NEXT_PUBLIC_URI}/paymentCRUD/read`); // Update with your correct endpoint for payments
      const paymentData = await paymentRes.json();
      setPaymentInfo(paymentData);
      console.log(paymentData);
    }
    fetchData();
  }, []);

  return (
    <div className='w-[83%] max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg'>
      <Sidebarbtn />

      <div>
        <h1 className='font-bold text-2xl mx-8 my-4'>Payment Information</h1>

        <div className="table w-[80%] mx-auto bg-slate-600 border border-slate-600 rounded-lg bg-opacity-80 drop-shadow-2xl">
          <div className="head w-full rounded-t-lg p-4 font-bold bg-slate-800 flex justify-around gap-1">
            <h1 className='w-[10%] text-center'>ID</h1>
            <h1 className='w-[20%] text-center'>Order ID</h1>
            <h1 className='w-[20%] text-center'>Date</h1>
            <h1 className='w-[20%] text-center'>Amount</h1>
            <h1 className='w-[15%] text-center'>Method</h1>
            <h1 className='w-[15%] text-center'>Status</h1>
          </div>

          <div className="body min-h-[20vh] max-h-[60vh] overflow-auto">
            {paymentInfo.map((payment) => (
              <div
                key={payment.id}
                className={`item w-full border-b-2 border-slate-600 p-4 hover:bg-slate-600 duration-200 bg-slate-600 flex justify-around gap-1 h-16 overflow-hidden text-center`}
              >
                <h3 className='w-[10%] text-center'>{payment.id}</h3>
                <h3 className='w-[20%] text-center'>{payment.order_id}</h3>
                <h3 className='w-[20%] text-center'>{payment.date}</h3>
                <h3 className='w-[20%] text-center'>Rs.{payment.amount}</h3>
                <h3 className='w-[15%] text-center'>{payment.method  === 1 ? 'Online' : 'Cash on Delivery'}</h3>
                <h3 className='w-[15%] text-center'>{payment.status === 1 ? 'Paid' : 'Pending'}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
