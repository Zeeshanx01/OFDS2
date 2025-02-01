import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
  return (<>

    {/* <div className={`sidebar ${isOpen ? 'open' : ''}`}> */}
    {/* <button onClick={closeSidebar}>Close</button> */}
    {/* Add sidebar links or content here */}

    
    {/* <div className='absolute right-0'>

      <button>
        MENU
      </button>
    </div> */}
{/*  */}
    <div className='w-[18%] max-lg:w-[35%]  max-sm:w-[65%] min-h-[85vh] bg-slate-700 bg-opacity-75 rounded-lg'>
      <div className="logo flex mx-5 gap-2 items-center">
        <img width={'50'} src="/icon.gif" alt="" />
        <h1 className='font-bold text-3xl '>Admin Page</h1>
      </div>
      <ul className='flex flex-col gap-2 m-4 h-[70vh] overflow-auto'>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin"><li>Dashboard</li></Link>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin/tablefood"><li>Food Items</li></Link>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin/foodform"><li>Manage Food Items</li></Link>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin/tablerestaurant"><li>Restaurants</li></Link>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin/restaurantform"><li>Manage Restaurants</li></Link>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin/tablepayment"><li>Payments</li></Link>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin/tableorder"><li>Orders</li></Link>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin/tabledelivery"><li>Details</li></Link>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin/tableuser"><li>Users</li></Link>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin/tablecoupon"><li>Coupons</li></Link>

        <Link className='bg-slate-800 rounded-md px-4 py-3 font-bold text-lg text-slate-300 duration-300 hover:bg-slate-900' href="/admin/tablereview"><li>Reviews</li></Link>

      </ul>
    </div>
    {/* </div> */}
  </>)
}

export default Sidebar
