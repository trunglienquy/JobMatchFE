import type { RegisterPayload, RegisterResponse } from "@/types/user";
import http from "@/utils/http";

const userApis = {
  register: (body: RegisterPayload) => http.post<RegisterResponse>("/auth/register", body),
}

export default userApis;