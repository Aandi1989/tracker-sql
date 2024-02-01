import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { getUser } from "@/sql/data";

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            // @ts-ignore
            async authorize(credentials, req) {
                if(!credentials?.email || !credentials.password) return null;

                const user = await getUser(credentials.email);

                if(!user) return null;

                // const passwordMatch = await bcrypt.compare(
                //     credentials.password, 
                //     // @ts-ignore
                //     user.hashedPassword!
                // );
                
                return user ? user : null;
            },
        }),
    ],
    // session: {
    //     strategy: 'jwt'
    // }
});

export { handler as GET, handler as POST }