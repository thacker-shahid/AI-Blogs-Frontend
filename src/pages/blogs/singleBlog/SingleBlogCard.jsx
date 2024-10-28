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
      <div className="bg-white p-8">
        {/* Author header */}
        <div>
          <h1 className="md:text-4xl text-3xl font-medium mb-4">{title}</h1>
          <p className="mb-6">
            {formatDate(createdAt)} by{" "}
            <span className="text-blue-400 cursor-pointer">Admin 1</span>
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
