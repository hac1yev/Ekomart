import Image from 'next/image';
import payment from '../../public/images/payment/01.png';
import Link from 'next/link';
import { Facebook, Instagram, Phone, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <div className="rts-footer-area pt--80 bg_light-1">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="footer-main-content-wrapper pb--70 pb_sm--30">
                        <div className="single-footer-wized">
                            <h3 className="footer-title">About Company</h3>
                            <div className="call-area">
                                <div className="icon">
                                    <Phone />
                                </div>
                                <div className="info">
                                    <span>Have Question? Call Us 24/7</span>
                                    <Link href="#" className="number">+258 3692 2569</Link>
                                </div>
                            </div>
                            <div className="opening-hour">
                                <div className="single">
                                    <p>Monday - Friday: <span>8:00am - 6:00pm</span></p>
                                </div>
                                <div className="single">
                                    <p>Saturday: <span>8:00am - 6:00pm</span></p>
                                </div>
                                <div className="single">
                                    <p>Sunday: <span>Service Close</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="single-footer-wized">
                            <h3 className="footer-title">Our Stores</h3>
                            <div className="footer-nav">
                                <ul>
                                    <li><Link href="#">Delivery Information</Link></li>
                                    <li><Link href="#">Privacy Policy</Link></li>
                                    <li><Link href="#">Terms & Conditions</Link></li>
                                    <li><Link href="#">Support Center</Link></li>
                                    <li><Link href="#">Careers</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="single-footer-wized">
                            <h3 className="footer-title">Shop Categories</h3>
                            <div className="footer-nav">
                                <ul>
                                    <li><Link href="#">Contact Us</Link></li>
                                    <li><Link href="#">Information</Link></li>
                                    <li><Link href="#">About Us</Link></li>
                                    <li><Link href="#">Careers</Link></li>
                                    <li><Link href="#">Nest Stories</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="single-footer-wized">
                            <h3 className="footer-title">Useful Links</h3>
                            <div className="footer-nav">
                                <ul>
                                    <li><Link href="#">Cancellation & Returns</Link></li>
                                    <li><Link href="#">Report Infringement</Link></li>
                                    <li><Link href="#">Payments</Link></li>
                                    <li><Link href="#">Shipping</Link></li>
                                    <li><Link href="#">FAQ</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="single-footer-wized">
                            <h3 className="footer-title">Our Newsletter</h3>
                            <p className="disc-news-letter">
                                Subscribe to the mailing list to receive updates one <br /> the new arrivals and other discounts
                            </p>
                            <form className="footersubscribe-form" action="#">
                                <input type="email" placeholder="Your email address" required />
                                <button className="rts-btn btn-primary">Subscribe</button>
                            </form>

                            <p className="dsic">
                                I would like to receive news and special offer
                            </p>
                        </div>
                    </div>
                    <div className="social-and-payment-area-wrapper">
                        <div className="social-one-wrapper">
                            <span>Follow Us:</span>
                            <ul>
                                <li><Link href="#">
                                    <Facebook width={18} color='#b5b5b5' />
                                </Link></li>
                                <li><Link href="#">
                                    <Twitter width={18} color='#b5b5b5' />
                                </Link></li>
                                <li><Link href="#">
                                    <Youtube width={18} color='#b5b5b5' />
                                </Link></li>
                                <li><Link href="#">
                                    <Instagram width={18} color='#b5b5b5' />
                                </Link></li>
                            </ul>
                        </div>
                        <div className="payment-access">
                            <span>Payment Accepts:</span>
                            <Image width={300} height={20} src={payment} alt="payment" priority />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Footer;