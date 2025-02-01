import React from 'react'

const Footer = () => {
  return (
    <div className="w-full text-sm text-center fade-in bg-black bg-opacity-40 backdrop-blur-sm h-[5vh] sticky bottom-0 z-20 flex justify-center items-center">
      <a className="text-gray-400 no-underline hover:no-underline" href="#">&copy; Online Food Delivery System</a>
      <span className='mx-1'>- Developed by</span>
      <a className="text-gray-400 no-underline hover:no-underline" href="https://www.tailwindtoolbox.com">Zeeshan, Abbas and Saif</a>
    </div>
  )
}

export default Footer
