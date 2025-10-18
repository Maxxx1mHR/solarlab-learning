import {
  Component,
  effect,
  inject,
  signal,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';
import { AdvertCard, UserStoreService } from '@entities';
import { MyAdvertService, MyAdvertStoreService } from '../../../service';
import { finalize } from 'rxjs';
import { NotFound } from '@widgets';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-adverts',
  imports: [AdvertCard, ProgressSpinner, NotFound],
  templateUrl: './my-adverts.html',
  styleUrl: './my-adverts.scss',
  standalone: true,
})
export class MyAdverts {
  // Services
  private readonly advertService = inject(MyAdvertService);
  private readonly userStoreService = inject(UserStoreService);
  readonly advertStoreService = inject(MyAdvertStoreService);

  private readonly destroyRef = inject(DestroyRef);

  // Variables
  readonly loading = signal(false);

  // constructor() {
  //   effect(() => {
  //     // const adverts = this.userStoreService.getUser()?.adverts ?? [];
  //     const user = this.userStoreService.user();
  //     const adverts = user?.adverts ?? [];
  //     // const adverts = this.userStoreService.user()?.adverts ?? [];
  //
  //     if (!adverts.length) return;
  //
  //     this.loading.set(true);
  //
  //     this.advertService
  //       .getMyAdverts(adverts)
  //       .pipe(
  //         takeUntilDestroyed(this.destroyRef),
  //         finalize(() => this.loading.set(false)),
  //       )
  //       .subscribe();
  //   });
  // }
  private prevUserId: string | null = null;

  constructor() {
    effect((onCleanup) => {
      const user = this.userStoreService.user();
      const userId = user?.userId ?? null;
      const adverts = user?.adverts ?? [];

      if (userId !== this.prevUserId) {
        this.advertStoreService.setAdverts([]);
        this.prevUserId = userId;
      }

      if (!adverts.length) {
        this.loading.set(false);
        return;
      }

      this.loading.set(true);

      const sub = this.advertService
        .getMyAdverts(adverts)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe();

      onCleanup(() => sub.unsubscribe());
    });
  }

  // ngOnInit() {
  //   const adverts = this.userStoreService.getUser()?.adverts ?? [];
  //   if (!adverts.length) return;
  //
  //   this.loading.set(true);
  //   this.advertService
  //     .getMyAdverts(adverts)
  //     .pipe(finalize(() => this.loading.set(false)))
  //     .subscribe();
  // }
}
