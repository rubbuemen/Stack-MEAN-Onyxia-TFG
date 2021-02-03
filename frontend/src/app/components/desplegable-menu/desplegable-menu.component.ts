import { Component } from '@angular/core';

@Component({
  selector: 'app-desplegable-menu',
  templateUrl: './desplegable-menu.component.html',
  styleUrls: ['./desplegable-menu.component.css'],
})
export class DesplegableMenuComponent {
  ngAfterViewInit(): void {
    this.cambiarIconosDesplegablesJquery();
  }

  private cambiarIconosDesplegablesJquery(): void {
    (function ($) {
      //Para cambiar al icono "-" si se hace click en otro lado que no sea el boton del desplegable
      $(document).on('click', function () {
        $('.bottom-dropdown')
          .removeClass('bottom-minus')
          .addClass('bottom-plus');
      });

      //Para cambiar al icono pertinente si se hace click en el boton del desplegable
      $('.bottom-dropdown')
        .off('click')
        .on('click', function () {
          $(this).hasClass('bottom-plus')
            ? $(this).removeClass('bottom-plus').addClass('bottom-minus') &&
              $('.bottom-dropdown')
                .not(this)
                .removeClass('bottom-minus')
                .addClass('bottom-plus') &&
              $(this).removeClass('py-2')
            : $(this).removeClass('bottom-minus').addClass('bottom-plus');
        });
    })(jQuery);
  }
}
