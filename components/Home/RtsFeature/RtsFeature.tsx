import rtsPrice from '../../../public/images/rts/rts-price.svg'
import rtsOffer from '../../../public/images/rts/rts-offer.svg'
import rtsPolicy from '../../../public/images/rts/rts-policy.svg'
import rtsDollar from '../../../public/images/rts/rts-dollar.svg'
import Image from 'next/image';

const RtsFeature = () => {
    return (
        <div className="rts-feature-area rts-section-gap">
            <div className="container">
                <div className="row g-4">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="single-feature-area">
                            <div className="icon">
                                <Image 
                                    src={rtsDollar}
                                    width={45}
                                    height={45}
                                    alt="best-wide-assortment"
                                    priority
                                />
                            </div>
                            <div className="content">
                                <h4 className="title">Wide Assortment</h4>
                                <span>Orders $50 or more</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="single-feature-area">
                            <div className="icon">
                                <Image 
                                    src={rtsPolicy}
                                    width={45}
                                    height={45}
                                    alt="best-policy"
                                    priority
                                />
                            </div>
                            <div className="content">
                                <h4 className="title">Easy Return Policy</h4>
                                <span>Orders $50 or more</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="single-feature-area">
                            <div className="icon">
                                <Image 
                                    src={rtsOffer}
                                    width={45}
                                    height={45}
                                    alt="best-offer"
                                    priority
                                />
                            </div>
                            <div className="content">
                                <h4 className="title">Best Prices & Offers</h4>
                                <span>Orders $50 or more</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="single-feature-area">
                            <div className="icon">
                                <Image 
                                    src={rtsPrice}
                                    width={45}
                                    height={45}
                                    alt="best-prices"
                                    priority
                                />
                            </div>
                            <div className="content">
                                <h4 className="title">Best Prices & Offers</h4>
                                <span>Orders $50 or more</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RtsFeature;