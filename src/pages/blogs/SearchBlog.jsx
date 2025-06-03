export default function SearchBlog({
  search,
  handleSearchChange,
  handleSearch,
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        placeholder="search any blog here..."
        className="w-full bg-bgPrimary focus:outline-none px-5 py-3 mr-5 border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
      />
      <button
        onClick={handleSearch}
        className="border bg-[#1E73BE] px-4 py-2 text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900"
      >
        Search
      </button>
    </div>
  );
}
