import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { AdvertDetail } from '../../features/advertDetail/ui/components/advert-detail/advert-detail';

@Component({
  selector: 'app-advert-detail-page',
  imports: [GalleriaModule, AdvertDetail],
  templateUrl: './advert-detail-page.html',
  styleUrl: './advert-detail-page.scss',
  standalone: true,
})
export class AdvertDetailPage {}
