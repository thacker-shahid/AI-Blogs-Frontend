import { useState } from "react";
import { FaBlog } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useFetchBlogsQuery } from "../../../redux/features/blogs/blogsApi";
import { useGetCommentQuery } from "../../../redux/features/comments/commentApi";
import { useGetUserQuery } from "../../../redux/features/auth/authApi";
import BlogsChart from "./BlogsChart";

export default function Dashboard() {
  const [query, setQuery] = useState({ search: "", category: "" });
  const { user } = useSelector((state) => state.auth);
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  const { data: comments = [] } = useGetCommentQuery();
  const { data: allUsers = [] } = useGetUserQuery();

  const adminCount = allUsers.users?.filter(
    (myAdmin) => myAdmin.role == "admin"
  );

  return (
    <>
      {isLoading && <div>Loading....</div>}
      <div className="space-y-6">
        <div className="bg-bgPrimary p-5">
          <h1>Hi, {user?.username} </h1>
          <p> Welcome to admin dashboard</p>
        </div>

        {/* cards grid */}
        <div className="flex flex-col md:flex-row gap-8 pt-8 justify-between ">
          <div className="bg-indigo-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center ">
            <FiUsers className="size-8 text-indigo-600" />
            <p>{allUsers?.users?.length}</p>
          </div>
          <div className="bg-red-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center ">
            <FaBlog className="size-8 text-red-600" />
            <p>{blogs?.length} Blogs</p>
          </div>
          <div className="bg-lime-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center ">
            <RiAdminLine className="size-8 text-lime-600" />
            <p>{adminCount?.length} Admins</p>
          </div>
          <div className="bg-orange-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center ">
            <FiUsers className="size-8 text-orange-600" />
            <p>{comments?.commentsCount} Comments</p>
          </div>
        </div>

        {/* graphs and charts */}
        <div className="pt-5 pb-5">
          <BlogsChart blogs={blogs} />
        </div>
      </div>
    </>
  );
}
