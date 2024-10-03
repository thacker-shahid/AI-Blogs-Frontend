import { Link, useParams } from "react-router-dom";
import { useFetchRelatedBlogsQuery } from "../../../redux/features/blogs/blogsApi";

export default function RelatedBlogs(){
    
    const {id} = useParams();
    const {data: blogs=[], error, isLoading} = useFetchRelatedBlogsQuery(id);
    console.log("related Blgs are ",blogs);

    return (
        <div>
            <h3 className="text-2xl font-medium pt-8 px-8 pb-5">Reated Blogs:</h3>
            <hr />
            {
                blogs.length>0 ? ( 
                    <div className="mt-5 space-y-4">
                        {
                            blogs.map((blog) => (
                                <Link to={`/blogs/${blog._id}`} key={blog.id} className="flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm px-8 py-4">
                                    <div  className="size-14"> 
                                        <img src={blog.coverImg} alt="blog cover" className="w-full h-full rounded-full ring-1 ring-blue-700" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-[#1E73BE]">{blog?.title.substring(0, 50)}</h4>
                                        <p>{blog?.description.substring(0, 50)}...</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                ) : ( <div className="p-8">No Related Blogs found:</div> )
            }
        </div>
    )
}