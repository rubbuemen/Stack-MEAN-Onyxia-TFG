import { Component } from '@angular/core';

import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasPublicComponent {
  faUser = faUser;
  faCalendar = faCalendarAlt;
}
