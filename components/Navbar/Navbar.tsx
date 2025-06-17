import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="rts-header-nav-area-one header--sticky">
        <div className="container">
            <div className="row">
                <div className="nav-and-btn-wrapper">
                    <div className="nav-area">
                        <nav>
                            <ul className="parent-nav">
                                <li className="parent">
                                    <Link href="/products?category=1">Female</Link>
                                </li>
                                <li className="parent">
                                    <Link href="/products?category=2">Male</Link>
                                </li>
                                <li className="parent">
                                    <Link href="/products?category=3">Mother & Kid</Link>
                                </li>
                                <li className="parent">
                                    <Link href="/products?category=4">Households</Link>
                                </li>
                                <li className="parent">
                                    <Link href="/products?category=5">Furnitures</Link>
                                </li>
                                <li className="parent">
                                    <Link href="/products">All Products</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="right-btn-area">
                        <button className="rts-btn btn-primary">
                            Get 30% Discount Now
                            <span>Sale</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar