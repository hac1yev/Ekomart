import React from "react";

const Orders = () => {
  return (
    <div className="shipping-address-billing-address-account">
      <div className="half">
        <h2 className="title">Billing Address</h2>
        <p className="address">
          3522 Interstate <br />
          75 Business Spur, <br />
          Sault Ste. <br />
          Marie, MI 49783 <br />
          New York
        </p>
        <a href="#">Edit</a>
      </div>
      <div className="half">
        <h2 className="title">Shipping Address</h2>
        <p className="address">
          3522 Interstate <br />
          75 Business Spur, <br />
          Sault Ste. <br />
          Marie, MI 49783 <br />
          New York
        </p>
        <a href="#">Edit</a>
      </div>
    </div>
  );
};

export default Orders;
