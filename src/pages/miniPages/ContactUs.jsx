import { useState } from "react";
import { usePostFormMutation } from "../../redux/features/contactus/contactusApi";

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
      alert("Form submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage(err.data.message);
    }
  };

  return (
    <div className="max-w-3xl bg-white mx-auto p-8 mt-8">
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
          className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"
        />

        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"
        />

        <textarea
          name="text"
          id=""
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          rows="5"
          placeholder="Enter your query here..."
          className="w-full bg-bgPrimary focus:outline-none border p-5"
        ></textarea>
        {message && <div className={`text-red-500 text-xs`}>{message}</div>}
        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
