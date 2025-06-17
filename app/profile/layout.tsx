import SidebarLinks from "@/components/Profile/SidebarLinks";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href="/">Home</Link>
                <ChevronRight width={18} />
                <Link className="current" href="/login">
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="account-tab-area-start rts-section-gap">
        <div className="container-2">
          <div className="row">
            <div className="col-lg-3">
              <SidebarLinks />
            </div>
            <div className="col-lg-9 pt_md--30 pt_sm--30">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
