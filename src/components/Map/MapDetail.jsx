import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import MAPBOX_TOKEN from "../../utils/mapbox";

mapboxgl.accessToken = MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapboxgl.accessToken });

export const MapDetail = ({ address }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lngLat, setLngLat] = useState(null);

  useEffect(() => {
    if (!address) return;

    geocodingClient
      .forwardGeocode({
        query: address,
        limit: 1,
      })
      .send()
      .then((response) => {
        const match = response.body.features[0];
        if (match) {
          setLngLat(match.center);
        }
      });
  }, [address]);

  useEffect(() => {
    if (!lngLat || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: lngLat,
      zoom: 14,
    });

    new mapboxgl.Marker().setLngLat(lngLat).addTo(map.current);
  }, [lngLat]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[300px] bg-gray-100 rounded-lg shadow"
    />
  );
};
