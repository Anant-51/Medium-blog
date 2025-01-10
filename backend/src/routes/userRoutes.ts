import { Hono } from 'hono'
import{PrismaClient} from "@prisma/client/edge"
import{withAccelerate} from "@prisma/extension-accelerate"
import {sign,verify} from "hono/jwt"
import { signinschema,signupschema } from 'mediumprojectcommon'
export const userRoutes = new Hono<{
  Bindings:{DATABASE_URL:string,JWT_SECRET:string}
}>()


  
userRoutes.post('/signup', async (c) => {
  const prisma =new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body=await c.req.json();
  const {success}=signupschema.safeParse(body);
  if(!success){
    return c.json({
      message:"invalid input"
    })
  }
  
  try{
  const user=await prisma.user.create({
    data:{
      email:body.email,
      password:body.password,
      name:body.name||'',
    },
  })
  const token=await sign({id:user.id},c.env.JWT_SECRET);
  return c.json({jwt:token});}
  catch(e){
    console.log(e);
    return c.json({message:e})
  }
})
userRoutes.post('/signin',async  (c)=>{
  const prisma =new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body=await c.req.json();
  const {success}=signinschema.safeParse(body);
  if(!success){
    return c.json({
      message:"invalid input"
    })
  }
  
  
 
  
  const user=await prisma.user.findFirst({
    where:{
      email:body.email,
      password:body.password
    }
  })
  if(!user){
    c.status(403);
    return c.json({error:'user not available'})
  }
  const jwt=await sign({id:user.id},c.env.JWT_SECRET)
  return c.json({jwt})
})