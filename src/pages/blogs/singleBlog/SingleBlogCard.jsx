import EditorJSHTML from "editorjs-html";
// require("dotenv").config();

const editorJSHTML = EditorJSHTML();

export default function SingleBlogCard({ blog }) {
  const {
    title,
    description,
    content,
    coverImg,
    category,
    rating,
    author,
    createdAt,
  } = blog || {};

  const htmlContent = editorJSHTML.parse(content).join("");

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="container mx-auto p-8 mt-8 text-primary dark:text-white dark:border-gray-600 border">
        {/* Author header */}
        <div>
          <h1 className="md:text-4xl text-3xl font-medium mb-4">{title}</h1>
          <p className="mb-6 flex items-center gap-2 text-gray-500">
            {formatDate(createdAt)} {"   "} by
            <span className="text-blue-400 cursor-pointer">Admin</span>
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
              {category}
            </span>
          </p>
        </div>
        {/* Blog Cover Image */}
        <div>
          <img
            src={coverImg}
            alt="image"
            className="w-full md:h-[520px] bg-cover"
          />
        </div>
        {/* Blog Details */}
        <div className="mt-8">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="space-y-3 editorjsdiv"
          />
          <div className="mt-8">
            <span className="text-large font-medium">Rating: </span>
            <span>{rating} (based on 2,346 reviews)</span>
          </div>
        </div>
      </div>
    </>
  );
}
