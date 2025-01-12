import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/skeleton"
import { useBlogs } from "../hooks"


export const Blogs=()=>{
  const {blogs,loading}=useBlogs();
  if(loading || !blogs ){
    return <div>
   <Appbar></Appbar>     
    <div className="flex justify-center">
        <div>
        <Skeleton></Skeleton>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        </div>
        
    </div>
    </div>
  }
    
   return <div>
    <Appbar></Appbar>
     <div className="flex justify-center" >
    <div >
      
      {blogs.map((blog)=>{return <BlogCard id={blog.id} authorName={blog.author.name || "Any" } title={blog.title} content={blog.content} publishedDate="11 jan 2024"></BlogCard>})}
    </div>
    </div>
    </div>
}