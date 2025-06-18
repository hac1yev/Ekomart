
const TrendingSkeletonLoading = () => {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="cover-card-main-over">
                        <div className="row">
                                {[1,2,3,4,5,6,7,8].map((i) => (
                                    <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mt--15">
                                        <div className='single-shopping-card-one tranding-product tranding-product-skeleton' style={{ position: 'relative', height: '100%' }}>
                                            <div className="trending-skeleton-image middle-skeleton" style={{ borderRadius: '5px' }}></div>
                                            <div className="body-content" style={{ marginTop: '5px' }}>
                                                <p className='middle-skeleton' style={{ height: '20px', marginBottom: '10px' }}></p>
                                                <p className="middle-skeleton" style={{ height: '15px', width: '40%', marginBottom: '5px' }}></p>
                                                <div className="price-area" style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                                                    <span className='middle-skeleton' style={{ height: '25px', width: '40%', marginBottom: '5px' }}></span>
                                                    <span className="middle-skeleton" style={{ height: '20px', width: '35%', marginBottom: '5px' }}></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingSkeletonLoading;