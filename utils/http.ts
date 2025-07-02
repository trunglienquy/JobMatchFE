import { STORAGE_KEY } from '@/constants/common';
import { routes } from '@/constants/routes';
import Cookies from 'js-cookie';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string;
  body?: any;
};

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  timestamp: string;
  data: T;
};

export class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions
): Promise<T> => {
  let body: FormData | string | undefined = undefined;
  const token = Cookies.get(STORAGE_KEY.EC_TOKEN);

  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders: { [key: string]: string } =
    body instanceof FormData
      ? {}
      : {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

  if (token) {
    baseHeaders.authorization = `Bearer ${token}`;
  }

  const baseUrl =
    options?.baseUrl ?? process.env.NEXT_PUBLIC_API_URL ?? '';

  const fullUrl = url.startsWith('/')
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
    next: {
      revalidate: 0,
    },
  });

  const json: ApiResponse<T> = await res.json();

  if (!res.ok) {
    if (
      res.status === 401 &&
      token &&
      !['/login', '/register', '/register/validate', '/forgot-password'].includes(url)
    ) {
      Cookies.remove(STORAGE_KEY.EC_TOKEN);
      localStorage.removeItem(STORAGE_KEY.EC_USER);
      
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/auth/')) {
        window.location.href = routes.login;
      }
    }

    if (res.status === 500) {
      window.location.href = routes.internalError;
    }

    if (res.status === 422) {
      throw new EntityError({ status: 422, payload: json as any });
    }

    throw new HttpError({ status: res.status, payload: json });
  }

  return json.data;
};

const http = {
  get<T>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<T>('GET', url, options);
  },
  post<T>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<T>('POST', url, { ...options, body });
  },
  put<T>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<T>('PUT', url, { ...options, body });
  },
  delete<T>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<T>('DELETE', url, options);
  },
};

export default http;
