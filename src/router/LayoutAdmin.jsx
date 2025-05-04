import { Outlet } from "react-router-dom";

import HeaderAdmin from "../components/Header/HeaderAdmin";
import { SidebarUser } from "../components/SiderBar/SidebarUser";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SidebarAdmin } from "../components/SiderBar/SidebarAdmin";

function LayoutAdmin() {
  const { role } = useContext(AuthContext);

  return (
    <div className="relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow h-[45px]">
        <HeaderAdmin />
      </header>

      <div className="flex pt-[45px]">
        {role === "ROLE_USER" ? <SidebarUser /> : <SidebarAdmin />}

        {/* Main Content */}
        <main className="flex-1 min-h-screen bg-gray-50  ml-0 xl:ml-[16.6667%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default LayoutAdmin;
