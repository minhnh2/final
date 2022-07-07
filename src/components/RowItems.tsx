import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStatevalue } from 'context/StateProvider';
import { MdShoppingBasket } from 'react-icons/md';
import NotFound from '../img/NotFound.svg'
import { actionType } from 'context/reducer';
import { Modal } from '@mui/material';
import { Box, style } from '@mui/system';


function RowItems({ elementRef, flag, data }) {
    const [{ cartItems, foodItems }, dispatch] = useStatevalue();
    const [items, setItems] = useState<any>([])
    const [open, setOpen] = React.useState(false);
    const [detail, setDetal] = useState<any>();
    const handleOpen = (item) => {
        setOpen(true);
        setDetal(item)
        console.log(item);

    };
    const handleClose = () => setOpen(false);
    console.log(data);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
    };

    const handleAddToCard = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        })
        localStorage.setItem("cartItems", JSON.stringify(items))
    }
    useEffect(() => {
        handleAddToCard()
    }, [items])

    return (
        <>
            <div
                ref={elementRef}
                className={`w-full my-12 items-center flex gap-3 scroll-smooth cursor-pointer
            ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap"}`}

            >
                {data && data.length > 0 ? data.map((item) => (
                    <div
                        key={item.id}
                        className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative">
                        <div className='w-full flex items-center justify-between '>
                            <motion.img
                                whileHover={{ scale: 1.2 }}
                                src={item?.imageURL}
                                alt={item.title}
                                className='w-40 h-40 object-contain -mt-8 drop-shadow-2xl'
                                onClick={() => handleOpen(item)}

                            />
                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                onClick={() => setItems([...cartItems, item])}
                                className='w-8 h-8 rounded-full  bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'
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
                        {detail && (
                            <Modal
                                open={open}
                                onClose={handleClose}
                            >
                                <Box sx={style}  >
                                    <div className='bg-white h-600 w-[940px] rounded-xl hidden md:flex '>
                                        <div className='w-full ml-10'>
                                            <img className='w-[550px] h-[500px] object-contain mt-6' src={detail.imageURL} />

                                        </div>
                                        <div className='flex  w-full  flex-col'>
                                            <h1 className='text-4xl mt-10 text-headingColor'>{detail.title}</h1>
                                            <p className='mt-2'>Price : <span className='text-red-600'>$</span> {detail.price} </p>
                                            <p>Calories : {detail.calories}</p>
                                            <button
                                                className='px-6 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300
                                                 py-4 rounded-lg mt-4 text-white bg-orange-400 
                                                 flex w-[180px] h-10 items-center justify-center'
                                                onClick={() => setItems([...cartItems, detail])}

                                            >Add To Cart 🛒</button>

                                        </div>
                                    </div>
                                    <div className='bg-white  h-685 w-[490px] rounded-xl flex md:hidden '>
                                        <h1>hi</h1>
                                    </div>

                                </Box>
                            </Modal>

                        )}
                    </div>
                )) : <div className='w-full flex items-center justify-center flex-col'>
                    <img src={NotFound} className='h-340' />
                    <p className='text-xl text-headingColor font-semibold mt-3'>No Items Available</p>
                </div>
                }

            </div>
        </>
    )
}

export default RowItems