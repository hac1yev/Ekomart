"use client";

import { tabs } from "@/public/demo/profileSidebarLinksData";
import axios from "axios";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

const SidebarLinks = () => {
  const [activeTab, setActiveTab] = useState("/profile");
  const pathname = usePathname();

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const handleLogOut = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await axios.post("/api/logout");
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <div className="nav accout-dashborard-nav flex-column nav-pills me-3">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={activeTab === tab.href ? "nav-link active" : "nav-link"}
          aria-current={activeTab === tab.href ? "page" : undefined}
        >
          <tab.icon width={18} /> {tab.label}
        </Link>
      ))}
      <button className="nav-link" type="button" onClick={handleLogOut}>
        <LogOut width={18} />
        Log out
      </button>
    </div>
  );
};

export default SidebarLinks;
