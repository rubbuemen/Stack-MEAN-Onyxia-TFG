import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Evento } from '../../../../models/evento.model';
import { EventoService } from 'src/app/services/private/evento.service';
import { ActividadMiembroTramoService } from '../../../../services/private/actividad-miembro-tramo.service';
import { ActividadMiembroTramo } from '../../../../models/actividad-miembro-tramo.model';
import { DiaEventoService } from '../../../../services/private/dia-evento.service';
import { DiaEvento } from '../../../../models/dia-evento.model';

@Component({
  selector: 'app-actividad-miembro-tramo-list',
  templateUrl: './actividad-miembro-tramo-list.component.html',
  styles: [],
})
export class ActividadMiembroTramoListComponent implements OnDestroy, OnInit {
  public horarios: ActividadMiembroTramo[];
  public evento: Evento;
  private idObjectEvento: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private horarioService: ActividadMiembroTramoService,
    private diaEventoService: DiaEventoService,
    private eventoService: EventoService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.route.params.subscribe((params) => {
      this.getHorarios(params['eventoId']);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getHorarios(eventoId: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(eventoId);
    if (this.idObjectEvento !== undefined) {
      this.eventoService.getEvento(this.idObjectEvento).subscribe((evento) => {
        this.evento = evento;
      });
      this.horarioService
        .getHorarios(this.idObjectEvento)
        .subscribe((horarios) => {
          horarios.forEach((horario) => {
            this.diaEventoService
              .getDiaEventoPorTramoHorario(horario.tramoHorario._id)
              .subscribe((dia) => {
                horario.dia = dia;
              });
          });
          this.horarios = horarios;
          this.dtTrigger.next();
        });
    }
  }

  public eliminarHorario(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar el horario?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.horarioService.eliminarHorario(idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Datos eliminados',
                    'Se ha eliminado el horario correctamente',
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
