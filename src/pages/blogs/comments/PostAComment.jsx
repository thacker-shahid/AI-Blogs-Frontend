import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { usePostCommentMutation } from "../../../redux/features/comments/commentApi";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";


export default function PostAComment(){
    
    const navigate = useNavigate();
    const {id} = useParams();
    const [comment, setComment] = useState();
    const {user} = useSelector((state)=>state.auth);

    const [postComment] = usePostCommentMutation();
    const {refetch} = useFetchBlogByIdQuery(id, {skip: !id});

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!user){
            navigate('/login');
            return;
        }
        const newComment = {
            comment: comment,
            user: user?._id,
            postId: id
        }
        try{
            const response = await postComment(newComment).unwrap();
            alert('Comment posted successfully');
            setComment('');
            refetch();
        } catch(err){
            console.log(err);
        }
    }
    
    return(
        <div className="mt-8">
            <h3 className="text-lg font-medium mb-8">Leave a comment here!</h3>
            {/* Form for comment */}
            <form onSubmit={handleSubmit} action="">
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