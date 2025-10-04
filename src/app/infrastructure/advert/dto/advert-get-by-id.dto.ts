export interface GetAdvertResponseDto {
  id: string;
  user: {
    id: string;
    name: string;
    login: string;
  };
  name: string;
  description: string;
  isActive: boolean;
  imagesIds: string[];
  cost: number;
  email: string;
  phone: string;
  location: string;
  created: string;
  category: {
    id: string;
    parentId: string;
    name: string;
  };
}
