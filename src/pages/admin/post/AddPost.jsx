import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { usePostBlogMutation } from "../../../redux/features/blogs/blogsApi";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useGetAiDataMutation } from "../../../redux/features/geminiai/ai.geminiAPI";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [coverImg, setcoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const [postBlog, { isLoading }] = usePostBlogMutation();
  const [getAiData] = useGetAiDataMutation();

  const { user } = useSelector((state) => state.auth);
  const editorRef = useRef(null);

  useEffect(() => {
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
    });

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await editorRef.current.save();
      const newPost = {
        title,
        coverImg,
        content,
        category,
        descripytion: metaDescription,
        author: user?._id,
        rating,
      };
      const response = await postBlog(newPost).unwrap();
      if (response) {
        toast.success("Blog post saved successfully", {
          action: { label: "X" },
        });
        navigate("/");
      }
    } catch (err) {
      setMessage("Failed to submit post. Please try again");
      toast.error("Failed to submit post. Please try again", {
        action: { label: "X" },
      });
    }
  };

  const handleGeminiAI = async () => {
    if (!title) {
      toast.error("Please add the title before using AI", {
        action: { label: "X" },
      });
      return;
    }

    const data = { title };

    try {
      const response = await getAiData(data).unwrap();
      if (response.success) {
        editorRef.current.clear();
        const paragraphs = response.result
          .split("\n")
          .filter((p) => p.trim() !== "");

        paragraphs.forEach((para) => {
          editorRef.current.blocks.insert("paragraph", { text: para.trim() });
        });

        toast.success("AI content added successfully", {
          action: { label: "X" },
        });
      }
    } catch (error) {
      console.error("Error fetching AI data:", error);
      toast.error("Failed to fetch AI content. Please try again", {
        action: { label: "X" },
      });
    }
  };

  return (
    <div className="bg-white md:p-8 p-2">
      <Toaster richColors position="top-right" />
      <h2 className="text-2xl font-semibold">Create a new blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        <div className="space-y-4">
          <label className="font-semibold text-xl">Blog Title</label>
          <input
            type="text"
            value={title}
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
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <p className="font-semibold text-xl mb-5 md:w-1/2 w-full">
                Content Section
              </p>
              <button
                type="button"
                onClick={handleGeminiAI}
                className="md:w-1/2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Write using AI
              </button>
            </div>
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
                value={coverImg}
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
                value={category}
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
                value={metaDescription}
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
                value={rating}
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
          Add new Blog
        </button>
      </form>
    </div>
  );
}
