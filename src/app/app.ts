import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@shared_components_smart';
import { Toast } from 'primeng/toast';
import { Footer } from '@shared_components_dump';
import { AuthorizationService } from '@core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
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
