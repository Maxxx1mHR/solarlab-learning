import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AdvertService } from '../../../service/advert.service';
import { UserStoreService } from '../../../../../entities/users/user.store.service';
import { AdvertStoreService } from '../../../service/advert.store.service';
import { AdvertCard } from '../../../../../entities/advert-card';

@Component({
  selector: 'app-my-adverts',
  imports: [AdvertCard],
  templateUrl: './my-adverts.html',
  styleUrl: './my-adverts.scss',
  standalone: true,
})
export class MyAdverts implements OnInit {
  private advertService = inject(AdvertService);
  userStoreService = inject(UserStoreService);
  advertStoreService = inject(AdvertStoreService);

  adverts = computed(() => this.userStoreService.getUser()?.adverts ?? []);

  getAdverts() {
    return this.advertService.getMyAdverts(this.adverts()).subscribe();
  }

  ngOnInit() {
    this.getAdverts();
  }
}
