import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png'
import { BsBasket2 } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { useStatevalue } from '../context/StateProvider';



function Header({ logIn, handleShowCart, logOut, isMenu, user, setIsMenu }) {
    const [{ cartItems }, dispatch] = useStatevalue();
    return (
        <div className=' fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16  z-1 bg-gradient-to-r bg-gray-300  md:p6'>
            {/* medium and large screen */}
            <div className=' hidden md:flex p-5 h-full w-full item-center justify-between'>
                <Link to={'/'} className='flex gap-2 items-center '>
                    <img src={Logo} alt='logo' className='w-10 object-cover ' />
                    <p className='text-headingColor text-2xl font-bold cursor-default'>Papa's Food Corner</p>
                </Link>
                <div className='flex justify-between'>

                    <div className='flex justify-center items-center '>
                        <motion.ul
                            animate={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 100 }}
                            exit={{ opacity: 1, x: 100 }}
                            transition={{ duration: 0.5 }}

                            className='flex items-center gap-8 '>
                            <li className='text-base text-textColor hover:text-headingColor cursor-pointer transition-all ease-in-out duration-100'>Home</li>
                            <li className='text-base text-textColor hover:text-headingColor cursor-pointer transition-all ease-in-out duration-100'>Menu</li>
                            <li className='text-base text-textColor hover:text-headingColor cursor-pointer transition-all ease-in-out duration-100'>About Us</li>
                            <li className='text-base text-textColor hover:text-headingColor cursor-pointer transition-all ease-in-out duration-100'>Service</li>
                        </motion.ul>



                        <div
                            className='relative flex items-center justify-center mr-10 cursor-pointer'
                            onClick={handleShowCart}
                        >
                            < BsBasket2 className='text-2xl text-textColor ml-8 cursor-pointer' />
                            {cartItems && cartItems.length > 0 && (

                                <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg'>
                                    <p className='text-xs font-bold text-white flex items-center justify-center'>{cartItems.length}</p>
                                </div>
                            )}
                        </div>
                        <div className=' relative'>
                            <motion.img
                                whileTap={{ scale: '0.8' }}
                                src={user ? user.photoURL : Avatar}
                                alt='profile-image'
                                className='min-w-[40px] w-10 min-h-[40px] h-10 drop-shadow-xl cursor-pointer rounded-full '
                                onClick={logIn}
                            />
                            {isMenu && (

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className='w-36 bg-primary shadow-xl rounded-lg flex flex-col absolute px-4 py-2 left-[-66px] top-12  '>
                                    {user && user.uid === "114249291511414497967" ? (

                                        <Link to='/createItem'>
                                            <p className='py-1 flex items-center gap-3 cursor-pointer  transition-all hover:-translate-y-1 hover:scale-110 duration-100 ease-in-out text-textColor text-base'
                                                onClick={() => setIsMenu(false)}
                                            >
                                                <IoIosAddCircleOutline /> New item
                                            </p>
                                        </Link>

                                    ) : (
                                        <Link to='/orders'>
                                            <p className='py-1 flex items-center gap-3 cursor-pointer  transition-all hover:-translate-y-1 hover:scale-110 duration-100 ease-in-out text-textColor text-base'><AiOutlineShoppingCart /> My Order </p>
                                        </Link>
                                    )}

                                    <p className='py-1 flex items-center gap-3 cursor-pointer hover:-translate-y-1 hover:scale-110 transition-all duration-100 ease-in-out text-textColor text-base'
                                        onClick={logOut}
                                    >
                                        < BiLogOut className='mr-2' />Log out
                                    </p>
                                </motion.div>

                            )}

                        </div>
                    </div>

                </div>
            </div>


            {/* mobile */}
            <div className=' flex md:hidden items-center justify-between '>
                <Link to={'/'} className='flex gap-2 items-center '>
                    <img src={Logo} alt='logo' className='w-10 object-cover ' />
                    <p className='text-headingColor text-2xl font-bold cursor-default'>Papa's Food Corner</p>
                </Link>
                <div className='flex items-center'>

                    <div
                        onClick={handleShowCart}
                        className='relative flex items-center justify-center ml-10 mr-5'>
                        < BsBasket2 className='text-2xl text-textColor ml-8 cursor-pointer' />

                        {cartItems && cartItems.length > 0 && (

                            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg'>
                                <p className='text-xs font-bold text-white flex items-center justify-center'>{cartItems.length}</p>
                            </div>
                        )}
                    </div>
                    <div className=' relative'>
                        <motion.img
                            whileTap={{ scale: '0.8' }}
                            src={user ? user.photoURL : Avatar}
                            alt='profile-image'
                            className='min-w-[40px] w-10 min-h-[40px] h-10 drop-shadow-xl cursor-pointer rounded-full '
                            onClick={logIn}
                        />

                        {isMenu && (

                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className='w-44 bg-primary shadow-xl rounded-lg flex flex-col absolute px-4 py-2 left-[-106px] top-12  '>
                                <ul className='flex px-4 py-2 gap-8 flex-col'>
                                    {user && user.uid === "114249291511414497967" ? (
                                        <>

                                            <Link to='/createItem'>
                                                <p className=' flex items-center gap-3 cursor-pointer  transition-all duration-100 ease-in-out hover:-translate-y-1 hover:scale-110 text-textColor text-base'>  New item <IoIosAddCircleOutline /></p>
                                            </Link>


                                        </>
                                    ) : (
                                        <Link to='/orders'>
                                            <p className='flex items-center gap-3 cursor-pointer  transition-all duration-100 ease-in-out hover:-translate-y-1 hover:scale-110 text-textColor text-base' ><AiOutlineShoppingCart /> My Order </p>
                                        </Link>
                                    )}
                                    <li className='text-base text-textColor hover:text-headingColor hover:-translate-y-1 hover:scale-110 cursor-pointer transition-all ease-in-out duration-100'>Home</li>
                                    <li className='text-base text-textColor hover:text-headingColor hover:-translate-y-1 hover:scale-110 cursor-pointer transition-all ease-in-out duration-100'>Menu</li>
                                    <li className='text-base text-textColor hover:text-headingColor hover:-translate-y-1 hover:scale-110 cursor-pointer transition-all ease-in-out duration-100'>About Us</li>
                                    <li className='text-base text-textColor hover:text-headingColor hover:-translate-y-1 hover:scale-110 cursor-pointer transition-all ease-in-out duration-100'>Service</li>
                                    <p className=' flex items-center gap-3 cursor-pointer  transition-all hover:-translate-y-1 hover:scale-110 duration-100 ease-in-out text-textColor text-base'>  Log out < BiLogOut className='ml-2' /></p>
                                </ul>
                            </motion.div>

                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header