"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ProductSliceActions } from "@/store/products-slice";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

const ProductStatus = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useRouter();

  const handleChangeStatus = async (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const currentStatus = params.get("status")?.split(",").filter(Boolean) || [];
    const value = e.target.id === "cat11" ? "inStock" : "onSale";    

    if (e.target.checked) {
      if (!currentStatus.includes(value)) {
        currentStatus.push(value);
      }
    } else {
      const index = currentStatus.indexOf(value);
      if (index > -1) {
        currentStatus.splice(index, 1);
      }
    }

    if (currentStatus.length > 0) {
      params.set("status", currentStatus.join(","));
    } else {
      params.delete("status");
    }    

    params.delete("page");
    params.set("page", "1");  

    const response = await axiosPrivate.get(`/api/products?${params}`);
    dispatch(ProductSliceActions.getAllProducts({ ...response.data }));

    navigate.push(`/products?${params}`);
  };

  return (
    <div className="single-filter-box">
      <h5 className="title">Product Status</h5>
      <div className="filterbox-body">
        <div className="category-wrapper">
          <div className="single-category single-category-checkbox">
            <input id="cat11" type="checkbox" onChange={handleChangeStatus} />
            <label htmlFor="cat11">In Stock</label>
          </div>
          <div className="single-category single-category-checkbox">
            <input id="cat12" type="checkbox" onChange={handleChangeStatus} />
            <label htmlFor="cat12">On Sale</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStatus;