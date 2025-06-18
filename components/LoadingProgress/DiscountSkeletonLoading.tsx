const DiscountSkeletonLoading = () => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="product-with-discount">
          <div className="row g-5">
            <div className="col-xl-4 col-lg-12">
              {[1, 2].map((item) => (
                <div className="single-discount-skeleton" key={item}>
                  <div className="inner-content">
                    <p className="middle-skeleton" style={{ width: '77%', height: '21px', marginBottom: '5px' }}></p>
                    <p className="middle-skeleton" style={{ width: '38%', height: '21px' }}></p>
                    <div className="price-area">
                      <p className="middle-skeleton" style={{ width: '12%', height: '14px', marginBottom: '5px' }}></p>
                      <p className="middle-skeleton" style={{ width: '33%', height: '30px' }}></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-xl-8 col-lg-12">
              <div className="row">
                {[1, 2, 3, 4].map((product) => (
                  <div className="col-lg-6 mb-4" key={product}>
                    <div className="single-shopping-card-one discount-offer">
                      <div className="thumbnail-preview discount-skeleton-img middle-skeleton"></div>
                      <div className="body-content" style={{ padding: '8px 0' }}>
                        <p className="title middle-skeleton" style={{ width: '100%', height: '20px', marginBottom: '5px' }}></p>
                        <div className="price-area">
                          <span className="current middle-skeleton" style={{ width: '25%', height: '20px' }}></span>
                          <div className="middle-skeleton" style={{ width: '25%', height: '18px' }}></div>
                        </div>
                        <div className="cart-counter-action">
                          <div className="middle-skeleton" style={{ width: '35%', height: '30px' }}></div>
                          <div className="middle-skeleton" style={{ width: '35%', height: '35px' }}></div>
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
    </div>
  );
};

export default DiscountSkeletonLoading;
