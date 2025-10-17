import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

export function buildBreadcrumb(
  route: ActivatedRoute,
  url = '',
  breadcrumbs: MenuItem[] = [
    { icon: 'pi pi-home', label: 'Главная', routerLink: '/' },
  ],
): MenuItem[] {
  const children = route.children;

  if (children.length === 0) {
    return breadcrumbs;
  }

  for (const child of children) {
    const routeURL = child.snapshot.url
      .map((segment) => segment.path)
      .join('/');
    if (routeURL) {
      url += `/${routeURL}`;
    }

    const label = child.snapshot.data['breadcrumb'];
    if (label) {
      breadcrumbs.push({
        label,
        routerLink: url,
      });
    }

    return buildBreadcrumb(child, url, breadcrumbs);
  }

  return breadcrumbs;
}
