import LocationModal from "../components/Filter/LocationModal";
import { FilterPage } from "../components/Filter/FilterPage";
import { areaRanges, cityHomePage, priceRanges } from "../utils/contant";
import PostItemNav from "../components/Item/PostItemNav";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PostCardV2 } from "../components/Item/PostCardV2";
import { PostCard } from "../components/Item/PostCard";
import { PostCardV3 } from "../components/Item/PostCardV3";
import { postApi } from "../api/post";
import { Pagination } from "../components/Pagination";
import { useFilter } from "../context/FilterContext";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { favorApi } from "../api/favor";

export default function SavedPost() {
  const [loading, setLoading] = useState(false);

  const { userId } = useContext(AuthContext);
  const [savedPosts, setSavedPosts] = useState([]);
  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        setLoading(true);
        if (userId) {
          const response = await favorApi.getListLike(userId);
          setSavedPosts(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, [userId]);

  // useEffect(() => {
  //   const fetchRecentPosts = async () => {
  //     try {
  //       // Replace with your actual API call for recent posts
  //       // const response = await postsApi.getRecentPosts();
  //       // setRegularPosts(response.data || []);
  //     } catch (error) {
  //       console.error("Error fetching recent posts:", error);
  //     }
  //   };

  //   fetchRecentPosts();
  // }, []);
  return (
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-screen-xl flex gap-6 px-4">
        {/* main */}
        <div className="w-7/10 ">
          <header className="mt-2 mb-3">
            <h1 className="text-2xl font-medium mb-2 leading-snug">
              Tin đã lưu
            </h1>
          </header>

          {/* posts */}

          {loading ? (
            <Spinner />
          ) : (
            <>
              {!userId ? (
                <div className="bg-white p-4 rounded shadow-sm">
                  Bạn cần đăng nhập để xem danh sách tin đã lưu
                </div>
              ) : savedPosts.length === 0 ? (
                <div className="bg-white p-4 rounded shadow-sm">
                  Bạn chưa lưu tin nào
                </div>
              ) : (
                savedPosts.map((item) => {
                  if (item.isVip === 5)
                    return <PostCardV3 key={item.id} post={item} />;
                  if (item.isVip === 4 || item.isVip == 3)
                    return <PostCardV2 key={item.id} post={item} />;
                  return <PostCard key={item.id} post={item} />;
                })
              )}
            </>
          )}
        </div>

        {/*  sidebar */}
        <div className="w-3/10 ">
          <div className="grid grid-cols-1  gap-2">
            <div className="bg-white border border-gray-300 p-4 rounded-xl shadow ">
              <div className="text-xl font-semibold mb-3">Tin mới đăng</div>

              <PostItemNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
