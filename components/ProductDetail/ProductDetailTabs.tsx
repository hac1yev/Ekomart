import { useState } from "react";
import TabDetail from "./TabDetail";
import TabCustomer from "./TabCustomer";

const ProductDetailTabs = ({ productDetailAdditionalInfo, productDetailRatingResult }: { productDetailAdditionalInfo: ProductDetailAdditionalInfoType, productDetailRatingResult: ProductDetailRatingResultType }) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="product-discription-tab-shop mt--50">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {["Product Details", "Customer Reviews"].map((tab, index) => (
          <li
            className="nav-item"
            key={index}
            onClick={handleChangeTab.bind(null, `tab${index + 1}`)}
          >
            <button className={activeTab === `tab${index + 1}` ? "nav-link active" : "nav-link"}>{tab}</button>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="myTabContent">
        {activeTab === "tab1" && (
          <TabDetail productDetailAdditionalInfo={productDetailAdditionalInfo} />
        )}
        {activeTab === "tab2" && (
          <TabCustomer productDetailRatingResult={productDetailRatingResult} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailTabs;