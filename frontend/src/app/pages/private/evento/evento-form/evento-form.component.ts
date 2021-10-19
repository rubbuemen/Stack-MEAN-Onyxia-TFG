import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectId } from 'mongoose';
import { Evento } from '../../../../models/evento.model';

import { EventoService } from '../../../../services/private/evento.service';
import { ActividadService } from '../../../../services/private/actividad.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';
import { Actividad } from '../../../../models/actividad.model';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styles: [],
})
export class EventoFormComponent implements OnInit {
  public evento: Evento;
  public actividades: Actividad[];
  public edicion: boolean = true;
  public formEnviado: boolean = false;
  public eventoForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private eventoService: EventoService,
    private actividadService: ActividadService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.utils.resetDropify();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getEvento(params['id']);
      } else {
        this.getActividades();
        this.edicion = false;
        this.utils.refrescarSelectPicker('actividadesSelect');
        this.utils.refrescarSelectPicker('esFueraSevilla');
        this.utils.refrescarSelectPicker('estaPublicado');
      }
    });
    this.eventoForm = this.generarEventoForm();
  }

  private generarEventoForm(): FormGroup {
    if (!this.edicion) {
      return this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        lugar: ['', Validators.required],
        cupoInscripciones: ['', Validators.required],
        estaPublicado: ['', Validators.required],
        esFueraSevilla: ['', Validators.required],
        actividadesEvento: [''],
        fecha: ['', Validators.required],
        horaInicio: ['', Validators.required],
        horaFin: ['', Validators.required],
        imagen: [''],
        hayImagen: [false],
      });
    } else {
      return this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        lugar: ['', Validators.required],
        cupoInscripciones: ['', Validators.required],
        estaPublicado: ['', Validators.required],
        esFueraSevilla: ['', Validators.required],
        actividadesEvento: [''],
        imagen: [''],
        hayImagen: [false],
      });
    }
  }

  private getActividades(): void {
    this.actividadService
      .getActividadesPublicasEnVigor()
      .subscribe((actividades) => {
        this.actividades = actividades;
      });
  }

  private getEvento(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.eventoService.getEvento(this.idObject).subscribe(
        (evento) => {
          this.getActividades();
          this.evento = evento;
          this.eventoForm.get('nombre').setValue(this.evento.nombre);
          this.eventoForm.get('descripcion').setValue(this.evento.descripcion);
          this.eventoForm.get('lugar').setValue(this.evento.lugar);
          this.eventoForm
            .get('cupoInscripciones')
            .setValue(this.evento.cupoInscripciones);
          this.eventoForm
            .get('esFueraSevilla')
            .setValue(this.evento.esFueraSevilla);
          this.utils.setValoresSelectPicker(
            'esFueraSevilla',
            this.evento.esFueraSevilla.toString()
          );
          this.eventoForm
            .get('actividadesEvento')
            .setValue(this.evento.actividadesEvento.map((x) => x._id));
          this.utils.setValoresSelectPicker(
            'actividadesSelect',
            this.evento.actividadesEvento.map((x) => x._id.toString())
          );
          this.eventoForm
            .get('estaPublicado')
            .setValue(this.evento.estaPublicado);
          this.utils.setValoresSelectPicker(
            'estaPublicado',
            this.evento.estaPublicado.toString()
          );
          if (this.utils.existe(evento.imagen)) {
            let imagen =
              'data:' +
              evento.imagen.mimetype +
              ';base64,' +
              evento.imagen.data;
            this.utils.setearImagenFileHtml(imagen);
          }
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.eventoForm.valid) {
      this.eventoForm
        .get('actividadesEvento')
        .setValue(
          this.utils.obtenerElementosSeleccionados('actividadesSelect')
        );
      this.eventoForm
        .get('hayImagen')
        .setValue(this.utils.contieneImagenDropify());
      const propiedadesArrays = ['actividadesEvento'];
      const data = this.utils.generarFormData(
        this.eventoForm,
        this.utils.obtenerPropiedadesFormGroup(this.eventoForm),
        propiedadesArrays
      );
      if (this.eventoForm.get('actividadesEvento').value.length !== 0) {
        if (this.edicion) {
          this.eventoService.editarEvento(data, this.idObject).subscribe(
            (res) => {
              swal
                .fire(
                  'Datos editados',
                  'Se ha editado el evento correctamente',
                  'success'
                )
                .then(() => this.router.navigate(['/private/evento/gestion']));
            },
            (error) => {
              swal.fire('Error', error.error.error, 'error');
            }
          );
        } else {
          this.eventoService.crearEvento(data).subscribe(
            (res) => {
              swal
                .fire(
                  'Datos creados',
                  'Se ha creado el evento correctamente',
                  'success'
                )
                .then(() => this.router.navigate(['/private/evento/gestion']));
            },
            (error) => {
              swal.fire('Error', error.error.error, 'error');
            }
          );
        }
      } else {
        swal.fire(
          'Error',
          'Es necesario asignar al menos una actividad al evento',
          'error'
        );
      }
    }
  }

  onFileChange(event) {
    if (event.target['files'].length > 0) {
      const file = event.target['files'][0];
      this.eventoForm.get('imagen').setValue(file);
      this.eventoForm.get('imagen').updateValueAndValidity();
    }
  }

  public validarCampo(campo: string): boolean {
    return this.eventoForm.get(campo).invalid ? true : false;
  }
}
