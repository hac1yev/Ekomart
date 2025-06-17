const HeaderCartPopover = () => {
  return (
    <div className="category-sub-menu card-number-show">
      <h5 className="shopping-cart-number">Shopping Cart (03)</h5>
      <div className="cart-item-1 border-top">
        <div className="img-name">
          <div className="thumbanil">
            {/* <Image width={100} height={100} src="../../public/images/shop/cart-1.png" alt="" /> */}
          </div>
          <div className="details">
            <a href="shop-details.html">
              <h5 className="title">
                Foster Farms Breast Nuggets Shaped Chicken
              </h5>
            </a>
            <div className="number">
              1 <i className="fa-regular fa-x"></i>
              <span>$36.00</span>
            </div>
          </div>
        </div>
        <div className="close-c1">
          <i className="fa-regular fa-x"></i>
        </div>
      </div>
      <div className="cart-item-1">
        <div className="img-name">
          <div className="thumbanil">
            {/* <Image width={100} height={100} src="../../public/images/shop/05.png" alt="" /> */}
          </div>
          <div className="details">
            <a href="shop-details.html">
              <h5 className="title">
                Foster Farms Breast Nuggets Shaped Chicken
              </h5>
            </a>
            <div className="number">
              1 <i className="fa-regular fa-x"></i>
              <span>$36.00</span>
            </div>
          </div>
        </div>
        <div className="close-c1">
          <i className="fa-regular fa-x"></i>
        </div>
      </div>
      <div className="cart-item-1">
        <div className="img-name">
          <div className="thumbanil">
            {/* <Image width={100} height={100} src="../../public/images/shop/04.png" alt="" /> */}
          </div>
          <div className="details">
            <a href="shop-details.html">
              <h5 className="title">
                Foster Farms Breast Nuggets Shaped Chicken
              </h5>
            </a>
            <div className="number">
              1 <i className="fa-regular fa-x"></i>
              <span>$36.00</span>
            </div>
          </div>
        </div>
        <div className="close-c1">
          <i className="fa-regular fa-x"></i>
        </div>
      </div>
      <div className="sub-total-cart-balance">
        <div className="bottom-content-deals mt--10">
          <div className="top">
            <span>Sub Total:</span>
            <span className="number-c">$108.00</span>
          </div>
          <div className="single-progress-area-incard">
            <div className="progress">
              <div
                className="progress-bar wow fadeInLeft"
                role="progressbar"
                style={{ width: "80%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
          <p>
            Spend More <span>$125.00</span> to reach <span>Free Shipping</span>
          </p>
        </div>
        <div className="button-wrapper d-flex align-items-center justify-content-center">
          <a href="cart.html" className="rts-btn btn-primary ">
            View Cart
          </a>
          <a href="checkout.html" className="rts-btn btn-primary border-only">
            CheckOut
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderCartPopover;
