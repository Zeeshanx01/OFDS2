'use client';
import React, { useEffect, useState } from 'react';
import Sidebarbtn from '../components/Sidebarbtn';

const page = () => {
  const [reviewInfo, setReviewInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const reviewRes = await fetch('http://localhost:3000/api/reviewCRUD/read'); // Update with your correct endpoint
        const reviewData = await reviewRes.json();
        if (Array.isArray(reviewData)) {
          setReviewInfo(reviewData);
        } else {
          console.error('API response is not an array:', reviewData);
          setReviewInfo([]);
        }
      } catch (error) {
        console.error('Error fetching review data:', error);
        setReviewInfo([]); // Set an empty array on error
      }
    }
    fetchData();
  }, []);

  return (
    <div className='w-[83%] max-lg:w-[65%] max-sm:w-[65%] bg-slate-600 bg-opacity-75 rounded-lg'>
      <Sidebarbtn />

      <div>
        <h1 className='font-bold text-2xl mx-8 my-4'>Reviews Information</h1>

        <div className="table w-[80%] mx-auto bg-slate-600 border border-slate-600 rounded-lg bg-opacity-80 drop-shadow-2xl">
          <div className="head w-full rounded-t-lg p-4 font-bold bg-slate-800 flex justify-around gap-1">
            <h1 className='w-[10%] text-center'>ID</h1>
            <h1 className='w-[20%] text-center'>User ID</h1>
            <h1 className='w-[20%] text-center'>Restaurant ID</h1>
            <h1 className='w-[20%] text-center'>Rating</h1>
            <h1 className='w-[30%] text-center'>Comment</h1>
          </div>

          <div className="body min-h-[20vh] max-h-[60vh] overflow-auto">
            {reviewInfo.length > 0 ? (
              reviewInfo.map((review) => (
                <div
                  key={review.id}
                  className={`item w-full border-b-2 border-slate-600 p-4 hover:bg-slate-600 duration-200 bg-slate-600 flex justify-around gap-1 h-16 overflow-hidden text-center`}
                >
                  <h3 className='w-[10%] text-center'>{review.id}</h3>
                  <h3 className='w-[20%] text-center'>{review.user_id}</h3>
                  <h3 className='w-[20%] text-center'>{review.res_id}</h3>
                  <h3 className='w-[20%] text-center'>{review.rating}</h3>
                  <h3 className='w-[30%] text-center'>{review.comment}</h3>
                </div>
              ))
            ) : (
              <div className="text-center p-4">No reviews available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
