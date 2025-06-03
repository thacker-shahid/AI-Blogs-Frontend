import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { usePostCommentMutation } from "../../../redux/features/comments/commentApi";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";
import { Toaster, toast } from "sonner";

export default function PostAComment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState();
  const { user } = useSelector((state) => state.auth);

  const [postComment] = usePostCommentMutation();
  const { refetch } = useFetchBlogByIdQuery(id, { skip: !id });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    const newComment = {
      comment: comment,
      user: user?._id,
      postId: id,
    };
    try {
      const response = await postComment(newComment).unwrap();
      toast.success("Comment posted successfully!", { action: { label: "X" } });
      setComment("");
      refetch();
    } catch (err) {
      toast.error("OOP's! Failed to post comment. Please try again.", {
        action: { label: "X" },
      });
    }
  };

  return (
    <div className="mt-8">
      <Toaster richColors position="top-right" />
      <h3 className="text-lg font-medium mb-8">Leave a comment here!</h3>
      {/* Form for comment */}
      <form onSubmit={handleSubmit} action="">
        <textarea
          name="text"
          id=""
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          cols="30"
          rows="10"
          placeholder="Comment about this post here..."
          className="w-full bg-bgPrimary focus:outline-none p-5 border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
        ></textarea>
        <div className="flex justify-center">
          <button
            type="submit"
            // className="w-full bg-slate-900 hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
            className="mt-5 mb-5 bg-slate-900 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-3 rounded-md w-2/4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
