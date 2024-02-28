import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface User extends DefaultUser {
        role: "USER" | "ADMIN";
        bio: string;
        followers: string[];
        following: string[];
        bookmark: string[];
        liked: string[];
        joined: Date;
        firstName: string | null;
        lastName: string | null;
    }
    interface Session extends DefaultSession {
        user: User;
    }

}
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT{
        id: string|undefined;
        role: "USER"|"ADMIN";
    }
}