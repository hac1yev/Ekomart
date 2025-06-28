import { LoadingSliceAction } from "@/store/loading-slice";
import { ProductSliceActions, useTypedProductSelector } from "@/store/products-slice";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";

const ProductsFilterSelect = () => {
  const totalProducts = useTypedProductSelector(state => state.productReducer.totalProducts);
  const products = useTypedProductSelector(state => state.productReducer.products);
  const [selectData,setSelectData] = useState<AddProductSelectType>({});
  const searchParams = useSearchParams();
  const dispatch = useDispatch();  
  const navigate = useRouter();
  const [filterItems, setFilterItems] = useState<{
    category: number | null;
    tag: number | null;
    type: number | null;
  }>({
    category: null,
    tag: null,
    type: null
  });

  const page = useMemo(() => {
    return Number(searchParams.get("page")) || 1;
  }, [searchParams]);

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get("/api/products/meta");
        setSelectData({
          categories: response.data.categories,
          tags: response.data.tags,
          types: response.data.types
        });            
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const type = searchParams.get('type');

    setFilterItems({
      category: category ? Number(category) : null,
      tag: tag ? Number(tag) : null,
      type: type ? Number(type) : null,
    });
    
    navigate.replace(`/products?${params}`);
  }, [navigate,searchParams,page]);

  useEffect(() => {
    (async function() {
      dispatch(LoadingSliceAction.toggleLoading(true));
      try {
        const obj = Object.fromEntries(Array.from(searchParams.entries()));
        const allParams: Record<string, string | number> = {
          ...obj,
          page
        }

        const params = new URLSearchParams(searchParams);

        for(const key in allParams) {
          if(allParams[key]) {
            if(!params.has(key)) {
              params.set(key, allParams[key].toString());
            }else{
              params.set(key, allParams[key].toString());
            }
          }
        }

        const response = await axios.get(`/api/products?${params}`);                
        dispatch(ProductSliceActions.getAllProducts({
          ...response.data
        }));         
      } catch (error) {
        console.log(error);
      }finally{
        dispatch(LoadingSliceAction.toggleLoading(false));
      }
    })();
  }, [dispatch,searchParams,page]);

  const handleFilter = () => {
    const filterItemsArr = Object.entries(filterItems).filter((item) => {
      if(!item.includes(null)) {
        return item;
      }
    });
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    const obj = Object.fromEntries(filterItemsArr);
    obj['page'] = 1;
    
    for(const key in obj) {      
      if(obj[key]) {
        if(!params.has(key)) {
          params.set(key, obj[key].toString());
        }else{
          params.delete(key);
          params.set(key, obj[key].toString());
        }
      }
    }
        
    navigate.push(`/products?${params}`);
  };      

  const handleResetFilter = () => {
    navigate.push(`/products?page=1`);
    setFilterItems({ category: null, tag: null, type: null }); 
  }

  return (
    <div className="filter-select-area">
      <div className="top-filter">
        {(totalProducts !== 0 && totalProducts) && <span>Showing {
          products.length === 12 
            ? page === 1 
              ? 1
              : products.length * page - 12
            : page !== 1
              ? 12 * (page-1)
              : 1
          }–{products.length === 12 ? products.length * page : totalProducts} of {totalProducts} results</span>}
        {!totalProducts && <span>Showing 0–0 of 0 results</span>}
      </div>
      <div className="nice-select-area-wrapper-and-button">
        <div className="nice-select-wrapper-1">
          <div className="single-input">
            <Select
              id="categories"
              options={selectData.categories}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select categories:"
              value={selectData.categories?.find(opt => opt.value === filterItems.category) || null}
              onChange={(selectedOption) => setFilterItems((prev) => {                 
                return {
                  ...prev,
                  category: selectedOption?.value || null
                }
              })}
            />
          </div>
          <div className="single-input">
            <Select
              options={selectData.tags}
              id="tags"
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select tags:"
              value={selectData.tags?.find(opt => opt.value === filterItems.tag) || null}
              onChange={(selectedOption) => setFilterItems((prev) => {               
                return {
                  ...prev,
                  tag: selectedOption?.value || null
                }
              })}
            />
          </div>
          <div className="single-input">
            <Select
              options={selectData.types}
              id="type"
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select type:"
              value={selectData.types?.find(opt => opt.value === filterItems.type) || null}
              onChange={(selectedOption) => {          
                if(selectedOption) {
                  setFilterItems((prev) => {
                    return {
                      ...prev,
                      type: selectedOption?.value || null
                    }
                  })
                }
              }}
            />
          </div>
        </div>
        <div className="button-area">
          <button className="rts-btn" onClick={handleFilter}>Filter</button>
          <button className="rts-btn" onClick={handleResetFilter}>Reset Filter</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilterSelect;