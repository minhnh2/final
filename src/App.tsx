import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer'
import CreateContainer from './components/CreateContainer';
import { AnimatePresence } from 'framer-motion'
import { useStatevalue } from 'context/StateProvider';
import { getAllFoodItems } from 'utils/firebaseFunction';
import { useEffect } from 'react';
import { actionType } from 'context/reducer';
// import { LogIn } from './components/indexExport';

function App() {

  const [{ }, dispatch] = useStatevalue();
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
        <Header />
        <main className='mt-16 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateContainer />} />
            {/* <Route path='/login' element={<LogIn />} /> */}

          </Routes>

        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
