import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight, MdShoppingBasket } from 'react-icons/md';
import { useStatevalue } from 'context/StateProvider';
import { useEffect, useRef, useState } from 'react';
import RowItems from './RowItems';

function NewItems() {
    const [{ foodItems }, dispatch] = useStatevalue();
    const data = foodItems;
    const flag = true;
    const elementRef: any = useRef(null);

    const handleHorizantalScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }

        }, speed);
    };

    return (
        <section className='w-full mt-8'>
            <div className='w-full flex items-center justify-between'>
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute
        before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-1 before:left-0 before:bg-gradient-to-tr 
        from-orange-400 to-orange-600 transition-all ease-in-out duration-100'>
                    Our Fresh & Healthy Fruits
                </p>
                <div className='hidden md:flex gap-3 items-center'>
                    <motion.button
                        whileTap={{ scale: 0.75 }}
                        className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center hover:bg-orange-500 cursor-pointer
            transition-all ease-in-out duration-100 hover:shadow-lg'
                        onClick={() => {
                            handleHorizantalScroll(elementRef.current, 250, 100, -200);
                        }}

                    >
                        <MdChevronLeft className='text-lg text-white' />
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.75 }}
                        className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center hover:bg-orange-500 cursor-pointer
            transition-all ease-in-out duration-100 hover:shadow-lg'
                        onClick={() => {
                            handleHorizantalScroll(elementRef.current, 250, 100, 200);
                        }}>
                        <MdChevronRight className='text-lg text-white' />
                    </motion.button>
                </div>
            </div>
            <RowItems elementRef={elementRef} flag={true} data={foodItems} />

        </section>
    )
}

export default NewItems