
const FeaturedSkeletonLoading = () => {
    return (
        <div className='container'>
            <div className="row">
                {[1,2,3,4,5].map((i) => (
                    <div key={i} className="col-xxl-20 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mt--15">
                        <div className='single-shopping-card-one featured-grocery-height' style={{ position: 'relative' }}>
                            <div className="featured-skeleton-image middle-skeleton"></div>
                            <div className="mt--15">
                                <p className='middle-skeleton' style={{ height: '20px', marginBottom: '5px' }}></p>
                            </div>
                            <div className="mt--10 d-flex gap-2">
                                <p className='middle-skeleton' style={{ height: '25px', width: '35%', marginBottom: '5px' }}></p>
                                <p className='middle-skeleton' style={{ height: '25px', width: "25%", marginBottom: '5px' }}></p>
                            </div>
                            <div className="mt--20 d-flex justify-content-between gap-2" style={{  width: '90%', position: 'absolute', bottom: '15px' }}>
                                <p className='middle-skeleton' style={{ height: '35px', width: '40%', marginTop: '2.5px', marginBottom: 0 }}></p>
                                <p className='middle-skeleton' style={{ height: '40px', width: "30%" }}></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedSkeletonLoading;