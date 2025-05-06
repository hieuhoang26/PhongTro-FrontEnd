import { createContext, useContext, useState, useEffect } from "react";
import { locationApi } from "../api/location";
import { postApi } from "../api/post";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [type, setType] = useState();
  const [price, setPrice] = useState("ALL");
  const [area, setArea] = useState("ALL");
  const [amenities, setAmenities] = useState([]);
  // selected
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const [filterParams, setFilterParams] = useState({
    cityId: null,
    districtId: null,
    wardId: null,
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    typeId: null,
    categoryIds: [],
    page: 0,
    size: 3,
    isVip: null,
    sortBy: "isVip",
    sortDirection: "desc",
  });
  // console.log("filterParams", filterParams);

  useEffect(() => {
    const newFilterParams = {
      cityId: city || null,
      districtId: district || null,
      wardId: ward || null,
      typeId: type || null,
      categoryIds: amenities.length ? amenities.join(",") : null,
      page: 0,
      size: 3,
      isVip: null,
      sortBy: "isVip",
      sortDirection: "desc",
    };

    // Xử lý price
    if (price !== "ALL") {
      const [min, max] = price.split("-").map(Number);
      newFilterParams.minPrice = min || null;
      newFilterParams.maxPrice = max || null;
    }

    // Xử lý area
    if (area !== "ALL") {
      const [minArea, maxArea] = area.split("-").map(Number);
      newFilterParams.minArea = minArea || null;
      newFilterParams.maxArea = maxArea || null;
    }

    // Nếu district chọn ALL hoặc rỗng → xóa districtId, wardId
    if (!district || district === "ALL") {
      newFilterParams.districtId = null;
      newFilterParams.wardId = null;
    } else if (!ward || ward === "ALL") {
      newFilterParams.wardId = null;
    }

    setFilterParams(newFilterParams);
    // fetchPosts();
    // fetchPosts(newFilterParams);
  }, [type, price, area, amenities, city, district, ward]);

  useEffect(() => {
    fetchPosts(filterParams);
  }, [filterParams]);

  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await postApi.filter({
        ...filterParams,
        ...params,
      });
      setPostsData(response.data.data.items);
      setTotalPages(response.data.data.total);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // list
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  // Fetch cities on mount
  useEffect(() => {
    locationApi.getCities().then((res) => setListCity(res.data));
  }, []);

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
    // setType("Phòng trọ");
    // setPrice("ALL");
    // setArea("ALL");
    // setAmenities([]);
    // setCity("");
    // setDistrict("");
    // setWard("");
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
        postsData,
        loading,
        totalPages,
        fetchPosts,
        filterParams,
        setFilterParams,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
