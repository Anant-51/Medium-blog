import { Hono } from 'hono'
import{PrismaClient} from "@prisma/client/edge"
import{withAccelerate} from "@prisma/extension-accelerate"
import {sign,verify} from "hono/jwt"
import { createpostschema,updatepostschema } from 'mediumprojectcommon'
export const blogRoutes=new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    };
    Variables:{
       userId:string;


    };

}>()

    
    blogRoutes.use('/*',async (c,next)=>{
   
    const jwt=c.req.header('authorization')||" ";
    
    if(!jwt){
        return c.json({message:"invalid"})
    }
    
    const token =await verify(jwt,c.env.JWT_SECRET);
    if(!token){
        return c.json({
            message:"invalid input"
        })
    }
    
    //@ts-ignore
    c.set('userId',token.id);





   await next();



})


blogRoutes.post('/',async (c)=>{
    const userId=c.get('userId');
    const body=await c.req.json();
      const {success}=createpostschema.safeParse(body);
      if(!success){
        return c.json({
          message:"invalid input"
        })
      }
    const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL

    }).$extends(withAccelerate());
    
    try{
    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            
        

            authorId:userId

        }
    })
    return c.json({id:blog.id});
    
}catch(e){
 c.status(403);
 return c.json({
   message:e
 })

}
  })
  blogRoutes.put('/',async (c)=>{
    const userId=c.get('userId');
    const body=await c.req.json();
      const {success}=updatepostschema.safeParse(body);
      if(!success){
        return c.json({
          message:"invalid input"
        })
      }
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    
        }).$extends(withAccelerate());
        
        try{
         const blog=await prisma.post.update({
            where:{
                id:body.id,
                authorId:userId
            },
            data:{
                title:body.title,
                content:body.content

            }
           
         })
         return c.json({id:blog.id});
        }catch(e){
           c.status(403);
           return c.json({
            message:"could not update"
           })
        }
        
  })
  blogRoutes.get('/bulk',async (c)=>{
    
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    
        }).$extends(withAccelerate());
        
        try{
        const blog=await prisma.post.findMany()
        return c.json(blog);
    }catch(e){

        return c.json({
            message:"coul not get posts"
        })
    }
  })

  
  blogRoutes.get('/:id',async (c)=>{
    
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    
        }).$extends(withAccelerate());
        const id=c.req.param("id");
        try{
        const blog=await prisma.post.findUnique({
            where:{
              id
            }
        })
        return c.json(blog);
    }catch(e){

        
        return c.json({
            message:"could not get posts"
        })
    }
  })

  