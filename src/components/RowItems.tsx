import React from 'react'
import { motion } from 'framer-motion';
import { useStatevalue } from 'context/StateProvider';
import { MdShoppingBasket } from 'react-icons/md';


function RowItems({ elementRef, flag, data }) {
    return (
        <div
            ref={elementRef}
            className={`w-full my-12 items-center flex gap-3 scroll-smooth
            ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap"}
`}>
            {data && data.map((item) => (
                <div
                    key={item.id}
                    className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative">
                    <div className='w-full flex items-center justify-between '>
                        <motion.img
                            whileHover={{ scale: 1.2 }}
                            src={item?.imageURL}
                            alt={item.title}
                            className='w-40 h-40 -mt-8 drop-shadow-2xl'
                        />
                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'
                        >
                            <MdShoppingBasket className='text-white' />
                        </motion.div>
                    </div>
                    <div className="w-full flex flex-col items-end justify-end -mt-8">
                        <p className="text-textColor font-semibold text-base md:text-lg">
                            {item?.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {item?.calories}
                        </p>
                        <div className="flex items-center gap-8">
                            <p className="text-lg text-headingColor font-semibold">
                                <span className="text-sm text-red-500">$</span> {item?.price}
                            </p>
                        </div>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default RowItems