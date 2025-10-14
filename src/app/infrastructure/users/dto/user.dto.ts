export interface UserDto {
  id: string;
  name: string;
  login: string;
  role: string;
  adverts: Advert[];
  registeredTime: string;
}

interface Advert {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  isActive: boolean;
  imagesIds: string[];
  cost: number;
}

export interface UpdateUserDtoRequest {
  name: string;
  login: string;
  password: string;
}

export interface UpdateUserDtoResponse {
  id: string;
  name: string;
  login: string;
}

export interface UsersResponseDto {
  id: string;
  name: string;
  login: string;
}
