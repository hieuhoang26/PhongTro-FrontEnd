import React, { useEffect, useState } from "react";
import axios from "axios";
import { reportApi } from "../../../api/report";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import { postApi } from "../../../api/post";

export const ReportManager = () => {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await reportApi.getList();
      console.log("Reported posts:", res.data.data);
      setReportedPosts(res.data.data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  };

  const handleApprove = async (postId) => {
    try {
      // await postApi.changeStatus(postId, JSON.stringify("APPROVED"));
      await postApi.changeStatus(postId, { status: "APPROVED" });
      fetchReports();
    } catch (error) {
      console.error("Failed to approve:", error);
    }
  };

  const handleReject = async (postId) => {
    try {
      // await postApi.changeStatus(postId, JSON.stringify("REJECTED"));
      await postApi.changeStatus(postId, { status: "REJECTED" });
      fetchReports();
    } catch (error) {
      console.error("Failed to reject:", error);
    }
  };

  return (
    <div className=" relative">
      <div className="sticky top-[45px] bg-white shadow-sm py-4 px-5 z-10">
        <div className="flex">
          <h1 className="text-2xl font-semibold whitespace-nowrap mb-1">
            Danh sách báo xấu
          </h1>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="overflow-x-auto rounded-lg shadow-md ">
          <table className="min-w-full table-auto text-sm text-left text-gray-700 bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-900 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200">ID</th>
                <th className="px-6 py-3 border-b border-gray-200">Title</th>
                <th className="px-6 py-3 border-b border-gray-200">Reports</th>
                <th className="px-6 py-3 border-b border-gray-200">Status</th>
                <th className="px-6 py-3 border-b border-gray-200 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reportedPosts.map((post, index) => (
                <tr
                  key={post.postId}
                  className={`border-b border-gray-200 transition duration-200 ease-in-out ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <td className="px-6 py-4">{post.postId}</td>
                  <td className="px-6 py-4 font-medium">{post.title}</td>
                  <td className="px-6 py-4">{post.reportCount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        post.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : post.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-4 text-lg text-gray-600">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="hover:text-blue-600"
                      title="View Reports"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleApprove(post.postId)}
                      className="hover:text-green-600"
                      title="Approve Post"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleReject(post.postId)}
                      className="hover:text-red-600"
                      title="Reject Post"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              Reports for: {selectedPost.title}
            </h3>
            <ul className="space-y-4">
              {selectedPost.reports.map((report, index) => (
                <li
                  key={index}
                  className="border p-3 rounded shadow-sm bg-gray-50"
                >
                  <div className="font-semibold">
                    {report.userName} (ID: {report.userId})
                  </div>
                  <div className="text-sm text-gray-600">{report.reason}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(report.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
