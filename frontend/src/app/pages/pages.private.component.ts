import { Component, OnInit } from '@angular/core';

declare const jQuery: any;
declare const window: any;

@Component({
  selector: 'app-pages-private',
  templateUrl: './pages.private.component.html',
})
export class PagesPrivateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    (function ($) {
      $('.dropify').dropify({
        messages: {
          default: 'Arrastra y suelta la fotografía aquí o haga clic',
          replace: 'Arrastra y suelta o haga clic para reemplazar',
          remove: 'Eliminar',
          error: 'Ooops, algo salió mal.',
        },
        error: {
          imageFormat:
            'El formato de la imagen no está permitido (sólo {{ value }}).',
        },
      });
      const set = function () {
        (window.innerWidth > 0 ? window.innerWidth : this.screen.width) < 1170
          ? ($('body').addClass('mini-sidebar'),
            $('.navbar-brand span').hide(),
            $('.sidebartoggler i').addClass('ti-menu'))
          : ($('body').removeClass('mini-sidebar'),
            $('.navbar-brand span').show());
        let height =
          (window.innerHeight > 0 ? window.innerHeight : this.screen.height) -
          1;
        (height -= 0) < 1 && (height = 1),
          height > 0 && $('.page-wrapper').css('min-height', height + 'px');
      };
      $(window).ready(set), $(window).on('resize', set);
    })(jQuery);
  }
}
