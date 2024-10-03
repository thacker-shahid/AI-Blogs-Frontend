import { Link } from "react-router-dom";
import { useFetchBlogsQuery } from "../../redux/features/blogs/blogsApi";
import SearchBlog from "./SearchBlog";
import {useState} from 'react';

export default function Blog(){

    const [search, setSearch]  = useState('');
    const [category, setCategory]  = useState('');
    const [query, setQuery]  = useState({search: '', category: '', location:''});

    const {data: blogs=[], error, isLoading} = useFetchBlogsQuery(query)

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        setQuery(search, category, location);
    }

    return(
        <div className="mt-16 container mx-auto">
            <SearchBlog search={search} handleSearchChange={handleSearchChange} handleSearch={handleSearch}/>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error fetching blogs: {error.toString()}</div>}
            <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-8">
                {
                  blogs.map((blog)=>{
                        return <Link to={`blogs/${blog._id}`} key={blog._id}>
                            <img src={blog.coverImg} alt='' className="h-80 w-full"/>
                            <h2>{blog.title}</h2>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}