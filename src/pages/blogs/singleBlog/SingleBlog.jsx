import { useParams } from "react-router-dom";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";
import SingleBlogCard from "./SingleBlogCard";
import CommentCard from "../comments/CommentCard";
import RelatedBlogs from "./RelatedBlog";

export default function SinglBlog() {
  const { id } = useParams();
  const { data: blog = [], error, isLoading } = useFetchBlogByIdQuery(id);

  return (
    <div className="text-primary container mx-auto mt-8">
      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something went wrong.</div>}
        {blog?.post && (
          <div className="flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8">
            <div className="lg:w-2/3 w-full">
              <SingleBlogCard blog={blog.post} />
              <CommentCard comments={blog?.comments} />
            </div>
            {/* <div className="bg-white lg:w-1/3 w-full"> */}
            <div className="container lg:w-1/3 p-8 my-6 mt-8 text-primary dark:text-white dark:border-gray-600 border">
              <RelatedBlogs />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
