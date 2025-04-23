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
      {/* 	≥ 1280px  */}
      {/* ≥ 1536px  */}
      {/* ≥ 1920px  */}

      <main
        className=" pt-24 px-4 max-w-full mx-auto  
        xl:max-w-[calc(100%-280px*2)]   
        2xl:max-w-[calc(100%-240px*2)]
        [@media(min-width:1920px)]:max-w-[calc(100%-400px*2)]"
      >
        <Outlet />
      </main>
      {/* Banner trái */}
      <div className="fixed top-30 xl:left-30 2xl:left-30 [@media(min-width:1920px)]:left-70 z-40 hidden xl:block">
        <a href="/" target="_blank" rel="nofollow">
          <img src={left} alt="banner left" className="w-[120px] h-auto" />
        </a>
      </div>

      {/* Banner phải */}
      <div className="fixed top-30  xl:right-8 2xl:right-30 [@media(min-width:1920px)]:right-70 z-40 hidden xl:block">
        <a href="/" target="_blank" rel="nofollow">
          <img src={right} alt="banner right" className="w-[120px] h-auto" />
        </a>
      </div>
    </div>
  );
}

export default Layout;
