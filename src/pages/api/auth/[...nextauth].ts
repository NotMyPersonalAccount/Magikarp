import NextAuth, { Session, User } from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		})
	],
	database: process.env.MONGODB_URI,
	callbacks: {
		async session(session: Session, user: User) {
			return { user, session };
		}
	}
});
