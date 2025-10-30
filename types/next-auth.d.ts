import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session types to include custom properties
   */
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "AUTHOR" | "USER";
    } & DefaultSession["user"];
  }

  /**
   * Extends the built-in user types to include custom properties
   */
  interface User {
    id: string;
    role: "ADMIN" | "AUTHOR" | "USER";
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT types to include custom properties
   */
  interface JWT {
    id: string;
    role: "ADMIN" | "AUTHOR" | "USER";
  }
}
