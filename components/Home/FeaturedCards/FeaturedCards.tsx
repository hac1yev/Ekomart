"use client"

// import { useCallback, useState } from "react";
// import ProductDetailModal from "../../Modals/ProductDetailModal";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import dynamic from "next/dynamic";
import FeaturedSkeletonLoading from "@/components/LoadingProgress/FeaturedSkeletonLoading";

const FeaturedSliderDynamic = dynamic(() => import("./FeaturedSlider"), {
    loading: () => <FeaturedSkeletonLoading />,
    ssr: false
});

const FeaturedCards = () => {  
    // const [isModalOpen,setIsModalOpen] = useState(false);
    // const [modalData,setModalData] = useState<ProductCardModalType>();

    // useEffect(() => {
    //     (async function() {
    //         try {
    //             const response = await axios.get('/api/products/featured');
    //             console.log(response.data);
                
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     })()
    // }, []);

    // const handleOpenModal = useCallback((id: string) => {
    //     setIsModalOpen(true);
    //     const findedCard = cards.find((card) => card.id === parseInt(id)) as ProductType;
    //     setModalData({
    //         image: findedCard?.image,
    //         title: findedCard?.title,
    //         description: findedCard?.description,
    //         price: findedCard?.price,
    //         value: findedCard?.value,
    //         reviewCount: findedCard?.reviewCount,
    //         categories: findedCard?.category,
    //         tags: findedCard?.tags
    //     });
    // }, []);

    // const handleCloseModal = useCallback(() => {
    //     setIsModalOpen(false);
    // }, []);    

    return (
        <div className="rts-grocery-feature-area rts-section-gapBottom">
            <div className="category-area-main-wrapper-one">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-area-between">
                                <h2 className="title-left">
                                    Most Viewed Products
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <FeaturedSliderDynamic />
                {/* {isModalOpen && modalData && 
                    <ProductDetailModal 
                        handleCloseModal={handleCloseModal}
                        {...modalData}
                    />} */}
            </div>
        </div>
    );
};

export default FeaturedCards;