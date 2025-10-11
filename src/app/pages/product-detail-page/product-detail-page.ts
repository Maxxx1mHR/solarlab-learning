import { Component, inject, model, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { Product } from '../main-page/products-list/product-card';
import { AdvertDetail } from '../../features/advertDetail/ui/components/advert-detail/advert-detail';

@Component({
  selector: 'app-product-detail-page',
  imports: [GalleriaModule, AdvertDetail],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.scss',
  standalone: true,
})
export class ProductDetailPage {
  private activatedRoute = inject(ActivatedRoute);

  public id = this.activatedRoute.snapshot.params['id'];

  selectedProduct = signal<Product | null>(null);

  // products: Product[] = [
  //   {
  //     id: '1',
  //     imageSrc: 'assets/images/products/guitar.png',
  //     title: 'Гитара Fender',
  //     price: '20 000',
  //     location: 'Москва',
  //     publishDate: 'Сегодня 14:12',
  //   },
  //   {
  //     id: '2',
  //     imageSrc: 'assets/images/products/car-mustang.png',
  //     title: 'Ford Mustang 5.0 AT, 2019, 66 000 км',
  //     price: '3 500 000',
  //     location: 'Симферополь',
  //     publishDate: 'Вчера 19:59',
  //   },
  //   {
  //     id: '3',
  //     imageSrc: 'assets/images/products/iphone13.png',
  //     title: 'iPhone 13 mini, 128 ГБ',
  //     price: '13 990',
  //     location: 'Севастополь',
  //     publishDate: '21 августа 10:03',
  //   },
  //   {
  //     id: '4',
  //     imageSrc: 'assets/images/products/coffee-machine.png',
  //     title: "Кофемашина De'Longhi",
  //     price: '35 000',
  //     location: 'Санкт-Петербург',
  //     publishDate: 'Сегодня 09:45',
  //   },
  //   {
  //     id: '5',
  //     imageSrc: 'assets/images/products/ps5.png',
  //     title: 'Sony PlayStation 5',
  //     price: '45 000',
  //     location: 'Казань',
  //     publishDate: 'Сегодня 11:30',
  //   },
  //   {
  //     id: '6',
  //     imageSrc: 'assets/images/products/samsung-s22.png',
  //     title: 'Смартфон Samsung Galaxy S22, 256 ГБ',
  //     price: '65 000',
  //     location: 'Казань',
  //     publishDate: 'Сегодня 15:20',
  //   },
  //   {
  //     id: '7',
  //     imageSrc: 'assets/images/products/macbook-pro.png',
  //     title: 'Компьютер Apple MacBook Pro 2021',
  //     price: '150 000',
  //     location: 'Новосибирск',
  //     publishDate: 'Вчера 21:15',
  //   },
  //   {
  //     id: '8',
  //     imageSrc: 'assets/images/products/watch-rolex.png',
  //     title: 'Часы Rolex Submariner',
  //     price: '350 000',
  //     location: 'Москва',
  //     publishDate: 'Вчера 17:05',
  //   },
  //   {
  //     id: '9',
  //     imageSrc: 'assets/images/products/kawasaki-ninja.png',
  //     title: 'Мотоцикл Kawasaki Ninja 2020',
  //     price: '550 000',
  //     location: 'Ростов-на-Дону',
  //     publishDate: '21 августа 14:25',
  //   },
  //   {
  //     id: '10',
  //     imageSrc: 'assets/images/products/guitar.png',
  //     title: 'Гитара Fender',
  //     price: '20 000',
  //     location: 'Москва',
  //     publishDate: 'Сегодня 14:12',
  //   },
  //   {
  //     id: '11',
  //     imageSrc: 'assets/images/products/car-mustang.png',
  //     title: 'Ford Mustang 5.0 AT, 2019, 66 000 км',
  //     price: '3 500 000',
  //     location: 'Симферополь',
  //     publishDate: 'Вчера 19:59',
  //   },
  //   {
  //     id: '12',
  //     imageSrc: 'assets/images/products/iphone13.png',
  //     title: 'iPhone 13 mini, 128 ГБ',
  //     price: '13 990',
  //     location: 'Севастополь',
  //     publishDate: '21 августа 10:03',
  //   },
  //   {
  //     id: '13',
  //     imageSrc: 'assets/images/products/coffee-machine.png',
  //     title: "Кофемашина De'Longhi",
  //     price: '35 000',
  //     location: 'Санкт-Петербург',
  //     publishDate: 'Сегодня 09:45',
  //   },
  //   {
  //     id: '14',
  //     imageSrc: 'assets/images/products/ps5.png',
  //     title: 'Sony PlayStation 5',
  //     price: '45 000',
  //     location: 'Казань',
  //     publishDate: 'Сегодня 11:30',
  //   },
  //   {
  //     id: '15',
  //     imageSrc: 'assets/images/products/samsung-s22.png',
  //     title: 'Смартфон Samsung Galaxy S22, 256 ГБ',
  //     price: '65 000',
  //     location: 'Казань',
  //     publishDate: 'Сегодня 15:20',
  //   },
  //   {
  //     id: '16',
  //     imageSrc: 'assets/images/products/macbook-pro.png',
  //     title: 'Компьютер Apple MacBook Pro 2021',
  //     price: '150 000',
  //     location: 'Новосибирск',
  //     publishDate: 'Вчера 21:15',
  //   },
  // ];

  findSelectedProduct(products: Product[], selectedProductId: string) {
    const findProduct = products.find(
      (product) => product.id === selectedProductId,
    );
    if (findProduct) {
      this.selectedProduct.set(findProduct);
    }
  }

  images = model(['assets/images/products/guitar.png']);
}
