import { BsHouseDoor, BsHouses } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiBuildingApartment } from "react-icons/pi";
import { IoStorefrontOutline } from "react-icons/io5";

export const categories = [
  { id: 1, label: "Phòng trọ", icon: <BsHouses /> },
  { id: 2, label: "Nhà riêng", icon: <BsHouseDoor /> },
  { id: 3, label: "Căn hộ chung cư", icon: <PiBuildingApartment /> },
  { id: 4, label: "Căn hộ mini", icon: <PiBuildingApartment /> },
  { id: 5, label: "Căn hộ dịch vụ", icon: <PiBuildingApartment /> },
  { id: 6, label: "Ở ghép", icon: <AiOutlineUsergroupAdd /> },
  { id: 7, label: "Mặt bằng", icon: <IoStorefrontOutline /> },
];
export const priceRanges = [
  { label: "Tất cả", value: "ALL" },
  { label: "Dưới 1 triệu", value: "0-1000000" },
  { label: "1 - 2 triệu", value: "1000000-2000000" },
  { label: "2 - 3 triệu", value: "2000000-3000000" },
  { label: "3 - 5 triệu", value: "3000000-5000000" },
  { label: "5 - 7 triệu", value: "5000000-7000000" },
  { label: "7 - 10 triệu", value: "7000000-10000000" },
  { label: "10 - 15 triệu", value: "10000000-15000000" },
  { label: "Trên 15 triệu", value: "15000000-" },
];
export const areaRanges = [
  { label: "Tất cả", value: "ALL" },
  { label: "Dưới 20m2", value: "0-20" },
  { label: "Từ 20m2 - 30m2", value: "20-30" },
  { label: "Từ 30m2 - 50m2", value: "30-50" },
  { label: "Từ 50m2 - 70m2", value: "50-70" },
  { label: "Từ 70m2 - 90m2", value: "70-90" },
  { label: "Trên 90m2", value: "90-" },
];

export const amenitiesList = [
  { id: 1, label: "Đầy đủ nội thất" },
  { id: 2, label: "Có gác" },
  { id: 3, label: "Có kệ bếp" },
  { id: 4, label: "Có máy lạnh" },
  { id: 5, label: "Có máy giặt" },
  { id: 6, label: "Có tủ lạnh" },
  { id: 7, label: "Có thang máy" },
  { id: 8, label: "Không chung chủ" },
  { id: 9, label: "Giờ giấc tự do" },
  { id: 10, label: "Có bảo vệ 24/24" },
  { id: 11, label: "Có hầm để xe" },
];
export const cityHomePage = [
  {
    src: "https://phongtro123.com/images/location_hcm.jpg",
    alt: "Phòng trọ Hồ Chí Minh",
    label: " Hồ Chí Minh",
  },
  {
    src: "https://phongtro123.com/images/location_hn.jpg",
    alt: "Phòng trọ Hà Nội",
    label: "Hà Nội",
  },
  {
    src: "https://phongtro123.com/images/location_dn.jpg",
    alt: "Phòng trọ Đà nẵng",
    label: "Đà Nẵng",
  },
];
