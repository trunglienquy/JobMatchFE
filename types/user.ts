import { ResponseData } from "./common";

export type User = {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  role: string;
};

export type RegisterPayload = {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
};

export type RegisterResponse = ResponseData<null> & { timestamp: string };