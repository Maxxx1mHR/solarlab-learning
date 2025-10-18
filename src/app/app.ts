import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { AuthorizationService } from '@core';
import { Footer } from './widgets/layouts/footer/footer';
import { Header } from '@widgets';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App implements OnInit {
  protected readonly title = signal('solarlab-learning');
  authService = inject(AuthorizationService);

  ngOnInit() {
    // this.authService.currentUser().subscribe();
  }
}
