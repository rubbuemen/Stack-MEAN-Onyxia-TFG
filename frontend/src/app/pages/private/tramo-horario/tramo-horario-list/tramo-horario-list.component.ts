import { Component, OnDestroy, OnInit } from '@angular/core';
import { TramoHorario } from '../../../../models/tramo-horario.model';
import { TramoHorarioService } from '../../../../services/private/tramo-horario.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { DiaEvento } from '../../../../models/dia-evento.model';
import { DiaEventoService } from 'src/app/services/private/dia-evento.service';
import { SharedDataService } from '../../../../services/shared-data.service';
import { Evento } from 'src/app/models/evento.model';

@Component({
  selector: 'app-tramo-horario-list',
  templateUrl: './tramo-horario-list.component.html',
  styles: [],
})
export class TramoHorarioListComponent implements OnDestroy, OnInit {
  public diaEvento: DiaEvento;
  public evento: Evento;
  private idObjectDiaEvento: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private tramoHorarioService: TramoHorarioService,
    private diaEventoService: DiaEventoService,
    private sharedDataService: SharedDataService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.route.params.subscribe((params) => {
      this.getDiaEvento(params['diaEventoId']);
    });
    this.sharedDataService.currentEvento.subscribe((evento) => {
      this.evento = evento;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getDiaEvento(diaEventoId: string): void {
    this.idObjectDiaEvento = this.utils.convertirObjectId(diaEventoId);
    if (this.idObjectDiaEvento !== undefined) {
      this.diaEventoService
        .getDiaEvento(this.idObjectDiaEvento)
        .subscribe((diaEvento) => {
          this.diaEvento = diaEvento;
          this.sharedDataService.changeDiaEvento(this.diaEvento);
          this.dtTrigger.next();
        });
    }
  }

  public eliminarTramoHorario(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar el tramo horario?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.tramoHorarioService.eliminarTramoHorario(idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Datos eliminados',
                    'Se ha eliminado el tramo horario del día',
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
