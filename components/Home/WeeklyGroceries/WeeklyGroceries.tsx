"use client";

// import ProductDetailModal from "@/components/Modals/ProductDetailModal";
import { useState } from "react";
import dynamic from "next/dynamic";
import WeeklySkeletonLoading from "@/components/LoadingProgress/WeeklySkeletonLoading";

const WeeklyProductsDynamic = dynamic(() => import("./WeeklyGroceriesWrapper"), {
    loading: () => <WeeklySkeletonLoading />,
    ssr: false
});

const categories = ["Female","Male","Mother & Kid","Households","Furnitures"];

const WeeklyGroceries = () => {

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
                <WeeklyProductsDynamic tabIndex={tabIndex} />
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