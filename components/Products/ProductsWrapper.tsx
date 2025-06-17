"use client";

import { Suspense } from 'react';
import ProductSidebar from './ProductSidebar';
import ProductsMain from './ProductsMain';

const ProductsWrapper = () => {
    return (
        <div className="container">
            <div className="row g-0">
                <Suspense>
                    <ProductSidebar />
                    <ProductsMain />
                </Suspense>
            </div>
        </div>
    );
};

export default ProductsWrapper;