import React from "react";
import CardItem from "../Cards/CardItem";

const ProductList = ({ products }: { products: ProductType[] }) => {
  return (
    <div
      className="product-area-wrapper-shopgrid-list mt--20 tab-pane fade show active"
      id="home-tab-pane"
    >
      <div className="row g-4">
        {products
          .toSorted(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((product) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={product.id}>
              <CardItem
                key={product.id}
                // handleOpenModal={handleOpenModal}
                liked={product.liked}
                id={product.id}
                discount={product.discount}
                image={product.image}
                title={product.title}
                price={product.price}
                value={product.value}
                brand={product.brand}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
