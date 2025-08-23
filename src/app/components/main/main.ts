import { Component } from '@angular/core';
import { Header } from '../header/header';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { Product } from '../../shared/ui/product-card/product-card.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [Header, ProductCard, CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  products: Product[] = [
    {
      imageSrc: 'assets/images/products/guitar.png',
      title: 'Гитара Fender',
      price: '20 000',
      location: 'Москва',
      publishDate: 'Сегодня 14:12',
    },
    {
      imageSrc: 'assets/images/products/car-mustang.png',
      title: 'Ford Mustang 5.0 AT, 2019, 66 000 км',
      price: '3 500 000',
      location: 'Симферополь',
      publishDate: 'Вчера 19:59',
    },
    {
      imageSrc: 'assets/images/products/iphone13.png',
      title: 'iPhone 13 mini, 128 ГБ',
      price: '13 990',
      location: 'Севастополь',
      publishDate: '21 августа 10:03',
    },
    {
      imageSrc: 'assets/images/products/coffee-machine.png',
      title: "Кофемашина De'Longhi",
      price: '35 000',
      location: 'Санкт-Петербург',
      publishDate: 'Сегодня 09:45',
    },
    {
      imageSrc: 'assets/images/products/ps5.png',
      title: 'Sony PlayStation 5',
      price: '45 000',
      location: 'Казань',
      publishDate: 'Сегодня 11:30',
    },
    {
      imageSrc: 'assets/images/products/samsung-s22.png',
      title: 'Смартфон Samsung Galaxy S22, 256 ГБ',
      price: '65 000',
      location: 'Казань',
      publishDate: 'Сегодня 15:20',
    },
    {
      imageSrc: 'assets/images/products/macbook-pro.png',
      title: 'Компьютер Apple MacBook Pro 2021',
      price: '150 000',
      location: 'Новосибирск',
      publishDate: 'Вчера 21:15',
    },
    {
      imageSrc: 'assets/images/products/watch-rolex.png',
      title: 'Часы Rolex Submariner',
      price: '350 000',
      location: 'Москва',
      publishDate: 'Вчера 17:05',
    },
    {
      imageSrc: 'assets/images/products/kawasaki-ninja.png',
      title: 'Мотоцикл Kawasaki Ninja 2020',
      price: '550 000',
      location: 'Ростов-на-Дону',
      publishDate: '21 августа 14:25',
    },
    {
      imageSrc: 'assets/images/products/guitar.png',
      title: 'Гитара Fender',
      price: '20 000',
      location: 'Москва',
      publishDate: 'Сегодня 14:12',
    },
    {
      imageSrc: 'assets/images/products/car-mustang.png',
      title: 'Ford Mustang 5.0 AT, 2019, 66 000 км',
      price: '3 500 000',
      location: 'Симферополь',
      publishDate: 'Вчера 19:59',
    },
    {
      imageSrc: 'assets/images/products/iphone13.png',
      title: 'iPhone 13 mini, 128 ГБ',
      price: '13 990',
      location: 'Севастополь',
      publishDate: '21 августа 10:03',
    },
    {
      imageSrc: 'assets/images/products/coffee-machine.png',
      title: "Кофемашина De'Longhi",
      price: '35 000',
      location: 'Санкт-Петербург',
      publishDate: 'Сегодня 09:45',
    },
    {
      imageSrc: 'assets/images/products/ps5.png',
      title: 'Sony PlayStation 5',
      price: '45 000',
      location: 'Казань',
      publishDate: 'Сегодня 11:30',
    },
    {
      imageSrc: 'assets/images/products/samsung-s22.png',
      title: 'Смартфон Samsung Galaxy S22, 256 ГБ',
      price: '65 000',
      location: 'Казань',
      publishDate: 'Сегодня 15:20',
    },
    {
      imageSrc: 'assets/images/products/macbook-pro.png',
      title: 'Компьютер Apple MacBook Pro 2021',
      price: '150 000',
      location: 'Новосибирск',
      publishDate: 'Вчера 21:15',
    },
  ];
}
