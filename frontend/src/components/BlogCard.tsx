import { Link } from "react-router-dom";
interface BlogCardProps{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    id:string;
}
export const BlogCard=({
  authorName,
  title,
  content,
  publishedDate,
  id
}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}> <div className=" p-4 boredr-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <div >
          <Avavtar name={authorName}/>
          </div>
           <div className="font-extralight pl-2 flex justify-center flex-col"> {authorName}</div>  <div className="pl-2 font-thin flex justify-center flex-col text-slate-400">{publishedDate}</div>
        </div>
        <div className="text-xl pt-2 ">
            {title}

        </div>
        <div className="text-md font-thin">
            {content.slice(0,100)+"..."}
        </div>







        <div className="pt-4 text-slate-400 text-sm font-thin">
          {`${Math.ceil(content.length/100)} minute(s)`}
        </div>
     
    </div>
    </Link>

}
export function Avavtar({name,size=4}:{name:string ,size?:number}){
  return  <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="text-xs text-gray-600  dark:text-gray-300">{name[0]}</span>
</div>


function Circular(){
    return <div className="h-1 w-1 bg-slate-400 rounded-full">

    </div>

}
}