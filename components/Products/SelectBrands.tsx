"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ProductSliceActions } from "@/store/products-slice";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const SelectBrands = () => {
  const [brand,setBrand] = useState("");
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("brand", `${brand}`);
    params.delete("page");
    params.set("page", "1");
    const obj = Object.fromEntries(params.entries());

    for(const key in obj) {      
      if(obj[key]) {
        params.set(key, obj[key].toString());        
      }
    }
    
    const response = await axiosPrivate.get(`/api/products?${params}`);
    dispatch(ProductSliceActions.getAllProducts({
      ...response.data
    })); 
    setBrand('');
    navigate.push(`/products?${params}`);
  };

  return (
    <div className="single-filter-box">
      <h5 className="title">Search by Brand</h5>
      <div className="filterbox-body">
        <div className="category-wrapper">
          <form className="search-header products-brand-search" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <button className="rts-btn btn-primary radious-sm with-icon">
              <SearchIcon width={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectBrands;
