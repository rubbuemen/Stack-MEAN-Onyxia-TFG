import { Component, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../auth/auth.service';
import {
  faInstagram,
  faFacebookF,
  faTwitter,
  faYoutube,
  faDiscord,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

declare const jQuery: any;

@Component({
  selector: 'app-footer-public',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterPublicComponent implements OnInit {
  public esVisitante: Boolean;
  public estaAutenticado: Boolean;
  public menuItems: any[];

  faAngleRight = faAngleRight;
  faInstagram = faInstagram;
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faDiscord = faDiscord;
  faWhatsapp = faWhatsapp;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.menuEmit.subscribe(
      (menu) => (this.menuItems = menu.menuFooter)
    );
    this.authService.autentificado.subscribe(
      (autentificado) => (this.estaAutenticado = autentificado)
    );
    this.authService.esVisitante.subscribe(
      (esVisitante) => (this.esVisitante = esVisitante)
    );
    this.estaAutenticado = this.authService.estaAutentificado();
    this.esVisitante = this.authService.tieneRol('VISITANTE');
    this.authService.generarMenuSegunAuth(this.authService.estaAutentificado());
  }

  ngOnInit(): void {
    (function ($) {
      $(window).resize(function () {
        let container_width = Math.round($('#facebook-container').width());
        $('#facebook-container .fb-page').attr('data-width', container_width);
        FB.XFBML.parse();
      });
    })(jQuery);
    this.router.events.subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  public logout() {
    this.authService.logout();
  }
}
