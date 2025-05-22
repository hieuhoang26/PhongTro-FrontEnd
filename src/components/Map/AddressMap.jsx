// components/AddressMap.jsx
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { MAPBOX_TOKEN } from "../../utils/mapbox";

mapboxgl.accessToken = MAPBOX_TOKEN;

const DEFAULT_COORDS = [105.8342, 21.0278];

const AddressMap = ({ fullAddress, setValue }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    // Khởi tạo map 1 lần
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: DEFAULT_COORDS,
        zoom: 12,
      });

      marker.current = new mapboxgl.Marker()
        .setLngLat(DEFAULT_COORDS)
        .addTo(map.current);
    }
  }, [setValue]);

  useEffect(() => {
    if (!fullAddress) return;

    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            fullAddress
          )}.json`,
          {
            params: {
              access_token: mapboxgl.accessToken,
              limit: 1,
              language: "vi",
              country: "VN",
            },
          }
        );

        const [lng, lat] = response.data.features[0].center;

        // Cập nhật vào form
        setValue("latitude", lat);
        setValue("longitude", lng);

        // if (!map.current) {
        //   map.current = new mapboxgl.Map({
        //     container: mapContainer.current,
        //     style: "mapbox://styles/mapbox/streets-v11",
        //     center: [lng, lat],
        //     zoom: 15,
        //   });

        //   marker.current = new mapboxgl.Marker()
        //     .setLngLat([lng, lat])
        //     .addTo(map.current);
        // } else {
        //   map.current.flyTo({ center: [lng, lat], zoom: 15 });
        //   marker.current.setLngLat([lng, lat]);
        map.current.flyTo({ center: [lng, lat], zoom: 15 });
        marker.current.setLngLat([lng, lat]);
        // }
      } catch (error) {
        console.error("Lỗi lấy toạ độ:", error);
      }
    };

    fetchCoordinates();
  }, [fullAddress]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] rounded-lg border shadow"
    />
  );
};

export default AddressMap;
