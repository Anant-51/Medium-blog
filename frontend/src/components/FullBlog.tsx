import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avavtar } from "./BlogCard"

export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
     <Appbar></Appbar>   
     <div className="grid grid-cols-12 w-full pt-200 max-w-screen-2xl pt-12">
        <div className="grid col-span-8">
            <div className="text-5xl font-bold">
                {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
               post on 10 dec 2024
            </div>
            <div className="text-3xl font-bold pt-4">
                {blog.content}
            </div>


        </div>
        <div className="grid col-span-4">
        <div className="flex flex-col">
        <div >
         Author
         </div>
         <div className="flex w-full mt-1">
         <div className="mt-2 pr-2">
         <Avavtar size={10} name={blog?.author?.name || "Anonymous"}></Avavtar>   
         </div>
         <div>
        <div className="text-2xl font-bold">
        {blog?.author?.name || "Anonymous"}
        </div>
        <div text-slate-500 pt-2>
            Random catch phrase about the author.
        </div>
        </div>
         </div>
      
         



        </div>
        </div>

    </div>
    </div>
    }