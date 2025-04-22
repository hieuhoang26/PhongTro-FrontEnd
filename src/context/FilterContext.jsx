import { createContext, useContext, useState, useEffect } from "react";
import { locationApi } from "../api/location";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [type, setType] = useState("Phòng trọ");
  const [price, setPrice] = useState("ALL");
  const [area, setArea] = useState("ALL");
  const [amenities, setAmenities] = useState([]);
  // selected
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  // list
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  // Fetch cities on mount
  useEffect(() => {
    locationApi.getCities().then((res) => setListCity(res.data));
  }, []);

  // Fetch districts when city changes
  useEffect(() => {
    if (city) {
      locationApi.getDistricts(city).then((res) => {
        setListDistrict(res.data);
        setDistrict("");
        setListWard([]);
        setWard("");
      });
    } else {
      setListDistrict([]);
      setDistrict("");
      setListWard([]);
      setWard("");
    }
  }, [city]);

  // Fetch wards when district changes
  useEffect(() => {
    if (district) {
      locationApi.getWards(district).then((res) => {
        setListWard(res.data);
        setWard("");
      });
    } else {
      setListWard([]);
      setWard("");
    }
  }, [district]);

  const resetFilter = () => {
    setType("Phòng trọ");
    setPrice("ALL");
    setArea("ALL");
    setAmenities([]);
    setCity("");
    setDistrict("");
    setWard("");
  };

  return (
    <FilterContext.Provider
      value={{
        // State
        type,
        price,
        area,
        amenities,
        city,
        district,
        ward,
        listCity,
        listDistrict,
        listWard,
        // Setters
        setType,
        setPrice,
        setArea,
        setAmenities,
        setCity,
        setDistrict,
        setWard,
        // Actions
        resetFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
