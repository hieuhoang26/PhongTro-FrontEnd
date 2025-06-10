import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import _ from "lodash";
import { SearchBox } from "@mapbox/search-js-react";
import "mapbox-gl/dist/mapbox-gl.css";

import { postApi } from "../../api/post";
import { MAPBOX_TOKEN } from "../../utils/mapbox";
import { categories } from "../../utils/contant";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

mapboxgl.accessToken = MAPBOX_TOKEN;

export const MapBox = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [typeId, setTypeId] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [105.8, 21.03],
      zoom: 12,
    });
  }, []);

  const isImageUrl = (url) => {
    return url && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    posts.forEach((post) => {
      const popupContent = document.createElement("a");
      popupContent.href = `/detail/${post.id}`;
      popupContent.target = "_blank";
      popupContent.className = "block cursor-pointer no-underline w-full";

      const getImage = (displayIndex) => {
        // Lọc ra các URL là ảnh
        const imageUrls = post.images?.filter((url) => isImageUrl(url)) || [];
        return imageUrls[displayIndex] || "/placeholder-image.jpg";
      };

      popupContent.innerHTML = `
    <div class="w-[200px]">
      <div class="rounded-lg shadow-lg overflow-hidden bg-white">
        <img src="${getImage(0)}" alt="${
        post.title
      }" class="w-full h-32 object-cover" />
        <div class="p-3">
          <div class="font-semibold text-base text-gray-800 truncate mb-1">${
            post.title
          }</div>
          <div class="font-semibold text-red-500 text-sm mb-1">${post.price.toLocaleString()} VNĐ</div>
          <div class="text-gray-500 text-xs truncate">${post.address}</div>
        </div>
      </div>
    </div>
  `;

      // Tạo một div custom cho marker (hiển thị giá)
      const markerEl = document.createElement("div");
      markerEl.className = "price-marker";
      markerEl.innerHTML = `
    <div class="price-marker-content bg-white rounded-full flex items-center justify-center h-8 w-20 shadow-md border border-gray-200">
      <span class="text-xs font-bold text-black-600">${formatPrice(
        post.price
      )}</span>
    </div>
  `;
      // Tạo custom marker thay vì dùng marker mặc định
      const marker = new mapboxgl.Marker({
        element: markerEl,
        anchor: "bottom", // Đặt anchor ở dưới để popup hiển thị phía trên
      })
        .setLngLat([post.longitude, post.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 10 }) // Giảm offset để popup gần marker hơn
            .setDOMContent(popupContent)
        )
        .addTo(mapRef.current);

      // Mở popup khi click vào marker giá
      markerEl.addEventListener("click", (e) => {
        e.preventDefault();
        marker.togglePopup();
      });
      markersRef.current.push(marker);
    });
  }, [posts]);

  // Gọi API khi di chuyển map
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const fetchNearby = async (lat, lon, typeId) => {
      try {
        const res = await postApi.getNearby(lat, lon, typeId);
        setPosts(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching nearby posts:", error);
      }
    };

    const debouncedFetch = _.debounce((center) => {
      fetchNearby(center.lat, center.lng, typeId);
    }, 500);

    const handleMoveEnd = () => {
      const center = map.getCenter();
      debouncedFetch(center);
    };

    map.on("moveend", handleMoveEnd);
    return () => map.off("moveend", handleMoveEnd);
  }, [typeId]);

  // Tìm kiem địa điểm
  const handleSearch = async () => {
    if (!selectedLocation) return;

    const lat = selectedLocation?.properties?.coordinates?.latitude;
    const lon = selectedLocation?.properties?.coordinates?.longitude;
    if (!lat || !lon) return;

    try {
      setIsLoading(true);
      const res = await postApi.getNearby(lat, lon, typeId);
      setPosts(res?.data?.data || []);
      mapRef.current.flyTo({ center: [lon, lat], zoom: 14 });
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-xl shadow-xl space-y-2 w-80">
        <div className="flex items-center">
          <Link to={"/"}>
            <IoArrowBack className="text-gray-500 hover:text-gray-700 text-xl mr-2" />
          </Link>
          <h2 className="text-base font-semibold text-gray-700">
            Tìm địa điểm
          </h2>
        </div>
        <SearchBox
          accessToken={mapboxgl.accessToken}
          onRetrieve={(res) => setSelectedLocation(res.features[0])}
          placeholder="Nhập địa điểm..."
        />
        <select
          value={typeId}
          onChange={(e) => setTypeId(Number(e.target.value))}
          className="border border-gray-300 px-3 py-2 rounded w-full mt-2 text-sm"
        >
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {isLoading ? "Đang tìm..." : "Tìm kiếm"}
        </button>
      </div>

      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};
function formatPrice(price) {
  if (price >= 1000000) {
    const million = price / 1000000;
    // Làm tròn 1 chữ số thập phân nếu cần
    return million % 1 === 0
      ? `${million} triệu`
      : `${million.toFixed(1)} triệu`;
  } else if (price >= 1000) {
    return `${Math.round(price / 1000)} nghìn`;
  }
  return price.toString();
}
