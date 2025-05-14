import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { SearchBox } from "@mapbox/search-js-react";
import "mapbox-gl/dist/mapbox-gl.css";
import MAPBOX_TOKEN from "../../utils/mapbox";
import { postApi } from "../../api/post";

mapboxgl.accessToken = MAPBOX_TOKEN;

export const MapBox = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [typeId, setTypeId] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [posts, setPosts] = useState([]);

  console.log(selectedLocation);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [105.8, 21.03],
      zoom: 12,
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    posts.forEach((post) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([post.longitude, post.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="text-sm">
              <div class="font-semibold">${post.title}</div>
              <div>${post.price} VNĐ</div>
              <div>${post.detailAddress}</div>
            </div>
          `)
        )
        .addTo(mapRef.current);
    });
  }, [posts]);

  const handleSearch = async () => {
    if (!selectedLocation) return;
    const lat = selectedLocation?.properties.coordinates?.latitude;
    const lon = selectedLocation?.properties.coordinates?.longitude;
    console.log(lat, lon);

    const res = await postApi.getNearby(lat, lon, typeId);
    // const data = await res;
    console.log(res?.data?.data);
    setPosts(res?.data?.data);
    mapRef.current.flyTo({ center: [lon, lat], zoom: 14 });
  };

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-xl shadow-xl space-y-2 w-80">
        <SearchBox
          accessToken={mapboxgl.accessToken}
          onRetrieve={(res) => setSelectedLocation(res.features[0])}
          placeholder="Nhập địa điểm..."
        />
        <select
          value={typeId}
          onChange={(e) => setTypeId(Number(e.target.value))}
          className="border px-3 py-2 rounded w-full"
        >
          <option value={1}>Tìm phòng</option>
          <option value={2}>Chính chủ</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Tìm kiếm
        </button>
      </div>

      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};
