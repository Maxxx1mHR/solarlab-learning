import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-footer',
  imports: [
    ButtonModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  standalone: true
})
export class Footer {

}
