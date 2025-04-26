import {z} from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(2).max(20),
    password: z.string().min(2).max(20),
    email: z.string().min(2).max(50)
}); 

export const SigninSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(20)
});

export const CreateRoomSchema = z.object({
    slug: z.string().min(2).max(20)
});

