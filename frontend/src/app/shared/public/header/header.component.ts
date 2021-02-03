import { Component } from '@angular/core';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faDiscord,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header-public',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderPublicComponent {
  faEnvelope = faEnvelope;
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faDiscord = faDiscord;
  faWhatsapp = faWhatsapp;
}
