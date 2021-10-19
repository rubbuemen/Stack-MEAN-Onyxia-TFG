import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiaEvento } from '../../../../models/dia-evento.model';
import { DiaEventoService } from '../../../../services/private/dia-evento.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Evento } from '../../../../models/evento.model';
import { EventoService } from 'src/app/services/private/evento.service';
import { SharedDataService } from '../../../../services/shared-data.service';

@Component({
  selector: 'app-dia-evento-list',
  templateUrl: './dia-evento-list.component.html',
  styles: [],
})
export class DiaEventoListComponent implements OnDestroy, OnInit {
  public evento: Evento;
  private idObjectEvento: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private diaEventoService: DiaEventoService,
    private eventoService: EventoService,
    private sharedDataService: SharedDataService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.route.params.subscribe((params) => {
      this.getEvento(params['eventoId']);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getEvento(eventoId: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(eventoId);
    if (this.idObjectEvento !== undefined) {
      this.eventoService.getEvento(this.idObjectEvento).subscribe((evento) => {
        this.diaEventoService
          .getDiasEvento(this.idObjectEvento)
          .subscribe((dias) => {
            this.evento.diasEvento = dias;
          });
        this.evento = evento;
        this.sharedDataService.changeEvento(this.evento);
        this.dtTrigger.next();
      });
    }
  }

  public eliminarUltimoDia(eventoId: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(eventoId);
    if (this.idObjectEvento !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar el último día asignado al evento?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.diaEventoService
              .eliminarUltimoDia(this.idObjectEvento)
              .subscribe(
                () => {
                  swal
                    .fire(
                      'Datos eliminados',
                      'Se ha eliminado el último día del evento',
                      'success'
                    )
                    .then(() => this.ngOnInit());
                },
                (error) => {
                  swal.fire('Error', error.error.error, 'error');
                }
              );
          }
        });
    }
  }

  public aniadirDia(eventoId: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(eventoId);
    if (this.idObjectEvento !== undefined) {
      this.diaEventoService.aniadirDia(this.idObjectEvento).subscribe(
        (res) => {
          swal
            .fire(
              'Nuevo día añadido',
              'Se ha añadido un nuevo día al evento',
              'success'
            )
            .then(() => this.ngOnInit());
        },
        (error) => {
          swal.fire('Error', error.error.error, 'error');
        }
      );
    }
  }
}
