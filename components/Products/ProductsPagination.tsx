import { useTypedProductSelector } from '@/store/products-slice';
import Pagination from '@mui/material/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductsPagination = () => {
    const totalProducts = useTypedProductSelector(state => state.productReducer.totalProducts);
    const [pageCount,setPageCount] = useState(1);
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const router = useRouter();

    const handleChangePagination = (e: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", `${value}`);
        router.push(`/products?${params}`);
    }

    useEffect(() => {
        if(totalProducts) {
            setPageCount(Math.ceil(totalProducts / 12));
        }
        if(totalProducts === 0) {
            setPageCount(1);
        }
    }, [totalProducts]);
    
    return (
        <Pagination 
            count={pageCount} 
            page={page}
            onChange={handleChangePagination}
            className='products-pagination'
        />
    );
};

export default ProductsPagination;