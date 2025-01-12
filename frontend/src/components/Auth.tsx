import { ChangeEvent,ChangeEventHandler,useState} from "react";
import { signupschematype } from "mediumprojectcommon";
import { Link,useNavigate} from "react-router-dom"
import { BACKEND_URL } from "../config";
import axios from "axios";



export const Auth=({type}:{type:"signup"|"signin"})=>{
    const navigate=useNavigate();
    const [postsInputs,setPostsInputs]=useState<signupschematype>({
        name:"",
        email:"",
        password:""
    })
    async function sendrequest(){
        try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type}`,postsInputs)
        const data=response.data;
        localStorage.setItem("token",data.jwt);
        navigate("/blogs")
        

        }
        catch(e){
              console.log(e);
        }
    }
    return <div className="h-screen flex justify-center flex-col"> 
    <div className="flex justify-center">
        <div>
        <div className="text-3xl font-bold">
            Create an account
        </div>
        <div className="text-slate-400">
           {type==="signin"?"Don't have an account?":"Already have an account?"} 
            <Link  to={type==="signin"?"/signup":"/signin"} className="pl-2 underline">{type==="signin"?"Signup":"Signin"}</Link>
        </div>
        <div className="flex justify-center flex-col"/>
        <LabelledInput label={"name"} placeholder={"harkirat"} id={"a"} onChange={(e)=>{
            setPostsInputs({...postsInputs,
            name:e.target.value})

        }}/>
          <LabelledInput label={"username"} placeholder={"harkirat123@gmail.com"} id={"b"} onChange={(e)=>{
            setPostsInputs({...postsInputs,
            email:e.target.value})

        }}/>
        <LabelledInput label={"password"} type={"password"} placeholder={"har123"} id={"c"} onChange={(e)=>{
            setPostsInputs({...postsInputs,
            password:e.target.value})

        }}/>
         <button type="button" onClick={sendrequest} className="text-white w-full mt-10 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Signup":"Signin"}</button>
        </div>
    </div>
    
    </div>
    }
interface LabeledInputType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:any;
    id:string;
}
function LabelledInput({label,placeholder,onChange,type}:LabeledInputType){
    return <div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type||"text"}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
           
        </div>
    </div>

} 