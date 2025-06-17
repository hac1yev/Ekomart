import ProductSidebar from "@/components/Products/ProductSidebar";
import ProductsMain from "@/components/Products/ProductsMain";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const ProductsPage = () => {
    return (
        <>
            <div className="rts-navigation-area-breadcrumb bg_light-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="navigator-breadcrumb-wrapper">
                                <Link href="/">Home</Link>
                                <ChevronRight width={18} />
                                <Link className="current" href="/login">Products</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-seperator bg_light-1">
                <div className="container">
                    <hr className="section-seperator" />
                </div>
            </div>

            <div className="shop-grid-sidebar-area rts-section-gap">
                <div className="container">
                    <div className="row g-0">
                        <ProductSidebar />
                        <ProductsMain />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;