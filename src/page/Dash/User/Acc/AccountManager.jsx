import React from "react";
import { AccountManagerNav } from "./AccountManagerNav";
import { PersonalInfo } from "./PersonalInfo";
import { ChangePassword } from "./ChangePassword";
import { ChangePhone } from "./ChangePhone";
import { Outlet } from "react-router-dom";

export const AccountManager = () => {
  return (
    <>
      <div className="relative">
        <AccountManagerNav />
        <div className="flex justify-center">
          <div className="w-full lg:w-4/6 mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
