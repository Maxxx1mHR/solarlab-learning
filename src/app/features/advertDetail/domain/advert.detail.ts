export interface AdvertDetail {
  user: {
    name: string;
    email: string;
    phone: string;
    createdById: string; // id пользователя, который создал объвление
  };
  advert: {
    id: string; // id объявления
    title: string;
    description: string;
    location: string;
    price: string;
    imageSrc: Images[];
    category: {
      id: string;
      name: string;
    };
  };
}

export interface Images {
  src: string;
  id: string;
}

export interface AdvertForm {}
