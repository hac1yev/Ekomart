import { SearchIcon, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import MobileNav from "./MobileNav";
import MobileCategory from "./MobileCategory";

const Sidebar = ({ showMobileMenu, setShowMobileMenu }: { showMobileMenu: boolean, setShowMobileMenu: (value: boolean) => void }) => {  
  const [activeTab,setActiveTab] = useState("menu");

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={showMobileMenu ? "sidebarmenu-overlay show-overlay" : "sidebarmenu-overlay close-overlay"}>
      <div id="side-bar" className={showMobileMenu ? "side-bar header-two show" : "side-bar header-two close"}>
        <button className="close-icon-menu">
          <X width={35} onClick={() => setShowMobileMenu(false)} />
        </button>

        <form action="#" className="search-input-area-menu mt--30">
          <input type="text" placeholder="Search..." required />
          <button>
            <SearchIcon width={20} height={20} />
          </button>
        </form>

        <div className="mobile-menu-nav-area tab-nav-btn mt--20">
          <nav>
            <div className="nav nav-tabs" id="nav-tab">
              <button
                className={activeTab === "menu" ? "nav-link active" : "nav-link"}
                type="button"
                onClick={() => handleClick("menu")}
              >
                Menu
              </button>
              <button
                className={activeTab === "category" ? "nav-link active" : "nav-link"}
                type="button"
                onClick={() => handleClick("category")}
              >
                Category
              </button>
            </div>
          </nav>

          <div>
            <div
              className=""
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              tab-index={0}
            >
              {activeTab === "menu" && <MobileNav />}
            </div>
            <div
              className=""
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tab-index={0}
            >
              {activeTab === "category" && <MobileCategory />}
            </div>
          </div>
        </div>

        <div className="button-area-main-wrapper-menuy-sidebar">
          <div className="buton-area-bottom">
            <Link href="/" className="rts-btn btn-primary">
              Sign In
            </Link>
            <Link href="/" className="rts-btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;