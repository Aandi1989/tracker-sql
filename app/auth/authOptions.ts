import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/sql/data";
import bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
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

                const passwordMatch = await bcrypt.compare(
                    credentials.password, 
                    // @ts-ignore
                    user.hashedPassword!
                );
                
                return passwordMatch ? user : null;
            },
        }),
    ],
    session: {
        strategy: 'jwt'
    }
};

export default authOptions;

