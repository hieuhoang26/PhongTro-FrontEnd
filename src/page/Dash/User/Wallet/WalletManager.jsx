import React from "react";
import { WalletNav } from "./WalletNav";
import { Outlet } from "react-router-dom";

const WalletManager = () => {
  return (
    <>
      <div className="relative">
        <WalletNav />
        <div className="flex justify-center">
          <div className="w-full lg:w-4/6 mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletManager;
