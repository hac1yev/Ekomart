import ProductStatus from "./ProductStatus";
import SelectBrands from "./SelectBrands";
import WidgetPriceFilter from "./WidgetPriceFilter";

const ProductSidebar = () => {
  return (
    <div className="col-xl-3 col-lg-12 pr--70 pr_lg--10 pr_sm--10 pr_md--5 rts-sticky-column-item">
      <div className="sidebar-filter-main theiaStickySidebar">
        <WidgetPriceFilter/>
        <ProductStatus />
        <SelectBrands />
      </div>
    </div>
  );
};

export default ProductSidebar;