import { Component } from '@angular/core';

declare const jQuery: any;

@Component({
  selector: 'app-carousel-cards',
  templateUrl: './carousel-cards.component.html',
  styleUrls: ['./carousel-cards.component.css'],
})
export class CarouselCardsComponent {
  ngAfterViewInit(): void {
    this.construirCarouselJquery();
  }

  private construirCarouselJquery(): void {
    (function ($) {
      $('#carousel-home').on('slide.bs.carousel', function (e) {
        const $e = $(e.relatedTarget);
        const idx = $e.index();
        const totalItems = $('#carousel-home .carousel-item').length;
        const itemsPerSlide = totalItems - 3;
        if (idx >= totalItems - (itemsPerSlide - 1)) {
          const it = itemsPerSlide - (totalItems - idx);
          for (let i = 0; i < it; i++) {
            if (e.direction == 'left') {
              $('#carousel-home .carousel-item')
                .eq(i)
                .appendTo('#carousel-home .carousel-inner');
            } else {
              $('#carousel-home .carousel-item')
                .eq(0)
                .appendTo('#carousel-home .carousel-inner');
            }
          }
        }
      });

      $('#carousel-home .carousel-inner').swipe({
        swipeLeft: function () {
          this.parent().carousel('next');
        },
        swipeRight: function () {
          this.parent().carousel('prev');
        },
      });
    })(jQuery);
  }
}
