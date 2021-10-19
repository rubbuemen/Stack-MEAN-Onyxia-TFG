import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectId } from 'mongoose';
import { InscripcionEvento } from '../../../../models/inscripcion-evento.model';

import { InscripcionEventoService } from '../../../../services/private/inscripcion-evento.service';
import { ActividadService } from '../../../../services/private/actividad.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';
import { Actividad } from '../../../../models/actividad.model';
import { EventoService } from '../../../../services/private/evento.service';
import { Evento } from '../../../../models/evento.model';

@Component({
  selector: 'app-inscripcion-evento-form',
  templateUrl: './inscripcion-evento-form.component.html',
  styles: [],
})
export class InscripcionEventoFormComponent implements OnInit {
  public inscripcionEvento: InscripcionEvento;
  public actividadesInteres: Actividad[];
  public evento: Evento;
  public formEnviado: boolean = false;
  public inscripcionEventoForm: FormGroup;
  private idObjectEvento: ObjectId;

  constructor(
    private inscripcionEventoService: InscripcionEventoService,
    private eventoService: EventoService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inscripcionEventoForm = this.fb.group({
      problemaAlimenticio: [''],
      tieneCocheDisponible: [''],
      comentarioAdicional: [''],
      actividadesInteres: [''],
    });
    this.route.params.subscribe((params) => {
      this.getActividadesEvento(params['eventoId']);
      this.utils.refrescarSelectPicker('actividadesSelect');
      this.utils.refrescarSelectPicker('tieneCocheDisponible');
    });
  }

  private getActividadesEvento(eventoId: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(eventoId);
    if (this.idObjectEvento !== undefined) {
      this.eventoService.getEvento(this.idObjectEvento).subscribe((evento) => {
        this.evento = evento;
        this.actividadesInteres = evento.actividadesEvento;
      });
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.inscripcionEventoForm.valid) {
      this.inscripcionEventoForm
        .get('actividadesInteres')
        .setValue(
          this.utils.obtenerElementosSeleccionados('actividadesSelect')
        );
      const propiedadesArrays = ['actividadesInteres'];
      const data = this.utils.generarFormData(
        this.inscripcionEventoForm,
        this.utils.obtenerPropiedadesFormGroup(this.inscripcionEventoForm),
        propiedadesArrays
      );

      this.inscripcionEventoService
        .inscribirseAEvento(data, this.idObjectEvento)
        .subscribe(
          (res) => {
            swal
              .fire(
                'Inscripción enviada',
                'Se ha enviado la inscripción al evento correctamente',
                'success'
              )
              .then(() =>
                this.router.navigate([
                  '/private/evento/displayPublico',
                  this.evento._id,
                ])
              );
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
    }
  }
}
