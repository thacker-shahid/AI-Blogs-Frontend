import { useState } from "react";
import { useParams } from "react-router-dom"

export default function PostAComment(){

    const {id} = useParams();
    const [comment, setComment] = useState();

    return(
        <div className="mt-8">
            <h3 className="text-lg font-medium mb-8">Leave a comment here!</h3>
            {/* Form for comment */}
            <form action="">
                <textarea 
                    name="text" 
                    id="" 
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    cols="30"
                    rows="10"
                    placeholder="Comment about this post here..."
                    className="w-full bg-bgPrimary focus:outline-none border p-5">
                </textarea>
                <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-500 text-white font-medium py-3 rounded-md">Submit</button>
            </form>
            {/* Submit button */}

        </div>
    )
}