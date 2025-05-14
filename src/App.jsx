import { useState } from "react";

import "./App.css";
import { router } from "./router/route";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Slide, ToastContainer } from "react-toastify";
import { FilterProvider } from "./context/FilterContext";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </FilterProvider>
    </AuthProvider>
  );
}

export default App;
