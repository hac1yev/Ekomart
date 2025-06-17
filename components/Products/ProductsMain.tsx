"use client";

import ProductsFilterSelect from "./ProductsFilterSelect";
import ProductsPagination from "./ProductsPagination";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LinearProgressComponent from "../LoadingProgress/LinearProgressComponent";
import { useTypedLoadingSelector } from "@/store/loading-slice";
import { useTypedProductSelector } from "@/store/products-slice";

const AllProducts = dynamic(() => import("./ProductList"), {
  loading: () => <LinearProgressComponent />,
  ssr: false
});

const ProductsMain = () => {
  const isLoading = useTypedLoadingSelector((state) => state.loadingReducer.isLoading);
  const totalProducts = useTypedProductSelector((state) => state.productReducer.totalProducts);
  const products = useTypedProductSelector((state) => state.productReducer.products);

  // const [isModalOpen,setIsModalOpen] = useState(false);
  // const [modalData,setModalData] = useState<ProductType>();

  // const handleOpenModal = useCallback((id: string) => {
  //     setIsModalOpen(true);
  //     const findedProduct = products.find((product) => product.id === parseInt(id));
  //     setModalData(findedProduct);
  // }, [products]);

  // const handleCloseModal = useCallback(() => {
  //     setIsModalOpen(false);
  // }, []);

  return (
    <Suspense>
      <div className="col-xl-9 col-lg-12 products-main-wrapper">
        <ProductsFilterSelect />
        {totalProducts === 0 && !isLoading && (
          <h4 className="text-center my-4">There is no product.</h4>
        )} 
        <AllProducts products={products} />
        <ProductsPagination />
      </div>
    </Suspense>
  );
};

export default ProductsMain;