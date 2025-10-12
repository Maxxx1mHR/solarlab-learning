import { Component } from '@angular/core';
import { MyAdverts } from '../../features/myAdverts/ui/components/my-adverts/my-adverts';

@Component({
  selector: 'app-my-adverts-page',
  imports: [MyAdverts],
  templateUrl: './my-adverts-page.html',
  styleUrl: './my-adverts-page.scss',
  standalone: true,
})
export class MyAdvertsPage {}
