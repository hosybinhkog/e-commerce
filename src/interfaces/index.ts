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

export interface Product {
  _id: string;
  imgs: Imgs[];
  category: string;
  description: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  Stock: number;
  numOfReviews?: number;
  price: number;
  reviews: any[];
  rating: number;
}

export interface Imgs {
  public_id: string;
  url: string;
}

export interface Category {
  _id: string;
  createdAt: string;
  updatedAt: string;
  shortDescription: string;
  name: string;
  img: Imgs;
  user: string;
  description: string;
}

export interface IProductCartItem {
  image?: string;
  name?: string;
  price?: number | string;
  product: string;
  quantity: number;
  stock?: number;
  description?: string;
  rating?: number | string;
}

export interface IReview {
  username?: string;
  rating: number;
  comment: string;
  url: string;
  userId?: string;
  _id?: string;
  createdAt: string;
  updatedAt: string;
  imgs?: Imgs[];
}

export interface Imgs {
  public_id: string;
  url: string;
}
