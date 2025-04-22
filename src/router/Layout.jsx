import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import left from "../assets/banner-thuecanho.jpg";
import right from "../assets/bds123_120_300.gif";

function Layout() {
  return (
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </header>

      {/* Banner bên trái */}
      <div className="fixed top-30 left-30 z-40 hidden xl:block ">
        <a href="/" target="_blank" rel="nofollow">
          <img src={left} alt="banner left" className="w-[120px] h-[300px]" />
        </a>
      </div>
      <main className="pt-25 px-[140px]">
        <Outlet />
      </main>

      {/* Banner bên phải */}
      <div className="fixed top-30 right-30 z-40 hidden xl:block">
        <a href="/" target="_blank" rel="nofollow">
          <img src={right} alt="banner right" className="w-[120px] h-[300px]" />
        </a>
      </div>
    </div>
  );
}

export default Layout;
