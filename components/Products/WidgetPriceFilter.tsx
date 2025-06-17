"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ProductSliceActions } from "@/store/products-slice";
import { useSearchParams,useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const WidgetPriceFilter = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(150);
  const [rangeValue, setRangeValue] = useState(0);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useRouter();

  const handleFilter = async (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("price", `${minPrice}-${maxPrice}`);
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
    navigate.push(`/products?${params}`);
  }

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setRangeValue(value); 

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const calculatedPrice = Math.round((value / 100) * maxPrice);
      setMinPrice(Math.floor(calculatedPrice));
    }, 500);
  };

  return (
    <div className="single-filter-box">
      <h5 className="title">Widget Price Filter</h5>
      <div className="filterbox-body">
        <form className="price-input-area" onSubmit={handleFilter}>
          <div className="half-input-wrapper">
            <div className="single">
              <label htmlFor="min">Min price</label>
              <input
                id="min"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
              />
            </div>
            <div className="single">
              <label htmlFor="max">Max price</label>
              <input
                id="max"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
            </div>
          </div>
          <input
            type="range"
            className="range"
            min={0}
            max={100}
            value={rangeValue}
            onChange={handleChangePrice}
          />
          <div className="filter-value-min-max">
            <span>Price: ${minPrice || 0} — ${maxPrice || 0}</span>
            <button className="rts-btn btn-primary">Filter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WidgetPriceFilter;