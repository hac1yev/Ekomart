"use client";

import Banner from './Banner/Banner'
import RtsFeature from './RtsFeature/RtsFeature'
import FeaturedCards from './FeaturedCards/FeaturedCards'
import DiscountProducts from './DiscountProducts/DiscountProducts'
import WeeklyGroceries from './WeeklyGroceries/WeeklyGroceries'
import TrendingProducts from './TrendingProducts/TrendingProducts'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { homePageSliceAction } from '@/store/home-slice';
import axios from 'axios';

const HomeWrapper = () => {
    const dispatch = useDispatch();    

    useEffect(() => {
        (async function() {
            try {
                const response = await axios.get("/api/products/home");                  
                dispatch(homePageSliceAction.getAllHomeData(response.data));
            } catch (error) {   
                console.log(error);
            }
        })()
    }, [dispatch]);    

    return (
        <>
            <Banner />  
            <RtsFeature />
            <FeaturedCards />
            <DiscountProducts />
            <WeeklyGroceries />
            <TrendingProducts />
        </>
    );
};

export default HomeWrapper;