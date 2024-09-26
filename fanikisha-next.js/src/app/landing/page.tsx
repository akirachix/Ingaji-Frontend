"use client"
import router from 'next/dist/client/router';
// import {useState} from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import router from 'next/router';


const Landing = () => {

    const router = useRouter();
      
    const getStarted = () => {
          router.push("/signup");
        };
    
    return (
      <main>
        <div className="flex h-screen font-work sans">
            <div className='w-1/2 relative'>
        <Image
        src="/media/cow1.png"
        alt="Dairy farming"
        fill
        style={{ objectFit: 'cover' }}
        />
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center p-8 mb-32">
                <div className="text-center mt-7">
                    <div className='mb-9 mr-28'>
                        <Image
                         src="/media/logo.png"
                         alt="Fanikisha Logo"
                         width={390}
                         height={150}
                        />
                        </div>
                        <h1 className="text-[36px] font-bold mb-2">Welcome To Fanikisha</h1>
                        <p className="text-[20px] mb-6">Your partner in Dairy record keeping</p>
                        <div className=' space-x-12 mt-18 ml-24'>
                            {/* <Link href="components/SignUpSacco?type=sacco" passHref>
                            <button className='text-sky-700 bg-white border-2 border-cyan-700 rounded py-2.5 px-8 text-2xl '>Sacco
                            </button></Link> */}
                          
                           <button  
                           onClick={getStarted}
                           className='text-blue-600 bg-white border-2 border-blue-500 rounded py-2.5 px-6 text-2xl mr-24 mt-6'>
                            Get Started
                            </button>
                           
                            {/* <Link href="components/SignUpAdmin?type=sacco" passHref>
                            <button className='text-sky-700 bg-white border-2 border-cyan-700 rounded py-2.5 px-8 text-2xl'>Admin
                            </button></Link> */}

                        </div>
                    
                </div>

            </div>
        </div>

      </main>
    )}
    export default Landing






