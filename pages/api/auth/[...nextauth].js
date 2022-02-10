import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: "601300732170-ukfckfug6h9709s2jjp6ge8iuifn0n2f.apps.googleusercontent.com",
			clientSecret: "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"
		})
	],
	secret: "This is probably not a good secret"
})