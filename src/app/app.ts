import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '@shared_components_smart';
import {Footer} from './shared/components/dump/footer/footer';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected readonly title = signal('solarlab-learning');
}
