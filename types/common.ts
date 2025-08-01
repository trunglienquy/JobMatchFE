export type ResponseData<T> = {
  success: boolean;
  message: string;
  timestamp: string;
  data: T;
}

export type ResponseError = {
  success: boolean;
  message: string;
};

export type ResponseFormFieldError = {
  success: boolean;
  errors: any;
};