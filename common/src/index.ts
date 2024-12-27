import {z} from "zod"
export const signinschema=z.object({
    email:z.string().email(),
    password:z.string()

})
export type signinschematype=z.infer<typeof signinschema>
export const signupschema=z.object({
    email:z.string().email(),
    password:z.string(),
    name:z.string().optional()
})
export type signupschematype=z.infer<typeof signupschema>


export const createpostschema=z.object({
    title:z.string(),
    content:z.string()
})
export type createpostschematype=z.infer<typeof createpostschema>
export const updatepostschema=z.object({
    title:z.string().optional(),
    content:z.string().optional(),
    id:z.string()
})

    export type updatepostschematype=z.infer<typeof updatepostschema>

