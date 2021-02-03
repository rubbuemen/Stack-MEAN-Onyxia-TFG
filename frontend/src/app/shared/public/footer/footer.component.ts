import { Component, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faFacebookF,
  faTwitter,
  faYoutube,
  faDiscord,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

declare const jQuery: any;

@Component({
  selector: 'app-footer-public',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterPublicComponent implements OnInit {
  faAngleRight = faAngleRight;
  faInstagram = faInstagram;
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faDiscord = faDiscord;
  faWhatsapp = faWhatsapp;
  ngOnInit(): void {
    (function ($) {
      $(window).resize(function () {
        let container_width = Math.round($('#facebook-container').width());
        $('#facebook-container .fb-page').attr('data-width', container_width);
        FB.XFBML.parse();
      });
    })(jQuery);
  }
}
