import { Hono } from 'hono'
import{PrismaClient} from "@prisma/client/edge"
import{withAccelerate} from "@prisma/extension-accelerate"
import {sign,verify} from "hono/jwt"

import { userRoutes } from './routes/userRoutes'
import { blogRoutes } from './routes/blogRoutes'
import { signupschema } from 'mediumprojectcommon'
import { cors } from 'hono/cors'
export const app=new Hono<{
  Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
  }
}>()
app.use('/api/*', cors())
app.get('/',(c)=>{
 return c.text("welcome")
})

app.route("/api/v1/user",userRoutes);
app.route("/api/v1/blog",blogRoutes);

export default app
