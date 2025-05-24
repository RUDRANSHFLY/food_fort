"use server"

import type { User } from '@prisma-db-1/client'
import { prisma } from "@/lib/client";
import { genSalt, hash } from "bcrypt-ts";




export interface CreateUserProps {
    email: string;
    password: string;
    role: "ADMIN" | "MANAGER" | "MEMBER"
}

export type CreateUserResult = 
    | {error : string}
    | User 


export const createUser = async (user: CreateUserProps) : Promise<CreateUserResult> => {

    const existingUser = await prisma.user.findUnique({
        where : {
            email : user.email
        }
    })

    if(existingUser){
        return {
            error : "User with this email already exists."
        }
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);

    try {
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                hashedPassword: hashedPassword,
                role: user.role
            }
        });

        console.log(`👤 User registered: email=${newUser.email}, role=${newUser.role}`);

        return newUser;
    } catch (error) {
        console.log(`Error creating user ${error}`);
        return {error : "Error creating user."};
    }
}