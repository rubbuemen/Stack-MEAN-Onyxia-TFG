import { Component, OnDestroy, OnInit } from '@angular/core';

import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { Evento } from '../../../../models/evento.model';
import { InscripcionEventoService } from 'src/app/services/private/inscripcion-evento.service';
import { InscripcionEvento } from 'src/app/models/inscripcion-evento.model';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/private/evento.service';
import { ActividadService } from 'src/app/services/private/actividad.service';

@Component({
  selector: 'app-inscripcion-evento-pendientes',
  templateUrl: './inscripcion-evento-pendientes.component.html',
  styles: [],
})
export class InscripcionEventoPendientesComponent implements OnDestroy, OnInit {
  public inscripcionesEvento: InscripcionEvento[];
  public evento: Evento;
  private idObjectEvento: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private inscripcionEventoService: InscripcionEventoService,
    private eventoService: EventoService,
    private actividadService: ActividadService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.route.params.subscribe((params) => {
      this.getInscripcionesPendientesPorEvento(params['eventoId']);
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
        this.evento = evento;
      });
    }
  }

  private getInscripcionesPendientesPorEvento(eventoId: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(eventoId);
    if (this.idObjectEvento !== undefined) {
      this.inscripcionEventoService
        .getInscripcionesPendientesByEvento(this.idObjectEvento)
        .subscribe((inscripcionesEvento) => {
          inscripcionesEvento.forEach((inscripcionEvento) => {
            if (!this.utils.existe(inscripcionEvento.problemaAlimenticio)) {
              inscripcionEvento.problemaAlimenticio = '-';
            }
            if (
              inscripcionEvento.tieneCocheDisponible === undefined ||
              inscripcionEvento.tieneCocheDisponible === null
            ) {
              inscripcionEvento.tieneCocheDisponible = '-';
            } else {
              if (inscripcionEvento.tieneCocheDisponible)
                inscripcionEvento.tieneCocheDisponible = 'Sí';
              else {
                inscripcionEvento.tieneCocheDisponible = 'No';
              }
            }
            if (!this.utils.existe(inscripcionEvento.comentarioAdicional)) {
              inscripcionEvento.comentarioAdicional = '-';
            }
            let actividades = [];
            inscripcionEvento.actividadesInteres.forEach((actividad) => {
              const idObjectActividad = this.utils.convertirObjectId(
                actividad.toString()
              );
              this.actividadService
                .getActividad(idObjectActividad)
                .subscribe((actividad) => {
                  actividades.push(actividad);
                });
            });
            inscripcionEvento.actividadesInteres = actividades;
          });
          this.inscripcionesEvento = inscripcionesEvento;
          this.dtTrigger.next();
        });
    }
  }

  public aceptarInscripcion(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de aceptar esta inscripción?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, aceptar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.inscripcionEventoService
              .aceptarInscripcionEvento(idObject)
              .subscribe(
                () => {
                  swal
                    .fire(
                      'Inscripción pendiente',
                      'Se ha aceptado la inscripción del miembro correctamente',
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
}
