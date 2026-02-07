import type { ApiResponse } from "@/types/common/api";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
};

export type AuthData = {
  user: User;
  token: string;
};

export type RegisterArgs = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  guestId?: string;
};

export type LoginArgs = {
  phone: string;
  password: string;
  guestId?: string;
};

export type ForgotPasswordArgs = {
  email: string;
};

export type ResetPasswordArgs = {
  newPassword: string;
  code: string;
};

export type RegisterResponse = ApiResponse<AuthData>;
export type LoginResponse = ApiResponse<AuthData>;
export type ForgotPasswordResponse = ApiResponse<undefined>;
export type ResetPasswordResponse = ApiResponse<undefined>;
