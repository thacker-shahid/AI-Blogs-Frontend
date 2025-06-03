import { useState } from "react";
import { usePostFormMutation } from "../../redux/features/contactus/contactusApi";
import { Toaster, toast } from "sonner";

export default function contactus() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [textArea, setTextArea] = useState("");
  const [message, setMessage] = useState("");

  const [contactUsApi] = usePostFormMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message: textArea,
    };

    try {
      await contactUsApi(data).unwrap();
      setName("");
      setEmail("");
      setTextArea("");
      setMessage("");
      toast.success("Form submitted successfully!", { action: { label: "X" } });
    } catch (err) {
      toast.error("OOP's! Something went wrong.", { action: { label: "X" } });
      console.error(err);
      setMessage("Some error occured. Please try again");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-8 text-black dark:text-white dark:border-gray-600 border">
      <Toaster richColors position="top-right" />
      <h2 className="text-2xl font-semibold pt-5 flex justify-center">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto pt-8">
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3 border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
        />

        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3 border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
        />

        <textarea
          name="text"
          id=""
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          rows="5"
          placeholder="Enter your query here..."
          className="w-full bg-bgPrimary focus:outline-none p-5 border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
        ></textarea>
        {message && <div className={`text-red-500 text-xs`}>{message}</div>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-5 bg-slate-900 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-3 rounded-md w-2/4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
