import { Component } from '@angular/core';

import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-noticia-display',
  templateUrl: './noticia-display.component.html',
  styleUrls: ['./noticia-display.component.css'],
})
export class NoticiaDisplayPublicComponent {
  faUser = faUser;
  faCalendar = faCalendarAlt;
}
