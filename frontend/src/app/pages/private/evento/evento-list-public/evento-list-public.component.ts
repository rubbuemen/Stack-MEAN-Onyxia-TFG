import { Component, OnDestroy, OnInit } from '@angular/core';
import { Evento } from '../../../../models/evento.model';
import { EventoService } from '../../../../services/private/evento.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-evento-list-public',
  templateUrl: './evento-list-public.component.html',
  styles: [],
})
export class EventoListPublicComponent implements OnDestroy, OnInit {
  public eventos: Evento[];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private eventoService: EventoService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getEventosPublicos();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getEventosPublicos(): void {
    this.eventoService.getEventosPublicos().subscribe((eventos) => {
      eventos.forEach((evento) => {
        evento.estadoEvento =
          evento.estadoEvento[0].toUpperCase() +
          evento.estadoEvento.substr(1).toLowerCase();
      });
      this.eventos = eventos;
      this.dtTrigger.next();
    });
  }
}
