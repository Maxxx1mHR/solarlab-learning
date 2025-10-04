export interface AdvertDetail {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  advert: {
    title: string;
    description: string;
    location: string;
    price: string;
    imageSrc: string[];
  };
}
