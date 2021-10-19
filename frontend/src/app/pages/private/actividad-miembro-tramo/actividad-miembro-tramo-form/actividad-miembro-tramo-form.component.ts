import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectId } from 'mongoose';

import { EventoService } from '../../../../services/private/evento.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';
import { Evento } from '../../../../models/evento.model';
import { ActividadMiembroTramoService } from '../../../../services/private/actividad-miembro-tramo.service';
import { Miembro } from '../../../../models/miembro.model';
import { Actividad } from '../../../../models/actividad.model';
import { DiaEvento } from '../../../../models/dia-evento.model';
import { TramoHorario } from '../../../../models/tramo-horario.model';
import { MiembroService } from '../../../../services/private/miembro.service';
import { ActividadService } from '../../../../services/private/actividad.service';
import { DiaEventoService } from '../../../../services/private/dia-evento.service';
import { TramoHorarioService } from '../../../../services/private/tramo-horario.service';

@Component({
  selector: 'app-actividad-miembro-tramo-form',
  templateUrl: './actividad-miembro-tramo-form.component.html',
  styles: [],
})
export class ActividadMiembroTramoFormComponent implements OnInit {
  public evento: Evento;
  public formEnviado: boolean = false;
  public horarioForm: FormGroup = this.fb.group({
    actividad: ['', Validators.required],
    miembro: ['', Validators.required],
    diaEvento: ['', Validators.required],
    tramoHorario: ['', Validators.required],
  });
  private idObjectEvento: ObjectId;

  public miembros: Miembro[];
  public actividades: Actividad[];
  public dias: DiaEvento[];
  public tramosHorarios: TramoHorario[];

  constructor(
    private horarioService: ActividadMiembroTramoService,
    private eventoService: EventoService,
    private miembroService: MiembroService,
    private actividadService: ActividadService,
    private diaEventoService: DiaEventoService,
    private tramoHorarioService: TramoHorarioService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getEvento(params['eventoId']);
      this.getActividades(params['eventoId']);
      this.getMiembros(params['eventoId']);
      this.getDias(params['eventoId']);
      this.utils.refrescarSelectPicker('miembrosSelect');
      this.utils.refrescarSelectPicker('actividadesSelect');
      this.utils.refrescarSelectPicker('diasSelect');
    });
  }

  private getEvento(id: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(id);
    if (this.idObjectEvento !== undefined) {
      this.eventoService.getEvento(this.idObjectEvento).subscribe(
        (evento) => {
          this.evento = evento;
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  private getMiembros(id: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(id);
    this.miembroService
      .getMiembrosParaHorario(this.idObjectEvento)
      .subscribe((miembros) => {
        this.miembros = miembros;
      });
  }

  private getActividades(id: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(id);
    this.actividadService
      .getActividadesEvento(this.idObjectEvento)
      .subscribe((actividades) => {
        this.actividades = actividades;
      });
  }

  private getDias(id: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(id);
    this.diaEventoService
      .getDiasEvento(this.idObjectEvento)
      .subscribe((dias) => {
        this.dias = dias;
      });
  }

  private getTramosHorarios(idDiaEvento: string): void {
    const idObjectDia = this.utils.convertirObjectId(idDiaEvento);
    this.tramoHorarioService
      .getTramosHorarios(idObjectDia)
      .subscribe((tramosHorarios) => {
        this.tramosHorarios = tramosHorarios;
      });
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.horarioForm.valid) {
      const data = this.utils.generarFormData(
        this.horarioForm,
        this.utils.obtenerPropiedadesFormGroup(this.horarioForm)
      );
      this.horarioService.crearHorario(data, this.idObjectEvento).subscribe(
        (res) => {
          swal
            .fire(
              'Horario añadido',
              'Se ha añadido el horario para este evento correctamente',
              'success'
            )
            .then(() =>
              this.router.navigate(['/private/horario', this.evento._id])
            );
        },
        (error) => {
          swal.fire('Error', error.error.error, 'error');
        }
      );
    }
  }

  public validarCampo(campo: string): boolean {
    return this.horarioForm.get(campo).invalid ? true : false;
  }

  onChange(idDiaEvento: string) {
    this.getTramosHorarios(idDiaEvento);
    this.utils.refrescarSelectPicker('tramosHorariosSelect');
  }
}
