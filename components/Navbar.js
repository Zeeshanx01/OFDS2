'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  SignOutButton
} from '@clerk/nextjs';

const Navbar = () => {
  const [showDropdown, setshowDropdown] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { user } = useUser();


  useEffect(() => {
    if (user) {
      setUserData(prevState => ({
        ...prevState,
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        password: ''
      }));
    };
  }, [user]); // Only runs when `userData` changes

  // Track when userData updates
  useEffect(() => {
    if (!userData.name || !userData.email) return;


    console.log("Updated userData:", userData);


    const sendUserData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_URI}/userCRUD/create`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),  // Use newUserData instead of userData
        });

        const data = await response.json();

        if (response.ok) {
          console.log('User added successfully!');
          // setUserData({ name: '', email: '', password: '' });
        } else {
          console.log(`Error: ${data.error}`);
        }
      } catch (error) {

        console.error('Error saving user:', error);
      }
    };

    sendUserData();

  }, [userData]);


  return (
    // <div className=" flex justify-center  bg-white h-[10vh]">
    <div className="w-full flex items-center justify-evenly bg-black bg-opacity-40 h-[10vh] sticky top-0 z-20 backdrop-blur-sm drop-shadow-2xl">

      <a className="flex items-center justify-center text-indigo-400 no-underline gap-1 hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
        <img width={'50'} src="/icon.gif" alt="" />
        <div>
          Online-<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">Food-Delivery</span>

        </div>
      </a>



      <ul className='flex justify-center items-center gap-3'>

        <li>
          <Link href="/" className=""><img width={'50'} src="/home.gif" alt="home" /></Link>
        </li>


        <li>
          <Link href="/restaurants" className=""><img width={'50'} src="/restaurant.gif" alt="home" /></Link>
        </li>

        <li>
          <Link href="/products" className=""><img width={'50'} src="/food.gif" alt="home" /></Link>
        </li>


        <div className='relativee'>

          {/* FOR ADMIN */}
          {/* {session && session.user.email === 'zeeshanmunir13579@gmail.com'  && <>
            <button onClick={() => { setshowDropdown(!showDropdown) }} onBlur={() => { setTimeout(() => { setshowDropdown(false) }, 200) }} id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="duration-500 text-white bg-gradient-to-r from-purple-500 via-purple-6000 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex justify-center items-center shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full text-xs p-[3px]" type="button"><img className='rounded-full' width={'40px'} src={session.user.image} alt="profile image" />
            </button>



            <div id="dropdownInformation" className={`z-10 ${showDropdown ? "" : "hidden"} absolute top-20 max-sm:top-16 max-sm:right-20 bg-slate-800 divide-y divide-slate-600 text-slate-300 rounded-lg shadow w-fit dark:bg-gray-700 dark:divide-gray-600`}>

              <div className="px-4 py-3 text-sm text-slate-300 font-bold dark:text-white">
                <div>{session.user.name}</div>
                <div className="font-medium truncate">{session.user.email}</div>
              </div>

              <ul className="py-2 text-sm text-slate-400 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                <li>
                  <Link onClick={() => { setshowDropdown(!showDropdown) }} href="/admin" className="duration-200 block px-4 py-2 hover:bg-slate-700 dark:hover:bg-gray-600 dark:hover:text-white">Admin page</Link>
                </li>
                <li>
                  <Link onClick={() => { setshowDropdown(!showDropdown) }} href="/dashboard" className="duration-200 block px-4 py-2 hover:bg-slate-700 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link onClick={() => { setshowDropdown(!showDropdown) }} href="#" className="duration-200 block px-4 py-2 hover:bg-slate-700 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                </li>
                <li>
                  <Link onClick={() => { setshowDropdown(!showDropdown) }} href="#" className="duration-200 block px-4 py-2 hover:bg-slate-700 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                </li>
              </ul>

              <div className="py-2">
                <button href="#" onClick={() => {
                  signOut();
                  setshowDropdown(!showDropdown);
                }}
                  className="w-full text-start duration-200 block px-4 py-2 text-sm text-slate-400 hover:bg-red-950 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
              </div>

            </div>
          </>} */}






          {/* FOR USER */}
          <SignedIn className='bg-black'>


            {user && <> <button
              onClick={() => { setshowDropdown(!showDropdown) }}
              onBlur={() => { setTimeout(() => { setshowDropdown(false) }, 200) }}
              id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation"
              type="button"
              // className="duration-500 text-white bg-gradient-to-r from-purple-500 via-purple-6000 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex justify-center items-center shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full text-xs p-[3px]"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-6000 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-4 py-2 text-center me-222 mb-222"
            >{user.firstName}
            </button>



              <div id="dropdownInformation" className={`z-10 ${showDropdown ? "" : "hidden"} absolute top-20 max-sm:top-16 max-sm:right-20 bg-slate-800 divide-y divide-slate-600 text-slate-300 rounded-lg shadow w-fit dark:bg-gray-700 dark:divide-gray-600`}>


                <div className="px-4 py-3 text-sm text-slate-300 font-bold dark:text-white">

                  <div className='flex gap-2  items-center'>
                    <UserButton />
                    {user.fullName ? user.fullName : 'User'}
                  </div>

                  <div className="font-medium truncate">{user.emailAddresses?.[0]?.emailAddress || 'No email available'}</div>

                </div>

                <ul className="py-2 text-sm text-slate-400 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                  <li>
                    <Link onClick={() => { setshowDropdown(!showDropdown) }} href="/profile" className="duration-200 block px-4 py-2 hover:bg-slate-700 dark:hover:bg-gray-600 dark:hover:text-white">User Information</Link>
                  </li>
                  <li>
                    <Link onClick={() => { setshowDropdown(!showDropdown) }} href="/cart" className="duration-200 block px-4 py-2 hover:bg-slate-700 dark:hover:bg-gray-600 dark:hover:text-white">Cart</Link>
                  </li>
                  <li>
                    <Link onClick={() => { setshowDropdown(!showDropdown) }} href="/admin" className="duration-200 block px-4 py-2 hover:bg-slate-700 dark:hover:bg-gray-600 dark:hover:text-white">Admin Panel</Link>
                  </li>

                </ul>

                <div className="py-2">

                  <SignOutButton>

                    <button href="#" onClick={() => {
                      // signOut();
                      setshowDropdown(!showDropdown);
                    }}
                      className="w-full text-start duration-200 block px-4 py-2 text-sm text-slate-400 hover:bg-red-950 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                  </SignOutButton>


                </div>

              </div></>}

          </SignedIn>






          <SignedOut>
            <SignInButton className="text-white bg-gradient-to-r from-purple-500 via-purple-6000 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-4 py-2 text-center me-222 mb-222" />
            {/* <Link href={'/login'}>
              <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-6000 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-4 py-2 text-center me-222 mb-222">Login</button>
            </Link> */}
          </SignedOut>

        </div>
      </ul>

    </div>
    // </div>
  )
}

export default Navbar
