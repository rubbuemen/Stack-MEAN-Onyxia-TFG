import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';

import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Evento } from '../../../../models/evento.model';
import { EventoService } from 'src/app/services/private/evento.service';
import { DiaEventoService } from 'src/app/services/private/dia-evento.service';
import { TramoHorarioService } from 'src/app/services/private/tramo-horario.service';
import { ActividadService } from '../../../../services/private/actividad.service';
import { Actividad } from 'src/app/models/actividad.model';

@Component({
  selector: 'app-evento-display',
  templateUrl: './evento-display.component.html',
  styles: [],
})
export class EventoDisplayComponent implements OnDestroy, OnInit {
  public actividades: Actividad[];
  public evento: Evento;
  private idObjectEvento: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private actividadService: ActividadService,
    private eventoService: EventoService,
    private diaEventoService: DiaEventoService,
    private tramoHorarioService: TramoHorarioService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.route.params.subscribe((params) => {
      this.getEvento(params['id']);
      this.getActividadesEvento(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getEvento(eventoId: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(eventoId);
    if (this.idObjectEvento !== undefined) {
      this.eventoService.getEvento(this.idObjectEvento).subscribe((evento) => {
        if (this.utils.existe(evento.imagen)) {
          let imagen =
            'data:' + evento.imagen.mimetype + ';base64,' + evento.imagen.data;
          const imagenSRC = this.utils.usarImagenBase64(imagen);
          evento.imagen = imagenSRC;
        }
        evento.estadoEvento =
          evento.estadoEvento[0].toUpperCase() +
          evento.estadoEvento.substr(1).toLowerCase();
        this.diaEventoService
          .getDiasEvento(evento._id)
          .subscribe((diasEvento) => {
            diasEvento.forEach((dia) => {
              this.tramoHorarioService
                .getTramosHorarios(dia._id)
                .subscribe((tramosHorarios) => {
                  if (tramosHorarios.length !== 0) {
                    dia.horaInicio = tramosHorarios[0].horaInicio;
                    dia.horaFinal = tramosHorarios[0].horaFin;
                    tramosHorarios.forEach((tramoHorario) => {
                      if (tramoHorario.horaInicio < dia.horaInicio) {
                        dia.horaInicio = tramoHorario.horaInicio;
                      }
                      if (tramoHorario.horaFin > dia.horaFinal) {
                        dia.horaFinal = tramoHorario.horaFin;
                      }
                    });
                  }
                });
            });
            evento.diasEvento = diasEvento;
          });
        this.evento = evento;
      });
    }
  }

  private getActividadesEvento(eventoId: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(eventoId);
    if (this.idObjectEvento !== undefined) {
      this.actividadService
        .getActividadesEvento(this.idObjectEvento)
        .subscribe((actividades) => {
          actividades.forEach((actividad) => {
            let imagen =
              'data:' +
              actividad.fotografia.mimetype +
              ';base64,' +
              actividad.fotografia.data;
            const imagenSRC = this.utils.usarImagenBase64(imagen);
            actividad.fotografia = imagenSRC;
          });
          this.actividades = actividades;
          this.dtTrigger.next();
        });
    }
  }
}
