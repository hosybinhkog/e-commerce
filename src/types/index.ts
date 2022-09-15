import React from "react";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export type MouseEvent<T = HTMLButtonElement> = React.MouseEventHandler<T>;

export type ChangeEvent<T = HTMLInputElement> = React.ChangeEventHandler<T>;

export type ClickEvent<T = HTMLButtonElement> = React.MouseEventHandler<T>;

export type KeyDownEvent<T = HTMLInputElement> = React.KeyboardEventHandler<T>;

export enum TokenError {
  RefreshAccessTokenError = "RefreshAccessTokenError",
}

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
