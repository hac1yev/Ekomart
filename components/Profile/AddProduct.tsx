"use client"

import { UploadButton } from "@/app/lib/uploadthing";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { FormEvent, useEffect, useState } from "react";
import Select from "react-select";

const AddProduct = () => {
  const axiosPrivate = useAxiosPrivate();
  const [selectData,setSelectData] = useState<AddProductSelectType>({});
  const userId: number = typeof window !== "undefined" && localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo") || "{}").userId 
    : "";     
  const [productItems,setProductItems] = useState<ProductItem>({
    title: "",
    life: new Date().toISOString().split('T')[0],
    discount: "",
    price: "",
    tags: [],
    categories: [],
    type: "",
    status: "",
    description: "",
    additionalInfo: "",
    image: {
      name: "",
      url: ""
    },
    brand: ""
  });

  useEffect(() => {
    (async function() {
      try {
        const response = await axiosPrivate.get("/api/products/meta");
        setSelectData(response.data);        
      } catch (error) {
        console.log(error);
      }
    })()
  }, [axiosPrivate]);

  const handleAddNewProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("/api/products", JSON.stringify({
        ...productItems,
        userId
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });      

      if(response.status === 200) {
        setProductItems({ title: "", life: new Date().toISOString().split('T')[0], discount: "", price: "", tags: [], categories: [], type: "", status: "", description: "", additionalInfo: "", image: { name: "", url: "" }, brand: "" });
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="#" className="add-product-form" onSubmit={handleAddNewProduct}>
      <h2 className="title">Add New Product</h2>
      <div className="input-half-area">
        <div className="single-input">
          <label htmlFor="title">Title*</label>
          <input 
            type="text" 
            placeholder="Enter title:" 
            id="title"
            value={productItems.title} 
            onChange={(e) => setProductItems((prev) => {
              return {
                ...prev,
                title: e.target.value
              }
            })} 
          />
        </div>
        <div className="single-input">
          <label htmlFor="lifespan">Lifespan*</label>
          <input 
            type="date" 
            id="lifespan"
            value={productItems.life} 
            onChange={(e) => setProductItems((prev) => {
              return {
                ...prev,
                life: e.target.value
              }
            })} 
          />
        </div>
      </div>
      <div className="input-half-area">
        <div className="single-input">
          <label htmlFor="kg">Discount*</label>
          <input 
            type="number" 
            id="Discount"
            placeholder="Discount:" 
            value={productItems.discount} 
            onChange={(e) => setProductItems((prev) => {
              return {
                ...prev,
                discount: parseInt(e.target.value)
              }
            })} 
          />
        </div>
        <div className="single-input">
          <label htmlFor="price">Price*</label>
          <input 
            type="number" 
            id="price"
            placeholder="Price:" 
            value={productItems.price} 
            onChange={(e) => setProductItems((prev) => {
              return {
                ...prev,
                price: parseInt(e.target.value)
              }
            })} 
          />
        </div>
      </div>
      <div className="input-half-area">
        <div className="single-input">
          <label htmlFor="tags">Tags*</label>
          <Select
            isMulti
            options={selectData.tags}
            id="tags"
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select tags:"
            value={productItems.tags}
            onChange={(selectedOption) => setProductItems((prev) => {               
              return {
                ...prev,
                tags: [
                  ...selectedOption
                ]
              }
            })}
          />
        </div>
        <div className="single-input">
          <label htmlFor="categories">Catergories*</label>
          <Select
            isMulti
            id="categories"
            options={selectData.categories}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select categories:"
            value={productItems.categories}
            onChange={(selectedOption) => setProductItems((prev) => { 
              return {
                ...prev,
                categories: [
                  ...selectedOption
                ]
              }
            })}
          />
        </div>
      </div>
      <div className="input-half-area">
        <div className="single-input">
          <label htmlFor="type">Type*</label>
          <Select
            options={selectData.types}
            id="type"
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select type:"
            value={selectData.types?.find(opt => opt.value === productItems.type) || null}
            onChange={(selectedOption) => {          
              if(selectedOption) {
                setProductItems((prev) => {
                  return {
                    ...prev,
                    type: selectedOption.value
                  }
                })
              }
            }}
          />
        </div>
        <div className="single-input">
          <label htmlFor="status">Status*</label>
          <Select
            options={selectData.status}
            id="status"
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select status:"
            value={selectData.status?.find(opt => opt.value === productItems.status) || null}
            onChange={(selectedOption) => {
              if(selectedOption) {
                setProductItems((prev) => ({
                  ...prev,
                  status: selectedOption.value
                }))
              }
            }}
          />
        </div>
      </div>
      <div className="single-input">
        <label htmlFor="price">Brand*</label>
        <input 
          type="text" 
          id="brand"
          placeholder="Enter brand:" 
          value={productItems.brand} 
          onChange={(e) => setProductItems((prev) => {
            return {
              ...prev,
              brand: e.target.value
            }
          })} 
        />
      </div>
      <div className="upload-button">
        <UploadButton
          endpoint="imageUploader"
          content={{
            button: productItems.image.name || "Upload Image",
          }}
          onClientUploadComplete={(res) => {            
            setProductItems((prev) => {
              return {
                ...prev, 
                image: {
                  name: res[0].name,
                  url: res[0].ufsUrl
                }
              }
            });
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <div className="single-input">
        <label htmlFor="description">Description*</label>
        <textarea
          placeholder="Enter description:"
          rows={5}
          name="description"
          id="description"
          value={productItems.description}
          onChange={(e) => setProductItems((prev) => {
            return {
              ...prev,
              description: e.target.value
            }
          })}
        ></textarea>
      </div>
      <div className="single-input">
        <label htmlFor="additionalInfo">Additional Information*</label>
        <textarea
          placeholder="Enter additional information:"
          rows={5}
          name="additionalInfo"
          id="additionalInfo"
          value={productItems.additionalInfo}
          onChange={(e) => setProductItems((prev) => {
            return {
              ...prev,
              additionalInfo: e.target.value
            }
          })}
        ></textarea>
      </div>
      <button className="rts-btn btn-primary">Add Product</button>
    </form>
  );
};

export default AddProduct;