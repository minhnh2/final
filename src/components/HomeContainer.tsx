import React from 'react'
import Delivery from '../img/delivery.png';
import HomeBg from '../img/heroBg.png'
import { MenuData } from '../utils/data'


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'submit' | 'reset' | 'button' | undefined;
}

function HomeContainer() {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full ' id='home'>
            <div className='py-2  flex-1 flex flex-col items-start md:items-center justify-center gap-6'>
                <div className='flex items-center gap-2 justify-center bg-orange-100 rounded-full px-2 py-1 '>

                    <p className='text-base text-orange-500 font-semibold'>Bike Delevery</p>
                    <div className='w-8 h-8 bg-white drop-shadow-xl rounded-full overflow-hidden '>
                        <img src={Delivery} alt='delivery' className='w-full h-full object-contain bg-white' />
                    </div>

                </div>
                <p className='text-[2.5rem] tracking-wide text-headingColor  font-bold lg:text-[4.5rem]'>The Fastest Delivery In
                    <span className='text-orange-500 text-[3rem] lg:text-[5rem]'>  Your City </span>
                </p>
                <p className='text-base text-textColor text-center md:text-left mr-6'>hom nay toi ngoi 1 minh tren pho dong noi anh den soi sang long lanh nhung khuon mat la lam</p>
                <button type='button'
                    className='md:w-auto bg-gradient-to-br from-orange-400 to-orange-600 
                w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 
                text-white text-lg hover:-translate-y-1 hover:scale-110 '
                >Order Now</button>
            </div>

            <div className="py-2 flex-1 flex items-center relative">
                <img
                    src={HomeBg}
                    className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
                    alt="hero-bg"
                />

                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap">
                    {MenuData &&
                        MenuData.map((n) => (
                            <div
                                key={n.id}
                                className="  lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                            >
                                <img
                                    src={n.imgSrc}
                                    className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                                    alt="I1"
                                />
                                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                                    {n.name}
                                </p>

                                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                                    {n.desc}
                                </p>

                                <p className="text-sm font-semibold text-headingColor">
                                    <span className="text-xs text-red-600">$</span> {n.price}
                                </p>
                            </div>
                        ))}
                </div>
            </div>


        </section>
    )
}

export default HomeContainer