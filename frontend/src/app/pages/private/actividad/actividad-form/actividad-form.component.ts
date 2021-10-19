import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectId } from 'mongoose';
import { Actividad } from '../../../../models/actividad.model';

import { ActividadService } from '../../../../services/private/actividad.service';
import { MaterialService } from '../../../../services/private/material.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';
import { Material } from '../../../../models/material.model';

@Component({
  selector: 'app-actividad-form',
  templateUrl: './actividad-form.component.html',
  styles: [],
})
export class ActividadFormComponent implements OnInit {
  public actividad: Actividad;
  public materiales: Material[];
  public edicion: boolean = true;
  public formEnviado: boolean = false;
  public actividadForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private actividadService: ActividadService,
    private materialService: MaterialService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actividadForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      reglas: ['', Validators.required],
      enVigor: ['', Validators.required],
      materiales: [''],
      estaPublicado: ['', Validators.required],
      fotografia: [''],
    });
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getActividad(params['id']);
      } else {
        this.getMateriales();
        this.edicion = false;
        this.utils.refrescarSelectPicker('materialesSelect');
        this.utils.refrescarSelectPicker('enVigor');
        this.utils.refrescarSelectPicker('estaPublicado');
        this.utils.resetDropify();
      }
    });
  }

  private getMateriales(): void {
    this.materialService.getMateriales().subscribe((materiales) => {
      this.materiales = materiales;
    });
  }

  private getActividad(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.actividadService.getActividad(this.idObject).subscribe(
        (actividad) => {
          this.getMateriales();
          this.actividad = actividad;
          this.actividadForm.get('nombre').setValue(this.actividad.nombre);
          this.actividadForm
            .get('descripcion')
            .setValue(this.actividad.descripcion);
          this.actividadForm.get('reglas').setValue(this.actividad.reglas);
          this.actividadForm.get('enVigor').setValue(this.actividad.enVigor);
          this.utils.setValoresSelectPicker(
            'enVigor',
            this.actividad.enVigor.toString()
          );
          this.actividadForm
            .get('materiales')
            .setValue(this.actividad.materiales.map((x) => x._id));
          this.utils.setValoresSelectPicker(
            'materialesSelect',
            this.actividad.materiales.map((x) => x._id.toString())
          );
          this.actividadForm
            .get('estaPublicado')
            .setValue(this.actividad.estaPublicado);
          this.utils.setValoresSelectPicker(
            'estaPublicado',
            this.actividad.estaPublicado.toString()
          );
          let imagen =
            'data:' +
            actividad.fotografia.mimetype +
            ';base64,' +
            actividad.fotografia.data;
          this.utils.setearImagenFileHtml(imagen);
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.actividadForm.valid) {
      this.actividadForm
        .get('materiales')
        .setValue(this.utils.obtenerElementosSeleccionados('materialesSelect'));
      const propiedadesArrays = ['materiales'];
      const data = this.utils.generarFormData(
        this.actividadForm,
        this.utils.obtenerPropiedadesFormGroup(this.actividadForm),
        propiedadesArrays
      );
      if (this.edicion) {
        this.actividadService.editarActividad(data, this.idObject).subscribe(
          (res) => {
            swal
              .fire(
                'Datos editados',
                'Se ha editado la actividad correctamente',
                'success'
              )
              .then(() => this.router.navigate(['/private/actividad']));
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
      } else {
        if (this.actividadForm.get('fotografia').value) {
          this.actividadService.crearActividad(data).subscribe(
            (res) => {
              swal
                .fire(
                  'Datos creados',
                  'Se ha creado la actividad correctamente',
                  'success'
                )
                .then(() => this.router.navigate(['/private/actividad']));
            },
            (error) => {
              swal.fire('Error', error.error.error, 'error');
            }
          );
        } else {
          swal.fire(
            'Error',
            'Inserta una fotografía para el actividad',
            'error'
          );
        }
      }
    }
  }

  onFileChange(event) {
    if (event.target['files'].length > 0) {
      const file = event.target['files'][0];
      this.actividadForm.get('fotografia').setValue(file);
      this.actividadForm.get('fotografia').updateValueAndValidity();
    }
  }

  public validarCampo(campo: string): boolean {
    return this.actividadForm.get(campo).invalid ? true : false;
  }
}
