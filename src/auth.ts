import NextAuth from 'next-auth'
import { prisma } from './lib/client'
import { compare } from 'bcrypt-ts'

import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        GitHub,
        Credentials({
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text"
                },
                password: {
                    label: "password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    throw new Error("Invalid Credentials")
                }

                const user = await prisma?.user.findUnique({
                    where: {
                        email: credentials.email as string
                    },
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid Credentials")
                }

                const isCorrectPassword = await compare(credentials?.password as string, user.hashedPassword)

                if (!isCorrectPassword) {
                    console.log("In-coorect Password")

                    throw new Error("Invalid Credentials")
                }

                return user
            },
        })
    ],
    pages : {
        signIn : '/auth/sign-in',
    },
    debug : process.env.NODE_ENV === 'development',
    session : {
        strategy : "jwt"
    },
    secret : process.env.AUTH_SECRET,
})