export interface UserDto {
  id: string;
  name: string;
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
