const TabDetail = ({ productDetailAdditionalInfo }: { productDetailAdditionalInfo: ProductDetailAdditionalInfoType }) => {
  return (
    <div className="single-tab-content-shop-details">
      <p className="disc">
        {productDetailAdditionalInfo.additionalInfo}
      </p>
      <div className="table-responsive table-shop-details-pd">
        <table className="table">
          <thead>
            <tr>
              <th>
                <b>Item code</b>
              </th>
              <th>
                <b>{`SKU-${1000 + productDetailAdditionalInfo.id}`}</b>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Status</td>
              <td>{productDetailAdditionalInfo.status_content}</td>
            </tr>
            <tr>
              <td>Brand</td>
              <td>{productDetailAdditionalInfo.brand}</td>
            </tr>
            <tr>
              <td>Product type</td>
              <td>{productDetailAdditionalInfo.type_content}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="cansellation mt--20">
        <span> Return/cancellation:</span> No change will be applicable which
        are already delivered to customer. If product quality or quantity
        problem found then customer can return/cancel their order on delivery
        time with presence of delivery person.
      </p>
      <p className="note">
        <span>Note:</span> Product delivery duration may vary due to product
        availability in stock.
      </p>
    </div>
  );
};

export default TabDetail;