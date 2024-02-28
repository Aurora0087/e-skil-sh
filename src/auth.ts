import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GitHub from "next-auth/providers/github"
import google from "next-auth/providers/google"
import clientPromise from "./lib/mongodb/adapter"

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({

    providers: [GitHub({
        clientId: process.env.AUTH_GITHUB_ID!,
        clientSecret: process.env.AUTH_GITHUB_SECRET!,
        profile: (_profile) => {
            const uName = _profile.name?.split(" ")
            return {
                id: (_profile.id).toString(),
                name: _profile.login,
                email: _profile.email,
                image: _profile.avatar_url,
                firstName: uName![0],
                lastName: uName![1],
                bio: "",
                followers :[],
                following :[],
                bookmark :[],
                joined : new Date(),
                liked: [],
                role:"USER",
                }
            }
    }),
        google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile: (profile) => {
                
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    bio: "",
                    followers :[],
                    following :[],
                    bookmark :[],
                    joined : new Date(),
                    liked: [],
                    role:"USER",
                }
            }
        })],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            if (user?.email==="debrajbanshi1@gmail.com") {
                user.role="ADMIN"
            }
            else user.role="USER"
            return true;
        },
        async session({ token, session }) {

            if (token) {
                session.user.id = token.id!
                session.user.name = token.name
                session.user.email = token.email!
                session.user.image = token.picture
                session.user.role = token.role
            }
            return session
        },
        async jwt({ token, user }) {

            const dbUser = ""
            if (!dbUser) {
                token.id = user.id
                return token
            }
            return {
                id: "",
                name: "",
                role: "USER",
                email: "",
                picture: "",
            }
        },
    },

    adapter: MongoDBAdapter(clientPromise),
})