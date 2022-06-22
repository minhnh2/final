import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png'
import { BsBasket2 } from 'react-icons/bs';
import { BiLogIn } from 'react-icons/bi';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { app } from '../firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStatevalue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


function Header() {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{ user }, dispatch] = useStatevalue();
    const logIn = async () => {
        if (!user) {

            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);

            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            })
            localStorage.setItem("user", JSON.stringify(providerData[0]));
        }


    }

    return (
        <div className=' w-screen  sticky z-1 bg-gray-300 p-6 px-16'>
            {/* medium and large screen */}
            <div className=' hidden md:flex p-5 h-full w-full item-center justify-between'>
                <Link to={'/'} className='flex gap-2 items-center '>
                    <img src={Logo} alt='logo' className='w-10 object-cover ' />
                    <p className='text-headingColor text-2xl font-bold cursor-default'>Papa's Food Corner</p>
                </Link>

                <div className='flex justify-center items-center '>
                    <ul className='flex items-center gap-8 '>
                        <li className='text-base text-textColor hover:text-headingColor cursor-pointer transition-all ease-in-out duration-100'>Home</li>
                        <li className='text-base text-textColor hover:text-headingColor cursor-pointer transition-all ease-in-out duration-100'>Menu</li>
                        <li className='text-base text-textColor hover:text-headingColor cursor-pointer transition-all ease-in-out duration-100'>About Us</li>
                        <li className='text-base text-textColor hover:text-headingColor cursor-pointer transition-all ease-in-out duration-100'>Service</li>
                    </ul>
                    <div className='relative flex items-center justify-center'>
                        < BsBasket2 className='text-2xl text-textColor ml-8 cursor-pointer' />
                        <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg'>
                            <p className='text-xs font-bold text-white flex items-center justify-center'>2</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center ml-8'>
                        <motion.img
                            whileTap={{ scale: '0.8' }}
                            src={user ? user.photoURL : <BiLogIn />}
                            alt='profile-image'
                            className='min-w-[40px] w-10 min-h-[40px] h-10 drop-shadow-xl cursor-pointer rounded-full'
                            onClick={logIn}
                        />
                    </div>

                </div>
            </div>


            {/* mobile */}
            <div className=' flex md:hidden p-5 h-full bg-blue-600'>

            </div>

        </div>
    )
}

export default Header