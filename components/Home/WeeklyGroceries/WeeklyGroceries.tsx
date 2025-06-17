"use client";

import CardItem from "@/components/Cards/CardItem";
import { useTypedHomeSelector } from "@/store/home-slice";
// import ProductDetailModal from "@/components/Modals/ProductDetailModal";
import { useState } from "react";

const categories = ["Female","Male","Mother & Kid","Households","Furnitures"];

const WeeklyGroceries = () => {
    const weeklyProducts = useTypedHomeSelector((state) => state.homePageReducer.homePageData).weeklyProducts;

    // const [isModalOpen,setIsModalOpen] = useState(false);
    // const [modalData,setModalData] = useState<ProductType>();
    const [tabIndex,setTabIndex] = useState(0);

    // const handleOpenModal = useCallback((id: string) => {
    //     setIsModalOpen(true);
    //     const findedCard = cards.find((card) => card.id === parseInt(id));
    //     setModalData(findedCard);
    // }, []);
    
    // const handleCloseModal = useCallback(() => {
    //     setIsModalOpen(false);
    // }, []);

    const handleChangeTab = (index: number) => {
        setTabIndex(index);
    };  

    if(weeklyProducts?.length === 0) {
        return <p>Loading...</p>
    }


    return (
        <div className="weekly-best-selling-area rts-section-gap bg_light-1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-area-between">
                            <h2 className="title-left">
                                Weekly Best Selling Groceries
                            </h2>
                            <ul className="nav best-selling-grocery">
                                {categories.map((category,index) => (
                                    <li 
                                        onClick={() => handleChangeTab(index)}
                                        className="nav-item" 
                                        key={index}
                                    >
                                        <button className={tabIndex === index ? "active" : ""}>{category}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        {tabIndex === 0 && <div className="row g-4">
                            {weeklyProducts?.filter((card) => card.categories.includes('Female')).map((item) => (
                                <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <CardItem 
                                        componentType="weekly"
                                        // handleOpenModal={handleOpenModal}
                                        id={item.id}
                                        discount={item.discount}
                                        liked={item.liked}
                                        image={item.image}
                                        title={item.title}
                                        price={item.price}
                                        value={item.value}
                                        brand={item.brand}
                                    />
                                </div>
                            ))}
                        </div>}
                        {tabIndex === 1 && <div className="row g-4">
                            {weeklyProducts?.filter((card) => card.categories.includes('Male')).map((item) => (
                                <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <CardItem 
                                        componentType="weekly"
                                        // handleOpenModal={handleOpenModal}
                                        id={item.id}
                                        discount={item.discount}
                                        image={item.image}
                                        liked={item.liked}
                                        title={item.title}
                                        price={item.price}
                                        value={item.value}
                                        brand={item.brand}
                                    />
                                </div>
                            ))}
                        </div>}
                        {tabIndex === 2 && <div className="row g-4">
                            {weeklyProducts?.filter((card) => card.categories.includes('Mother & Kid')).map((item) => (
                                <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <CardItem 
                                        componentType="weekly"
                                        // handleOpenModal={handleOpenModal}
                                        id={item.id}
                                        discount={item.discount}
                                        liked={item.liked}
                                        image={item.image}
                                        title={item.title}
                                        price={item.price}
                                        value={item.value}
                                        brand={item.brand}
                                    />
                                </div>
                            ))}
                        </div>}
                        {tabIndex === 3 && <div className="row g-4">
                            {weeklyProducts?.filter((card) => card.categories.includes('Households')).map((item) => (
                                <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <CardItem 
                                        componentType="weekly"
                                        // handleOpenModal={handleOpenModal}
                                        id={item.id}
                                        discount={item.discount}
                                        image={item.image}
                                        liked={item.liked}
                                        title={item.title}
                                        price={item.price}
                                        value={item.value}
                                        brand={item.brand}
                                    />
                                </div>
                            ))}
                        </div>}
                        {tabIndex === 4 && <div className="row g-4">
                            {weeklyProducts?.filter((card) => card.categories.includes('Furnitures')).map((item) => (
                                <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <CardItem 
                                        componentType="weekly"
                                        // handleOpenModal={handleOpenModal}
                                        id={item.id}
                                        discount={item.discount}
                                        liked={item.liked}
                                        image={item.image}
                                        title={item.title}
                                        price={item.price}
                                        value={item.value}
                                        brand={item.brand}
                                    />
                                </div>
                            ))}
                        </div>}
                    </div>
                </div>
                {/* {isModalOpen && modalData && 
                    <ProductDetailModal 
                        handleCloseModal={handleCloseModal}
                        {...modalData}
                    />
                } */}
            </div>
        </div>
    );
};

export default WeeklyGroceries;