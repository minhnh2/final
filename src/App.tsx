import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer'
import CreateContainer from './components/CreateContainer';
import { AnimatePresence } from 'framer-motion'
import { useStatevalue } from 'context/StateProvider';
import { getAllFoodItems } from 'utils/firebaseFunction';
import React, { useEffect } from 'react';
import { actionType } from 'context/reducer';
import { app } from 'firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Orders from 'components/Orders';
// import LogIn from 'components/LogIn';

function App() {


  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStatevalue();
  const [isMenu, setIsMenu] = React.useState<boolean>(false)
  const logIn = async () => {

    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0]
      })
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  }
  const handleShowCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow
    })
  }
  const logOut = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null
    })
  }

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (


    <AnimatePresence exitBeforeEnter>

      <div className='w-screen h-auto flex flex-col bg-primary' >
        <Header logIn={logIn} handleShowCart={handleShowCart} logOut={logOut} isMenu={isMenu} setIsMenu={setIsMenu} user={user} />
        <main className='mt-16 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path='/' element={<MainContainer />} />
            {user && user.uid === "114249291511414497967" ? (
              <Route path='/createItem' element={<CreateContainer />} />
            ) :
              <Route path='/' element={<MainContainer />} />
            }
            <Route path='/order' element={<Orders />} />

          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
