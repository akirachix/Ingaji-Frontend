"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Landing = () => {
    const router = useRouter();

    const getStarted = () => {
        router.push("/sign-Up"); 
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
                        
                        <button  
                           className='text-blue-600 bg-white border-2 border-blue-500 rounded py-2.5 px-6 text-2xl mr-24 mt-6'
                           onClick={getStarted}>
                            Get Started
                        </button>
                    <div className='space-x-12 mt-18 ml-24'>

                        <button  
                           className='text-blue-600 bg-white border-2 border-blue-500 rounded py-2.5 px-6 text-2xl mr-24 mt-6'
                           onClick={getStarted} 
                        >
                            Get Started
                        </button>

                       

                    </div>
                </div>
            </div>
        </div>
        </div>
      </main>
    );
};

export default Landing;
