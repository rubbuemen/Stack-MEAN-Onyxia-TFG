import { Component, OnInit } from '@angular/core';

import { EventoService } from '../../../services/public/evento.service';
import { UtilsService } from '../../../services/utils.service';

import { Evento } from '../../../models/evento.model';
import { DiaEventoService } from '../../../services/public/dia-evento.service';
import { TramoHorarioService } from '../../../services/public/tramo-horario.service';

@Component({
  selector: 'app-eventos-public',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosPublicComponent implements OnInit {
  public eventosPublicos: Evento[] = [];
  public page: number;

  constructor(
    private eventoService: EventoService,
    private diaEventoService: DiaEventoService,
    private tramoHorarioService: TramoHorarioService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.getEventosPublicos();
  }

  private getEventosPublicos(): void {
    this.eventoService.getEventosPublicos().subscribe((eventos) => {
      eventos.forEach((evento) => {
        if (this.utils.existe(evento.imagen)) {
          let imagen =
            'data:' + evento.imagen.mimetype + ';base64,' + evento.imagen.data;
          const imagenSRC = this.utils.usarImagenBase64(imagen);
          evento.imagen = imagenSRC;
        }
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
      });
      this.eventosPublicos = eventos;
    });
  }
}
