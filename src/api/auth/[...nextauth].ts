import GoogleProvider from "next-auth/providers/google"

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientId) {
  throw new Error("Missing GOOGLE_CLIENT_ID env var");
}

if (!clientSecret) {
  throw new Error("Missing GOOGLE_CLIENT_SECRET env var");
}

const options = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    async signIn(): Promise<boolean> {
      return true;
    }
  }
};
