export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type ErrorPayload = {
  message?: string;
  errors?: Record<string, string[]>;
  code?: string | number;
};

