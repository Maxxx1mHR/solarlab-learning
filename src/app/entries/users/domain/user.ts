export interface User {
  name: string;
  role: string;
  login: string;
  userId: string;
  adverts: Advert[];
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
