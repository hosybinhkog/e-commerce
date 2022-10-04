import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface ExtendedToken extends JWT {
  accessToken: string;
  refeshToken: string;
  accessTokenExpiresAt: number;
  user: User;
  error?: TokenError;
}

export interface ExtendedSession extends Session {
  accessToken: ExtendedToken["accessToken"];
  error: ExtendedToken["error"];
}

export enum TokenError {
  RefreshAccessTokenError = "RefreshAccessTokenError",
}
