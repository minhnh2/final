import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useStatevalue } from 'context/StateProvider';
import { useEffect, useState } from 'react';
import NewItems from './NewItems';
import MenuContainer from './MenuContainer';
import CardContainer from './CardContainer';


const MainContainer = () => {
    const [{ foodItems, cartShow }, dispatch] = useStatevalue();
    useEffect(() => {

    }, [cartShow])



    return (
        <div className='flex flex-col h-full w-full items-center justify-center'>
            <HomeContainer />
            <NewItems />
            <MenuContainer />
            {cartShow && (
                <CardContainer />
            )}

        </div>
    )
}

export default MainContainer