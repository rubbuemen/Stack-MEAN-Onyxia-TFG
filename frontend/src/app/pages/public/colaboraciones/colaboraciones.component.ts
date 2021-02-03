import { Component } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
  faPinterestSquare,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-colaboraciones',
  templateUrl: './colaboraciones.component.html',
  styleUrls: ['./colaboraciones.component.css'],
})
export class ColaboracionesComponent {
  faCheckCircle = faCheckCircle;
  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faInstagramSquare = faInstagramSquare;
  faPinterestSquare = faPinterestSquare;
}
