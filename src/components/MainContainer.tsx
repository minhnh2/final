import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useStatevalue } from 'context/StateProvider';
import { useEffect, useState } from 'react';
import NewItems from './NewItems';
import MenuContainer from './MenuContainer';


const MainContainer = () => {
    const [{ foodItems }, dispatch] = useStatevalue();
    const [scrollValue, setScrollValue] = useState(0);
    useEffect(() => {

    }, [scrollValue])
    console.log(scrollValue);



    return (
        <div className='flex flex-col h-full w-full items-center justify-center'>
            <HomeContainer />
            <NewItems />
            <MenuContainer />

        </div>
    )
}

export default MainContainer