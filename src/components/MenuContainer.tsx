import React, { useEffect, useRef, useState } from 'react'
import { MdFastfood } from 'react-icons/md'
import { Categories } from 'utils/data'
import { motion } from 'framer-motion'
import RowItems from './RowItems';
import { useStatevalue } from 'context/StateProvider';

function MenuContainer() {
    const [filter, setFilter] = useState<string>('chicken');
    const elementRef: any = useRef(null);
    const [{ foodItems }, dispatch] = useStatevalue();

    useEffect(() => { }, [filter])
    return (
        <section className='w-full my-6' id='menu'>
            <div className='w-full flex flex-col items-center justify-center'>
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto'>
                    Out Menu
                </p>

                <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
                    {Categories && Categories.map(item => (

                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            key={item.id}
                            className={`group ${filter === item.urlParaName ? 'bg-cartNumBg' : 'bg-white'} w-24 min-w-[94px] h-28 cursor-pointer hover:bg-red-600 rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out`}
                            onClick={() => setFilter(item.urlParaName)}
                        >
                            <div className={`w-10 h-10 rounded-full shadow-xl  ${filter === item.urlParaName ? 'bg-card' : 'bg-cartNumBg'} group-hover:bg-white flex items-center justify-center`}>
                                <MdFastfood className={` ${filter === item.urlParaName ? 'text-textColor' : 'text-white'} group-hover:text-textColor text-lg`} />
                            </div>
                            <p className={`text-base  ${filter === item.urlParaName ? "text-white" : "text-textColor"} group-hover:text-card`}>{item.name}</p>
                        </motion.div>
                    ))}
                </div>
                <div className='w-full'>
                    <RowItems flag={false} elementRef={elementRef} data={foodItems?.filter((n) => n.category == filter)} />
                </div>
            </div>
        </section>
    )
}

export default MenuContainer