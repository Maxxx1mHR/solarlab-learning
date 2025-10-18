import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { buildBreadcrumb } from '@shared';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumbs',
  imports: [Breadcrumb],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
  standalone: true,
})
export class Breadcrumbs {
  items: MenuItem[] | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.items = buildBreadcrumb(this.route.root);
      });
  }
}
