import { Component, OnInit } from '@angular/core';

import { EventoService } from '../../../services/public/evento.service';
import { UtilsService } from '../../../services/utils.service';

import { Evento } from '../../../models/evento.model';
import { DiaEventoService } from '../../../services/public/dia-evento.service';
import { TramoHorarioService } from '../../../services/public/tramo-horario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../../../services/public/actividad.service';

@Component({
  selector: 'app-evento-display-public',
  templateUrl: './evento-display.component.html',
  styleUrls: ['./evento-display.component.css'],
})
export class EventoPublicDisplayComponent implements OnInit {
  public evento: Evento;

  constructor(
    private eventoService: EventoService,
    private diaEventoService: DiaEventoService,
    private tramoHorarioService: TramoHorarioService,
    private actividadService: ActividadService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getEvento(params['id']);
    });
  }

  private getEvento(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      this.eventoService.getEvento(idObject).subscribe(
        (evento) => {
          if (this.utils.existe(evento.imagen)) {
            let imagen =
              'data:' +
              evento.imagen.mimetype +
              ';base64,' +
              evento.imagen.data;
            const imagenSRC = this.utils.usarImagenBase64(imagen);
            evento.imagen = imagenSRC;
          }
          evento.estadoEvento = evento.estadoEvento.toLowerCase();
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
          this.actividadService
            .getActividadesPublicasPorEvento(evento._id)
            .subscribe((actividades) => {
              actividades.forEach((actividad) => {
                let imagen =
                  'data:' +
                  actividad.fotografia.mimetype +
                  ';base64,' +
                  actividad.fotografia.data;
                actividad.fotografia = imagen;
              });
              evento.actividadesEvento = actividades;
            });
          this.evento = evento;
        },
        (error) => {
          this.router.navigate(['/']);
        }
      );
    }
  }
}
