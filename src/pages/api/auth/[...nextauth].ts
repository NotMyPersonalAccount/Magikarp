import NextAuth, { Session, User } from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../prisma/prisma";

export default NextAuth({
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		})
	],
	adapter: Adapters.Prisma.Adapter({
		prisma
	}),
	callbacks: {
		async session(session: Session, user: User) {
			session.user = user;
			return session;
		}
	}
});
