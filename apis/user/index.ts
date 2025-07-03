import type { 
  RegisterPayload, 
  RegisterResponse,
  LoginPayload,
  LoginResponse
} from "@/types/user";
import http from "@/utils/http";

const userApis = {
  register: (body: RegisterPayload) => http.post<RegisterResponse>("/auth/register", body),
  login: (body: LoginPayload) => http.post<LoginResponse>("/auth/login", body),
}

export default userApis;