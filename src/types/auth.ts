import { ApiResponseDto } from "./common";

export type LoginDto = {
  username: string;
  password: string;
}

export type LoginResDto = ApiResponseDto<{
  access_token: string;
  role_name: string
}>;
