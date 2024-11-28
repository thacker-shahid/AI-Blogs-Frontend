import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import {
  useFetchBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../../redux/features/blogs/blogsApi";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function UpdatePost() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [coverImg, setcoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const editorRef = useRef(null);

  const {
    data: blog = [],
    isError,
    isLoading,
    refetch,
  } = useFetchBlogByIdQuery(id);

  const [updateBlog] = useUpdateBlogMutation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (blog.post) {
      const editor = new EditorJS({
        holder: "editorjs",
        onReady: () => {
          editorRef.current = editor;
        },
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
        },
        data: blog.post.content,
      });

      return () => {
        editor.destroy();
        editorRef.current = null;
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await editorRef.current.save();
      const updatedPost = {
        title: title || blog.post.title,
        coverImg: coverImg || blog.post.coverImg,
        content: content || blog.post.content,
        category: category || blog.post.category,
        description: metaDescription || blog.post.description,
        author: user?._id,
        rating: rating || blog.post.rating,
      };
      const response = await updateBlog({ id, ...updatedPost }).unwrap();
      toast.success("Blog post updated successfully", {
        action: { label: "X" },
      });
      refetch();
      navigate("/");
    } catch (err) {
      console.log("Failed to submit post", err);
      setMessage("Failed to submit post. Please try again");
      toast.error("Failed to update blog post", { action: { label: "X" } });
    }
  };

  return (
    <div className="bg-white md:p-8 p-2">
      <Toaster richColors position="top-right" />
      <h2 className="text-2xl font-semibold">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        <div className="space-y-4">
          <label className="font-semibold text-xl">Blog Title</label>
          <input
            type="text"
            // value={title}
            defaultValue={blog?.post?.title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full inline-block border bg-[#f7f8f9] focus:outline-none px-5 py-3"
            placeholder="Enter blog title..."
            required
          />
        </div>

        {/* Blog Details */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* Left Side */}
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5">Content Section</p>
            <p className="text-xs italic">Write your blog post below...</p>
            <div id="editorjs"></div>
          </div>

          {/* Right Side */}
          <div className="md:w-1/3 w-full border p-5 space-y-5">
            <p className="text-xl font-semibold">Choose Blog Format</p>
            <div className="space-y-4">
              <label className="font-semibold text-xl">Blog Cover</label>
              <input
                type="text"
                // value={coverImg}
                defaultValue={blog?.post?.coverImg}
                onChange={(e) => setcoverImg(e.target.value)}
                className="w-full inline-block border bg-[#f7f8f9] focus:outline-none px-5 py-3"
                placeholder="https://www.unsplash.com/cover-photo1.png..."
                required
              />
            </div>

            <div className="space-y-4">
              <label className="font-semibold text-xl">Category</label>
              <input
                type="text"
                defaultValue={blog?.post?.category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full inline-block border bg-[#f7f8f9] focus:outline-none px-5 py-3"
                placeholder="technology/automobile/business..."
                required
              />
            </div>

            <div className="space-y-4">
              <label className="font-semibold">Meta Description</label>
              <textarea
                type="text"
                cols="4"
                rows="4"
                defaultValue={blog?.post?.description}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full inline-block bg-[#f7f8f9] border focus:outline-none px-5 py-3"
                placeholder="write your meta description..."
                required
              />
            </div>

            <div className="space-y-4">
              <label className="font-semibold">Rating</label>
              <input
                type="number"
                defaultValue={blog?.post?.rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full inline-block bg-[#f7f8f9] border focus:outline-none px-5 py-3"
                placeholder="Rating..."
                required
              />
            </div>

            <div className="space-y-4">
              <label className="font-semibold">Author</label>
              <input
                type="text"
                value={user.username}
                disabled
                className="w-full inline-block bg-[#f7f8f9] border focus:outline-none px-5 py-3"
                placeholder="write your meta description..."
                required
              />
            </div>
          </div>
        </div>

        {message && <p className="text-red-500">{message}</p>}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full mt-5 bg-slate-900 hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
