import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../Common/header/header";
import Footer from "../../Common/footer/footer";
import HisoryFormat from "./history";

export default function OrderHistoryPages() {
  const [, setUserData] = useState(null);
  const [, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userDataFromStorage = sessionStorage.getItem("userData");
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <aside className="w-64 bg-gray-800 text-white border-r border-gray-700">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center text-white">
                Thông tin cá nhân
              </h1>
            </div>
            <nav className="mt-6">
              <ul>
                <li>
                  <Link
                    to={"/reality3d/profile-page"}
                    className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
                  >
                    Thông tin
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/reality3d/history-page"}
                    className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
                  >
                    Lịch sử mua hàng
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipment-tracking"
                    className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
                  >
                    Xem đơn hàng
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="block py-3 px-4 hover:bg-gray-700 transition duration-200"
                  >
                    Cài đặt
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 p-6 bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
              <h2 className="text-2xl font-bold text-center">
                Lịch sử đơn hàng
              </h2>
              <HisoryFormat />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}