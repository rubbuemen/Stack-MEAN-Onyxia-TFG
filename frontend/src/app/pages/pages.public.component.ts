import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from '../services/public/configuracion.service';

declare const jQuery: any;

@Component({
  selector: 'app-pages-public',
  templateUrl: './pages.public.component.html',
})
export class PagesPublicComponent implements OnInit {
  public modoMantenimiento: boolean = false;
  public esLogin: boolean = false;

  constructor(
    private configuracionService: ConfiguracionService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      (function ($) {
        $('#main_nav').collapse('hide');
        $('.selectpicker').selectpicker('refresh');
      })(jQuery);
    });
  }

  ngOnInit(): void {
    this.configuracionService.setearLogin();
    this.configuracionService.esLogin.subscribe(
      (esLogin) => (this.esLogin = esLogin)
    );
    this.configuracionService.getConfiguracion().subscribe((configuracion) => {
      this.modoMantenimiento = configuracion.modoMantenimiento;
    });
  }
}
