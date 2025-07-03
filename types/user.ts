import { ResponseData } from "./common";

export type User = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
};

export type LoginPayload = {
  email: string;
  password: string;
}


export type RegisterResponse = ResponseData<null>;
export type LoginResponse = ResponseData<{ token: string }>;