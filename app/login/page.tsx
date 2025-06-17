import LoginForm from "@/components/Login/LoginForm";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
    return (
        <>
            <div className="rts-navigation-area-breadcrumb bg_light-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="navigator-breadcrumb-wrapper">
                                <Link href="/">Home</Link>
                                <ChevronRight width={18} />
                                <Link className="current" href="/login">Login</Link>
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

            <LoginForm />
        </>
    );
};

export default LoginPage;