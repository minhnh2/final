import { actionType } from 'context/reducer';
import { useStatevalue } from 'context/StateProvider';
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri';
import { saveOrder } from 'utils/firebaseFunction';
import EmptyCart from '../img/empty.png'
import CartItems from './CartItems';

function CardContainer() {
    const [{ cartShow, cartItems, user }, dispatch] = useStatevalue();
    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        });

        localStorage.setItem("cartItems", JSON.stringify([]));
    };

    const handleShowCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        })
    }


    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.quantities * item.price;
        }, 0);
        setTot(totalPrice);
    }, [tot, flag]);

    const saveOrderDetail = () => {

    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className='fixed z-[101] top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col '>
            <div className='w-full flex items-center justify-between p-4 cursor-pointer '>
                <motion.div whileTap={{ scale: 0.75 }}
                    onClick={handleShowCart}

                >
                    <MdOutlineKeyboardBackspace className='text-textColor text-3xl' />
                </motion.div>
                <p className='text-textColor text-lg font-semibold'>Card</p>
                <motion.p
                    whileTap={{ scale: 0.75 }}
                    onClick={clearCart}
                    className='flex items-center select-none gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hovershadow-md  cursor-pointer text-base text-textColor'>
                    Clear <RiRefreshFill />
                </motion.p>

            </div>
            {cartItems && cartItems.length > 0 ? (

                <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col '>
                    <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
                        {cartItems && cartItems.map((item) => (
                            <CartItems
                                key={item.id}
                                item={item}
                                setFlag={setFlag}
                                flag={flag} />
                        ))}
                    </div>
                    <div className='w-full flex flex-1 flex-col bg-cartTotal rounded-t-[2rem] items-center justify-evenly px-8 py-2'>
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-400 text-lg '>Sub Total</p>
                            <p className='text-gray-400 text-lg '>$ {tot}</p>
                        </div> <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-400 text-lg '>Delivery</p>
                            <p className='text-gray-400 text-lg '>$ 2.5</p>
                        </div>
                        <div className='w-full border-b border-gray-600 my-2'></div>
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-200 text-xl font-semibold'>Total</p>
                            <p className='text-gray-200 text-xl font-semibold'>$ {tot + 2.5}</p>
                        </div>
                        {user ? (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type='button'
                                className='w-full p-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out'
                                onClick={saveOrderDetail}
                            >
                                Check Out
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type='button'
                                className='w-full p-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out'

                            >
                                Log In To Check Out
                            </motion.button>
                        )}
                    </div>
                </div>
            ) : (
                <div className='w-full h-full flex-col items-center justify-center gap-6'>
                    <img src={EmptyCart} alt='' />
                </div>
            )}

        </motion.div>
    )
}

export default CardContainer