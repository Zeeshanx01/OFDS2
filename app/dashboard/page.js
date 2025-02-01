'use client'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Dashboard = ({ params }) => {

  const { data: session } = useSession()
  const [form, setform] = useState({})

  if (!session) {
    // const router = useRouter()
    // router.push('/login')
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (<>
    <div className='text-3xl font-bold text-center'>
      Welcome to your Dashboard
    </div>

    <div className='bg-slate-6000 max-sm:w-[80%] w-[40%] mx-auto my-5 rounded-xl p-2'>

      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className='w-full rounded-lg px-2 py-1 my-2 text-slate-300 bg-slate-700 border border-slate-600' />
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium ">Email</label>
        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className='w-full rounded-lg px-2 py-1 my-2 text-slate-300 bg-slate-700 border border-slate-600' />
      </div>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium ">Username</label>
        <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className='w-full rounded-lg px-2 py-1 my-2 text-slate-300 bg-slate-700 border border-slate-600' />
      </div>
      <div>
        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium ">Profile Picture</label>
        <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className='w-full rounded-lg px-2 py-1 my-2 text-slate-300 bg-slate-700 border border-slate-600' />
      </div>
      <div>
        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium ">Cover Picture</label>
        <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className='w-full rounded-lg px-2 py-1 my-2 text-slate-300 bg-slate-700 border border-slate-600' />
      </div>
      <div>
        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium ">Razorpay Id</label>
        <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className='w-full rounded-lg px-2 py-1 my-2 text-slate-300 bg-slate-700 border border-slate-600' />
      </div>
      <div>
        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium ">Razorpay Secret</label>
        <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name='razorpaysecret' id="razorpaysecret" className='w-full rounded-lg px-2 py-1 my-2 text-slate-300 bg-slate-700 border border-slate-600' />
      </div>

      <button type="button" className="text-white bg-gradient-to-r from-purple-700 via-purple-6000 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg font-medium rounded-lg w-full px-12 py-2 text-center my-4">Save</button>


    </div>



    <Link href={'/'}> <button type="button" className="duration-300 text-slate-400 bg-slate-800 hover:bg-slate-400 hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Back to Home</button></Link>

  </>)
}

export default Dashboard
