import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer'
import CreateContainer from './components/CreateContainer';
import { AnimatePresence } from 'framer-motion'
// import { LogIn } from './components/indexExport';

function App() {
  return (
    <AnimatePresence>

      <div className='w-screen h-auto flex flex-col bg-primary' >
        <Header />
        <main className='mt-4 p-8 w-full'>
          <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/createitem' element={<CreateContainer />} />
            {/* <Route path='/login' element={<LogIn />} /> */}

          </Routes>

        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
