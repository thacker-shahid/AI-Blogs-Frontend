import { useSelector } from "react-redux";
import commentorIcon from "../../../assets/commentorIcon.jpg";
import PostAComment from "./PostAComment";
export default function CommentCard({ comments }) {
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container mx-auto p-8 my-6 mt-8 text-primary dark:text-white dark:border-gray-600 border">
      {/* Comment Input Here */}
      <PostAComment />
      <div>
        {comments ? (
          <div>
            <h3 className="text-lg font-medium mt-8">All Comments</h3>
            <div>
              {comments.map((comment, index) => (
                <div key={index} className="mt-4">
                  <div className="flex gap-4 items-center">
                    <img src={commentorIcon} alt="comment" className="h-14" />
                    <div>
                      <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                        {comment?.user?.username}
                      </p>
                      <p className="text-[12px] italic">
                        {formatDate(comment?.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Comments Details */}
                  <div className="dark:text-white dark:border-gray-600 text-gray-600 mt-5 border p-8">
                    <p className="md:w-4/5">{comment?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="font-medium text-lg my-8">No comments found!</div>
        )}
      </div>
    </div>
  );
}
