import { Link } from "react-router-dom";
import { useFetchBlogsQuery } from "../../redux/features/blogs/blogsApi";
import SearchBlog from "./SearchBlog";
import { useState } from "react";

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState({
    search: "",
    category: "",
    location: "",
  });
  let [page, setPage] = useState(1);
  const pageSize = 4;

  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setQuery({ search, category, location });
  };

  const handlePrevious = () => {
    page = page - 1;
    setPage(page);
  };

  const handleNext = () => {
    page = page + 1;
    setPage(page);
  };

  return (
    <div className="mt-16 container mx-auto">
      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error fetching blogs: {error.toString()}</div>}
      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-8">
        {blogs.slice((page - 1) * pageSize, page * pageSize).map((blog) => {
          return (
            <Link to={`blogs/${blog._id}`} key={blog._id}>
              <img src={blog.coverImg} alt="" className="h-80 w-full" />
              <h2>{blog.title}</h2>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-between mt-8">
        <button
          disabled={page <= 1}
          onClick={handlePrevious}
          className="border bg-[#1E73BE] text-xl font-medium px-4 py-2 rounded shadow text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900"
        >
          &larr; Previous
        </button>
        <button
          onClick={handleNext}
          disabled={page >= Math.ceil(blogs.length / pageSize)}
          className="border bg-[#1E73BE] text-xl font-medium px-4 py-2 rounded shadow text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
