import DiscountSkeletonLoading from "@/components/LoadingProgress/DiscountSkeletonLoading";
import dynamic from "next/dynamic";

const DynamicDiscountProducts = dynamic(() => import('./DiscountProductsWrapper'), {
    loading: () => <DiscountSkeletonLoading />,
    ssr: false
});

const DiscountProducts = () => {
    return (
        <div className="rts-grocery-feature-area rts-section-gapBottom">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="title-area-between">
                        <h2 className="title-left">
                            Products With Discounts
                        </h2>
                        <div className="countdown">
                            <div className="countDown">10/05/2025 10:20:00</div>
                        </div>
                    </div>
                </div>
            </div>
            <DynamicDiscountProducts />
        </div>
    </div>
    );
};

export default DiscountProducts;