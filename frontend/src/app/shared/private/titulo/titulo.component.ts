import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-titulo-privado',
  templateUrl: './titulo.component.html',
  styles: [],
})
export class TituloComponent implements OnDestroy {
  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.construirTitulo();
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  private construirTitulo(): Subscription {
    return this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = titulo + ' - ' + document.title;
      });
  }
}
